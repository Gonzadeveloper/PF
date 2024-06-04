// components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/admin/orders">Ordenes</Link></li>
                <li><Link to="/admin/products">Productos</Link></li>
                <li><Link to="/admin/categories">Categorias</Link></li>
                <li><Link to="/admin/users">Usuarios</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
