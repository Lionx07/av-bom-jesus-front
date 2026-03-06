import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const items = [
  {
    id: 1,
    label: 'Professores',
    path: '/professor',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
        <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
        <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
      </svg>
    ),
  },
  {
    id: 2,
    label: 'Alunos',
    path: '/student',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-backpack-fill" viewBox="0 0 16 16">
        <path d="M5 13v-3h4v.5a.5.5 0 0 0 1 0V10h1v3z"/>
        <path d="M6 2v.341C3.67 3.165 2 5.388 2 8v5.5A2.5 2.5 0 0 0 4.5 16h7a2.5 2.5 0 0 0 2.5-2.5V8a6 6 0 0 0-4-5.659V2a2 2 0 1 0-4 0m2-1a1 1 0 0 1 1 1v.083a6 6 0 0 0-2 0V2a1 1 0 0 1 1-1m0 3a4 4 0 0 1 3.96 3.43.5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14A4 4 0 0 1 8 4M4.5 9h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5"/>
      </svg>
    ),
  },
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-expanded={!collapsed}>
      <div className="logo-area">
        <button
          className="toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed((v) => !v);
          }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
          type="button"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
            <path
              d={
                collapsed
                  ? 'M9.29 6.71L13.58 11l-4.29 4.29 1.42 1.42L16.41 11 10.71 5.29z'
                  : 'M14.71 17.29L10.42 13l4.29-4.29-1.42-1.42L7.59 13l6.3 6.29z'
              }
            />
          </svg>
        </button>
      </div>

      <ul className="menu" role="menu">
        {items.map((it) => (
          <li key={it.id} role="none">
            <Link
              to={it.path}
              className="menu-item"
              title={collapsed ? it.label : undefined}
              role="menuitem"
            >
              <span className="icon">{it.icon}</span>
              <span className="label">{it.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}