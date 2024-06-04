// En el archivo categoryActions.ts
import axios from 'axios';
import { AppDispatch } from '../index'; // Asegúrate de importar el tipo AppDispatch
import { Category } from '../../types';
import { setCategories } from '../../Redux/Slices/CategoriesSlice'; // Asegúrate de importar la acción setCategories desde tu Slice de categorías

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
