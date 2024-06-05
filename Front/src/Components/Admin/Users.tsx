import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllUsers, deleteUser } from '../../Redux/Actions/userActions';
import { AppDispatch } from '../../Redux/index'; // Asegúrate de importar el tipo AppDispatch

const Users: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Tipo dispatch como AppDispatch
    const { users } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id));
    };

    return (
        <div>
            <div className="header">
                <h1>Users</h1>
            </div>
            <table>
                <thead>
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
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;