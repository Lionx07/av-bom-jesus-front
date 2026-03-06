import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import api from "../../../services/api";
import type { StudentDTOResponse } from "../../../dto"; // Certifique-se de que este DTO existe
import "./StudentList.css";

export default function StudentList() {
  const [students, setStudents] = useState<StudentDTOResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function getStudents() {
    setLoading(true);
    const response = await api.get<StudentDTOResponse[]>('/person/student');
    setStudents(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getStudents();
  }, []);

  const idBodyTemplate = (rowData: StudentDTOResponse) => {
    return (
      <div className="flex items-center gap-3">
        <Button 
          icon="pi pi-pencil" 
          severity="success"
          className="p-button-rounded p-button-text"
          tooltipOptions={{ position: 'top' }}
          onClick={() => navigate(`/student/edit/${rowData.id}`)} 
        />
        <span className="font-medium text-900">{rowData.id}</span>
      </div>
    );
  };

  const header = (
    <div className="flex justify-between items-center">
      <span className="text-xl text-900 font-bold">Alunos</span>
      <Button 
        label="Novo Aluno" 
        icon="pi pi-plus" 
        severity="success"
        onClick={() => navigate('/student/create')} 
      />
    </div>
  );

  return (
    <div className="card shadow-sm border-round p-2">
      <DataTable
        value={students}
        header={header}
        loading={loading}
        className="student-table"
        responsiveLayout="scroll"
        emptyMessage="Nenhum aluno encontrado."
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
          field="studentNumber" 
          header="Matrícula" 
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