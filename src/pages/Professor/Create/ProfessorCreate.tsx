import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputNumber, type InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { AddressField } from "../../../components/addressField/AddressField";
import type { ProfessorDTORequest, AddressDTORequest, ProfessorDTOResponse } from "../../../dto";
import api from "../../../services/api";

export function ProfessorCreate() {
  // API Calls
  async function saveProfessor() {
    const response = await api.post<ProfessorDTOResponse>('/person', professor);
    console.log('Professor criado:', response.data);
    navigate("/professor");
  };


  // Properties and States
  const navigate = useNavigate();

  const [professor, setProfessor] = useState<Partial<ProfessorDTORequest>>({
    type: "professor",
    name: "",
    phoneNumber: "",
    emailAddress: "",
    salary: 0,
    status: "ACTIVE",
    addresses: [],
  });

  const handleInputChange = (field: keyof ProfessorDTORequest, value: any) => {
    setProfessor((prev: Partial<ProfessorDTORequest>) => ({ ...prev, [field]: value }));
  };

  const addAddress = () => {
    const newAddress: AddressDTORequest = {
      id: Date.now(),
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    };
    setProfessor((prev: Partial<ProfessorDTORequest>) => ({
      ...prev,
      addresses: [...(prev.addresses || []), newAddress],
    }));
  };

  const removeAddress = (id: number) => {
    setProfessor((prev: Partial<ProfessorDTORequest>) => ({
      ...prev,
      addresses: prev.addresses?.filter((addr: AddressDTORequest) => addr.id !== id),
    }));
  };

  const handleAddressChange = (id: number, updatedData: any) => {
    setProfessor((prev: Partial<ProfessorDTORequest>) => ({
      ...prev,
      addresses: prev.addresses?.map((addr: AddressDTORequest) =>
        addr.id === id ? { ...addr, ...updatedData } : addr
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
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center !mb-6">
        <span className="text-xl text-900 font-bold">Criar Professor</span>
        <div className="flex gap-2">
          <Button label="Voltar" onClick={() => navigate("/professor")} severity="secondary" />
          <Button label="Adicionar" disabled={!validateForm()} onClick={saveProfessor} />
        </div>
      </div>

      <span className="flex mb-4 text-l text-700 font-medium">Dados Pessoais</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm">Nome</label>
          <InputText
            id="name"
            value={professor.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="mb-1 text-sm">Telefone</label>
          <InputText
            id="phoneNumber"
            value={professor.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm">Email</label>
          <InputText
            id="email"
            value={professor.emailAddress}
            onChange={(e) => handleInputChange("emailAddress", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="salary" className="mb-1 text-sm">Salário</label>
          <InputNumber
            id="salary"
            value={professor.salary}
            onValueChange={(e: InputNumberValueChangeEvent) => handleInputChange("salary", e.value)}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            inputClassName="w-full"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 mt-8">
        <span className="text-l text-700 font-semibold">Endereços</span>
        <Button
          type="button"
          label="Novo Endereço"
          icon="pi pi-plus"
          className="p-button-sm p-button-outlined"
          onClick={addAddress}
        />
      </div>

      <div className="flex flex-col gap-4">
        {professor.addresses && professor.addresses.length > 0 ? (
          professor.addresses.map((addr: any) => (
            <AddressField
              key={addr.id}
              data={addr}
              onChange={(updatedData) => handleAddressChange(addr.id, updatedData)} // Função de callback
              onRemove={() => removeAddress(addr.id)}
              showRemove={true}
            />
          ))
        ) : (
          <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
            Nenhum endereço adicionado. Clique em "Novo Endereço" para começar.
          </div>
        )}
      </div>
    </div>
  );
}