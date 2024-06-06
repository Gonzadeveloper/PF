import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllProds, updateProd, deleteProd } from '../../Redux/Actions/productActions';
import { AppDispatch } from '../../Redux/index';
import UpdateProductForm from '../MyProfile/components/SoldIitems/UpdateProductForm';
import { Row, Col } from 'react-bootstrap';

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(getAllProds());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            dispatch(deleteProd(id));
        }
    };

    const handleEdit = (product: any) => {
        setSelectedProduct(product);
        setShowUpdateForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
    };

    const handleUpdate = async (updatedProduct: any) => {
        try {
            await dispatch(updateProd(updatedProduct));
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleCancel = () => {
        setShowUpdateForm(false);
    };

    return (
        <div className="container my-4">
            <div className="header mb-4">
                <h1>Products</h1>
            </div>
            <Row>
                <Col md={showUpdateForm ? 6 : 12}>
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Condition</th>
                                <th>User</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.condition}</td>
                                    <td>{product.user ? product.user.name : ''}</td>
                                    <td>{product.category ? product.category.name : ''}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="btn btn-danger me-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="btn btn-primary"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                {showUpdateForm && selectedProduct && (
                    <Col md={6} ref={formRef}>
                        <UpdateProductForm
                            product={selectedProduct}
                            onCancel={handleCancel}
                            onUpdate={handleUpdate}
                        />
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Products;