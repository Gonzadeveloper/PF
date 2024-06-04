import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllCategories } from '../../Redux/Actions/categoryActions';
import { AppDispatch } from '../../Redux/index';
import { Category } from '../../types';

const Categories: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    return (
        <div>
            <div className="header">
                <h1>Categories</h1>
                <button>New</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Deleted At</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category: Category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.deletedAt ? category.deletedAt : 'N/A'}</td>
                            <td>{category.createdAt}</td>
                            <td>{category.updatedAt}</td>
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

export default Categories;
