import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllCategories, createCategory, deleteCategory } from '../../Redux/Actions/categoryActions';
import { AppDispatch } from '../../Redux/index';
import { Category } from '../../types';

const Categories: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.categories);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleNewCategory = () => {
        dispatch(createCategory({ name: newCategoryName }));
        setNewCategoryName('');
    };

    const handleDelete = (id: number) => {
        dispatch(deleteCategory(id));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="header">
                        <h1>Categories</h1>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="New Category Name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleNewCategory}
                        >
                            Add
                        </button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category: Category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <button onClick={() => handleDelete(category.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Categories;
