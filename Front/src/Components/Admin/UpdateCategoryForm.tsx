import React, { useState } from "react";
import { Category } from "../../types";
import { Form, Button } from "react-bootstrap";

interface UpdateCategoryFormProps {
    category: Category;
    onCancel: () => void;
    onUpdate: (category: Category) => void;
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
    category,
    onCancel,
    onUpdate,
}) => {
    const [updatedCategory, setUpdatedCategory] = useState<Category>({ ...category });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedCategory({ ...updatedCategory, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate(updatedCategory);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Nombre de la Categoría</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={updatedCategory.name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={onCancel}>
                Cancelar
            </Button>
        </Form>
    );
};

export default UpdateCategoryForm;