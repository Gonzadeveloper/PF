import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Orders from '../Admin/Orders';
import Products from '../Admin/Products';
import Categories from '../Admin/Categories';
import Users from '../Admin/Users';
import { Container, Row, Col } from 'react-bootstrap';

const Admin: React.FC = () => {
    const location = useLocation();
    console.log('Current Location:', location);

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col md={10} className="p-4">
                    <Routes>
                        <Route path="orders" element={<Orders />} />
                        <Route path="products" element={<Products />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="users" element={<Users />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;