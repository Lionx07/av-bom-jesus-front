import { useState } from 'react'
import './style.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


function App() {
  const [produtos] = useState([
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 150 },
    { id: 3, nome: "Teclado", preco: 300 }
  ]);

  return (
    <div>
      <h2>Produtos</h2>

      <DataTable value={produtos} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="ID"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="preco" header="Preço"></Column>
      </DataTable>
    </div>
  );
}

export default App
