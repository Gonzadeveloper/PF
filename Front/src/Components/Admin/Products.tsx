import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllProds, updateProd } from '../../Redux/Actions/productActions';
import { AppDispatch } from '../../Redux/index';
import { deleteProduct } from '../../Redux/Slices/ProductsSlice';
import UpdateProductForm from '../MyProfile/components/SoldIitems/UpdateProductForm'; // Importar el componente UpdateProductForm
import { Row, Col } from 'react-bootstrap'; // Importar Row y Col de react-bootstrap

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null); // Estado para almacenar el producto seleccionado

    useEffect(() => {
        dispatch(getAllProds());
    }, [dispatch]);

    // Función para manejar el clic en el botón Delete
    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id));
    };

    // Función para manejar el clic en el botón Edit
    const handleEdit = (product: any) => {
        setSelectedProduct(product);
        setShowUpdateForm(true);
    };

    // Función para manejar el envío del formulario de actualización
    const handleUpdate = async (updatedProduct: any) => {
        try {
            await dispatch(updateProd(updatedProduct));
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Función para manejar el cancelar la edición
    const handleCancel = () => {
        setShowUpdateForm(false);
    };

    return (
        <div>
            <div className="header">
                <h1>Products</h1>
            </div>
            <Row>
                <Col md={showUpdateForm ? 6 : 12}> {/* Si se muestra el formulario, ocupará 6 columnas, de lo contrario, ocupará 12 columnas */}
                    <table className="table">
                        <thead>
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
                                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                                        <button onClick={() => handleEdit(product)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                {showUpdateForm && selectedProduct && (
                    <Col md={6}> {/* El formulario ocupa 6 columnas cuando se muestra */}
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
