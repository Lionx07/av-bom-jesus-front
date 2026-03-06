import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import api from "../../../services/api";
import type { ProfessorDTOResponse } from "../../../dto";
import "./ProfessorList.css";

export default function ProfessorList() {
  const [professors, setProfessors] = useState<ProfessorDTOResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Função para buscar os professores na API
  async function getProfessors() {
    setLoading(true);
    try {
      const response = await api.get<ProfessorDTOResponse[]>('/person/professor');
      setProfessors(response.data);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfessors();
  }, []);

  const idBodyTemplate = (rowData: ProfessorDTOResponse) => {
    return (
      <div className="flex items-center gap-3">
        <Button 
          icon="pi pi-pencil" 
          severity="success"
          className="p-button-rounded p-button-text"
          tooltipOptions={{ position: 'top' }}
          onClick={() => navigate(`/professor/edit/${rowData.id}`)} 
        />
        <span className="font-medium text-900">{rowData.id}</span>
      </div>
    );
  };

  const salaryBodyTemplate = (rowData: ProfessorDTOResponse) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(rowData.salary || 0);
  };

  const header = (
    <div className="flex justify-between items-center">
      <span className="text-xl text-900 font-bold">Professores</span>
      <Button 
        label="Novo Professor" 
        icon="pi pi-plus" 
        severity="success"
        onClick={() => navigate('/professor/create')} 
      />
    </div>
  );

  return (
    <div className="card shadow-sm border-round p-2">
      <DataTable
        value={professors}
        header={header}
        loading={loading}
        className="professor-table"
        responsiveLayout="scroll"
        emptyMessage="Nenhum professor encontrado."
        paginator 
        rows={10}
      >
        <Column 
          field="id" 
          header="ID" 
          body={idBodyTemplate} 
          style={{ width: '150px' }}
        />
        <Column 
          field="name" 
          header="Nome" 
          sortable 
        />
        <Column 
          field="phoneNumber" 
          header="Telefone" 
        />
        <Column 
          field="emailAddress" 
          header="Email" 
        />
        <Column 
          field="salary" 
          header="Salário" 
          body={salaryBodyTemplate} 
          sortable 
        />
        <Column 
          field="status" 
          header="Status" 
          body={(rowData) => (
            <span className={`status-badge status-${rowData.status?.toLowerCase()}`}>
              {rowData.status}
            </span>
          )}
        />
      </DataTable>
    </div>
  );
}