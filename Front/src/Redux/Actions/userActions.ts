import axios from "axios";
import { setUsers, setUser } from "../Slices/UserSlice";
import { AppDispatch } from "../index";
import { User } from "../../types";

export const getAllUsers = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.get<User[]>(
                `${import.meta.env.VITE_ENDPOINT}/user`
            );
            console.log('Response from server:', res.data); // Agregamos este console.log
            dispatch(setUsers(res.data));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
};


export const getUserById = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get<User>(
            `${import.meta.env.VITE_ENDPOINT}/users/${id}`
        );
        console.log('Response from server:', res.data); // Agregamos este console.log
        dispatch(setUser(res.data));
    } catch (error) {
        console.error("Error fetching user by ID:", error);
    }
};
