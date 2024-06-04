import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllProds } from '../../Redux/Actions/productActions';
import { AppDispatch } from '../../Redux/index'; // Asegúrate de importar el tipo AppDispatch

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Tipo dispatch como AppDispatch
    const { products } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(getAllProds());
    }, [dispatch]);

    return (
        <div>
            <div className="header">
                <h1>Products</h1>
                <button>New</button>
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
                            <td>{product.user.name}</td>
                            <td>{product.category.name}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
