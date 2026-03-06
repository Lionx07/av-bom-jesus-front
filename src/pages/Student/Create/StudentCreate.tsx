import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FileUpload, type FileUploadSelectEvent } from "primereact/fileupload";
import { AddressField } from "../../../components/addressField/AddressField";
import type { StudentDTORequest, AddressDTORequest, StudentDTOResponse } from "../../../dto";
import api from "../../../services/api";

export function StudentCreate() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [student, setStudent] = useState<Partial<StudentDTORequest>>({
    type: "student",
    name: "",
    phoneNumber: "",
    emailAddress: "",
    studentNumber: "",
    status: "ACTIVE",
    addresses: [],
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onImageSelect = (e: FileUploadSelectEvent) => {
    const file = e.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  async function saveStudent() {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append("person", JSON.stringify(student));

    await api.post<StudentDTOResponse>('/person/with-file', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    navigate("/student");
  }

  const handleInputChange = (field: keyof StudentDTORequest, value: any) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
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
    setStudent((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), newAddress],
    }));
  };

  const removeAddress = (id: number) => {
    setStudent((prev) => ({
      ...prev,
      addresses: prev.addresses?.filter((addr) => addr.id !== id),
    }));
  };

  const handleAddressChange = (id: number, updatedData: any) => {
    setStudent((prev) => ({
      ...prev,
      addresses: prev.addresses?.map((addr) =>
        addr.id === id ? { ...addr, ...updatedData } : addr
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
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center !mb-6">
        <span className="text-xl text-900 font-bold">Criar Aluno</span>
        <div className="flex gap-2">
          <Button label="Voltar" onClick={() => navigate("/student")} severity="secondary" />
          <Button label="Adicionar" disabled={!validateForm()} onClick={saveStudent} />
        </div>
      </div>

      <span className="flex mb-4 text-l text-700 font-medium">Dados Pessoais</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="text-sm font-medium text-gray-700">Foto do Aluno</label>
          <div className="flex items-center gap-4">
            <div className="w-70 h-70 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-white">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <i className="pi pi-user text-4xl text-gray-200"></i>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <FileUpload
                mode="basic"
                name="file"
                accept="image/*"
                maxFileSize={2000000}
                onSelect={onImageSelect}
                chooseLabel={preview ? "Alterar Foto" : "Selecionar Foto"}
                chooseOptions={{
                  className: 'p-button-text p-button-secondary p-0 h-auto font-bold',
                  iconOnly: false
                }}
              />
              {selectedFile && (
                <span className="text-xs text-green-600 font-medium">
                  <i className="pi pi-check mr-1"></i>
                  {selectedFile.name}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium">Nome</label>
          <InputText
            id="name"
            value={student.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Nome completo"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="studentNumber" className="mb-1 text-sm font-medium">Número de Matrícula</label>
          <InputText
            id="studentNumber"
            value={student.studentNumber}
            onChange={(e) => handleInputChange("studentNumber", e.target.value)}
            placeholder="Ex: 2023001"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="mb-1 text-sm font-medium">Telefone</label>
          <InputText
            id="phoneNumber"
            value={student.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
          <InputText
            id="email"
            value={student.emailAddress}
            onChange={(e) => handleInputChange("emailAddress", e.target.value)}
            placeholder="email@exemplo.com"
          />
        </div>
      </div>

      {/* Seção de Endereços */}
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
        {student.addresses && student.addresses.length > 0 ? (
          student.addresses.map((addr: any) => (
            <AddressField
              key={addr.id}
              data={addr}
              onChange={(updatedData) => handleAddressChange(addr.id, updatedData)}
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