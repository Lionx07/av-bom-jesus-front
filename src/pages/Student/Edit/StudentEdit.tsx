import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { FileUpload, type FileUploadSelectEvent } from "primereact/fileupload";
import { AddressField } from "../../../components/addressField/AddressField";
import type { StudentDTORequest, AddressDTORequest, StudentDTOResponse } from "../../../dto";
import api from "../../../services/api";

export function StudentEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [selectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [student, setStudent] = useState<Partial<StudentDTORequest>>({
    type: "student",
    name: "",
    phoneNumber: "",
    emailAddress: "",
    studentNumber: "",
    photo: "",
    status: "ACTIVE",
    addresses: [],
  });

  useEffect(() => {
    async function loadStudent() {
        const response = await api.get<StudentDTOResponse>(`/person/${id}`);
        setStudent(response.data);
        if (response.data.photo) {
          setPreview(response.data.photo);
        }
        setLoading(false);
    }
    if (id) loadStudent();
  }, [id]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  async function updateStudent() {
    const payload = {
    type: "student",
    name: student.name,
    phoneNumber: student.phoneNumber,
    emailAddress: student.emailAddress,
    studentNumber: student.studentNumber,
    photo: student.photo,
    status: student.status || "ACTIVE",
    addresses: student.addresses?.map(addr => ({
        id: (addr.id && addr.id > 999999999) ? null : addr.id,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        country: addr.country
    }))
    };

    await api.put<StudentDTOResponse>(`/person/${id}`, payload);
    navigate("/student");
  }

  async function deleteStudent() {
    await api.delete(`/person/soft-delete/${id}`);
    navigate("/student");
  }

  const handleInputChange = (field: keyof StudentDTORequest, value: any) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const addAddress = () => {
    const newAddress: AddressDTORequest = {
      id: Date.now(),
      street: "", city: "", state: "", zipCode: "", country: ""
    };
    setStudent((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), newAddress],
    }));
  };

  const removeAddress = (addrId: number) => {
    setStudent((prev) => ({
      ...prev,
      addresses: prev.addresses?.filter((addr) => addr.id !== addrId),
    }));
  };

  const handleAddressChange = (addrId: number, updatedData: any) => {
    setStudent((prev) => ({
      ...prev,
      addresses: prev.addresses?.map((addr) =>
        addr.id === addrId ? { ...addr, ...updatedData } : addr
      ),
    }));
  };

  const validateForm = () => {
    return (
      student.name &&
      student.phoneNumber &&
      student.emailAddress &&
      student.studentNumber &&
      student.addresses &&
      student.addresses.length > 0 &&
      student.addresses.every((addr: any) =>
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
        <span className="text-xl font-bold text-900">Editar Aluno</span>
        <div className="flex gap-2">
          <Button label="Cancelar" onClick={() => navigate("/student")} severity="secondary" text />
          <Button label="Deletar" icon="pi pi-trash" severity="secondary" outlined onClick={deleteStudent} />
          <Button label="Salvar Alterações" icon="pi pi-check" severity="success" disabled={!validateForm()} onClick={updateStudent} />
        </div>
      </div>

      {/* Seção de Foto */}
      <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <label className="text-sm font-medium">Foto do Aluno</label>
        <div className="flex items-center gap-4">
          <div className="w-70 h-70 border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-white shadow-sm">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <i className="pi pi-user text-4xl text-gray-200"></i>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {selectedFile && (
              <span className="text-xs text-green-600 font-medium">
                Novo arquivo: {selectedFile.name}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Nome</label>
          <InputText 
            value={student.name || ''} 
            onChange={(e) => handleInputChange("name", e.target.value)} 
            placeholder="Nome completo"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Número de Matrícula</label>
          <InputText 
            value={student.studentNumber || ''} 
            onChange={(e) => handleInputChange("studentNumber", e.target.value)} 
            placeholder="Ex: 2023001"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Telefone</label>
          <InputText 
            value={student.phoneNumber || ''} 
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)} 
            placeholder="(00) 00000-0000"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <InputText 
            value={student.emailAddress || ''} 
            onChange={(e) => handleInputChange("emailAddress", e.target.value)} 
            placeholder="email@exemplo.com"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 mt-8">
        <span className="text-lg font-semibold">Endereços</span>
        <Button label="Novo Endereço" icon="pi pi-plus" size="small" outlined onClick={addAddress} />
      </div>

      <div className="flex flex-col gap-4">
        {student.addresses?.map((addr) => (
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