// En el archivo categoryActions.ts
import axios from 'axios';
import { AppDispatch } from '../index'; // Asegúrate de importar el tipo AppDispatch
import { Category } from '../../types';
import { setCategories, addCategory, removeCategory } from '../../Redux/Slices/CategoriesSlice'; // Asegúrate de importar la acción setCategories desde tu Slice de categorías

// Definir la acción para obtener todas las categorías
export const getAllCategories = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.get<Category[]>(`${import.meta.env.VITE_ENDPOINT}/category`); // Ajusta la ruta de la API según tu configuración
            dispatch(setCategories(res.data)); // Llama a la acción setCategories con los datos obtenidos
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
};

export const createCategory = (category: Omit<Category, 'id'>) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.post<Category>(`${import.meta.env.VITE_ENDPOINT}/category`, category); // Ajusta la ruta de la API según tu configuración
            dispatch(addCategory(res.data)); // Llama a la acción addCategory con los datos obtenidos
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };
};

export const deleteCategory = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await axios.delete(`${import.meta.env.VITE_ENDPOINT}/category/${id}`);
            dispatch(removeCategory(id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
};

export const updateCategory = (updatedCategory: Category) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.put<Category>(`${import.meta.env.VITE_ENDPOINT}/category/${updatedCategory.id}`, updatedCategory); // Ajusta la ruta de la API según tu configuración
            // Actualiza la lista de categorías en el estado con la categoría actualizada
            dispatch(setCategories(prevState => {
                return prevState.map(category => {
                    if (category.id === updatedCategory.id) {
                        return res.data; // Retorna la categoría actualizada
                    }
                    return category; // Retorna las categorías que no se actualizaron
                });
            }));
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };
};