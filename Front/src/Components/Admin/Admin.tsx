import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Orders from '../Admin/Orders';
import Products from '../Admin/Products';
import Categories from '../Admin/Categories';
import Users from '../Admin/Users';

const Admin: React.FC = () => {
    const location = useLocation();
    console.log('Current Location:', location);

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="content">
                <Routes>
                    <Route path="orders" element={<Orders />} />
                    <Route path="products" element={<Products />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="users" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;
