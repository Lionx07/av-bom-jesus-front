import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { InputNumber, type InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { AddressField } from "../../../components/addressField/AddressField";
import type { ProfessorDTORequest, AddressDTORequest, ProfessorDTOResponse } from "../../../dto";
import api from "../../../services/api";

export function ProfessorEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [professor, setProfessor] = useState<Partial<ProfessorDTORequest>>({
    type: "professor",
    name: "",
    phoneNumber: "",
    emailAddress: "",
    salary: 0,
    status: "ACTIVE",
    addresses: [],
  });

  useEffect(() => {
    async function loadProfessor() {
      try {
        const response = await api.get<ProfessorDTOResponse>(`/person/${id}`);
        setProfessor(response.data);
      } catch (error) {
        console.error("Erro ao carregar professor:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProfessor();
  }, [id]);

  async function updateProfessor() {
    const payload = {
      type: "professor",
      name: professor.name,
      phoneNumber: professor.phoneNumber,
      emailAddress: professor.emailAddress,
      salary: professor.salary || 0,
      status: professor.status || "ACTIVE",
      addresses: professor.addresses?.map(addr => ({
        id: (addr.id && addr.id > 999999999) ? null : addr.id,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        country: addr.country
      }))
    };


    await api.put<ProfessorDTOResponse>(`/person/${id}`, payload);
    navigate("/professor");
  }

  async function deleteProfessor() {
    await api.delete(`/person/soft-delete/${id}`);
    navigate("/professor");
  }

  const handleInputChange = (field: keyof ProfessorDTORequest, value: any) => {
    setProfessor((prev) => ({ ...prev, [field]: value }));
  };

  const addAddress = () => {
    const newAddress: AddressDTORequest = {
      id: Date.now(),
      street: "", city: "", state: "", zipCode: "", country: ""
    };
    setProfessor((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), newAddress],
    }));
  };

  const removeAddress = (addrId: number) => {
    setProfessor((prev) => ({
      ...prev,
      addresses: prev.addresses?.filter((addr) => addr.id !== addrId),
    }));
  };

  const handleAddressChange = (addrId: number, updatedData: any) => {
    setProfessor((prev) => ({
      ...prev,
      addresses: prev.addresses?.map((addr) =>
        addr.id === addrId ? { ...addr, ...updatedData } : addr
      ),
    }));
  };

  const validateForm = () => {
    return (
      professor.name &&
      professor.phoneNumber &&
      professor.emailAddress &&
      professor.addresses &&
      professor.addresses.length > 0 &&
      professor.addresses.every((addr: any) =>
        addr.street && addr.city && addr.state && addr.zipCode && addr.country
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xl font-bold text-900">Editar Professor</span>
        <div className="flex gap-2">
          <Button label="Cancelar" onClick={() => navigate("/professor")} severity="secondary" text />
          <Button label="Deletar" icon="pi pi-trash" severity="secondary" onClick={deleteProfessor} />
          <Button label="Salvar Alterações" icon="pi pi-check" severity="success" disabled={!validateForm()} onClick={updateProfessor} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Nome</label>
          <InputText value={professor.name || ''} onChange={(e) => handleInputChange("name", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Telefone</label>
          <InputText value={professor.phoneNumber || ''} onChange={(e) => handleInputChange("phoneNumber", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <InputText value={professor.emailAddress || ''} onChange={(e) => handleInputChange("emailAddress", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Salário</label>
          <InputNumber
            value={professor.salary}
            onValueChange={(e) => handleInputChange("salary", e.value)}
            mode="currency" currency="BRL" locale="pt-BR"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 mt-8">
        <span className="text-lg font-semibold">Endereços</span>
        <Button label="Novo Endereço" icon="pi pi-plus" size="small" outlined onClick={addAddress} />
      </div>

      <div className="flex flex-col gap-4">
        {professor.addresses?.map((addr) => (
          <AddressField
            key={addr.id}
            data={addr}
            onChange={(data) => handleAddressChange(addr.id!, data)}
            onRemove={() => removeAddress(addr.id!)}
            showRemove={true}
          />
        ))}
      </div>
    </div>
  );
}