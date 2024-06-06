import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-dark text-white p-3 position-sticky" style={{ top: 0, height: '100vh', width: '250px' }}>
            <h2 className="text-center mb-4">Admin Panel</h2>
            <ListGroup variant="flush">
                <ListGroup.Item className="bg-dark">
                    <Link to="orders" className="text-white text-decoration-none">
                        Orders
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark">
                    <Link to="products" className="text-white text-decoration-none">
                        Products
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark">
                    <Link to="categories" className="text-white text-decoration-none">
                        Categories
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark">
                    <Link to="users" className="text-white text-decoration-none">
                        Users
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
};

export default Sidebar;