import { createRoot } from 'react-dom/client'
import './index.css'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SideBar from '../components/sidebar/SideBar.tsx';
import ProfessorList from '../pages/Professor/List/ProfessorList.tsx';
import { ProfessorCreate } from '../pages/Professor/Create/ProfessorCreate.tsx';
import { ProfessorEdit } from '../pages/Professor/Edit/ProfessorEdit.tsx';
import StudentList from '../pages/Student/List/StudentList.tsx';
import { StudentCreate } from '../pages/Student/Create/StudentCreate.tsx';
import { StudentEdit } from '../pages/Student/Edit/StudentEdit.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SideBar />
      <main style={{ flex: 1, padding: '30px' }}>
        <Routes>
          <Route path="/professor" element={<ProfessorList />} />
          <Route path="/professor/create" element={<ProfessorCreate />} />
          <Route path="/professor/edit/:id" element={<ProfessorEdit />} />

          <Route path="/student" element={<StudentList />} />
          <Route path="/student/create" element={<StudentCreate />} />
          <Route path="/student/edit/:id" element={<StudentEdit />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
)