import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllProds } from '../../Redux/Actions/productActions';
import { AppDispatch } from '../../Redux/index';
import { deleteProduct } from '../../Redux/Slices/ProductsSlice'; // Importar la acción deleteProduct

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(getAllProds());
    }, [dispatch]);

    // Función para manejar el clic en el botón Delete
    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id)); // Despachar la acción deleteProduct con el ID del producto
    };

    return (
        <div>
            <div className="header">
                <h1>Products</h1>
            </div>
            <table>
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
                                <button onClick={() => handleDelete(product.id)}>Delete</button> {/* Agregar onClick y llamar a la función handleDelete */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
