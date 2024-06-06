import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllUsers, deleteUser } from '../../Redux/Actions/userActions';
import { AppDispatch } from '../../Redux/index';

const Users: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este Usuario?")) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div className="container my-4">
            <div className="header mb-4">
                <h1>Users</h1>
            </div>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;