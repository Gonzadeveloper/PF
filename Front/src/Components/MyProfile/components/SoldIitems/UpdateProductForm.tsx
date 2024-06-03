import React, { useState } from "react";
import { Product } from "../../../../types";
import { Form, Button } from "react-bootstrap";
import styles from "./UpdateProductForm.module.css";

interface UpdateProductFormProps {
  product: Product;
  onCancel: () => void;
  onUpdate: (product: Product) => void;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  product,
  onCancel,
  onUpdate,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(updatedProduct);
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.formContainer}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={updatedProduct.name}
          onChange={handleChange}
          className={styles.formInput}
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={updatedProduct.description}
          onChange={handleChange}
          className={styles.formInput}
        />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={updatedProduct.price}
          onChange={handleChange}
          className={styles.formInput}
        />
      </Form.Group>

      <Form.Group controlId="formStock">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={updatedProduct.stock}
          onChange={handleChange}
          className={styles.formInput}
        />
      </Form.Group>
      <Form.Group controlId="formCondition">
        <Form.Label>Condición</Form.Label>
        <Form.Control
          as="select"
          name="condition"
          value={updatedProduct.condition}
          onChange={handleChange}
          className={styles.formInput}>
          <option value="NUEVO">NUEVO</option>
          <option value="USADO">USADO</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" className={styles.formButton}>
        Guardar Cambios
      </Button>
      <Button
        variant="secondary"
        onClick={onCancel}
        className={styles.formButton}>
        Cancelar
      </Button>
    </Form>
  );
};

export default UpdateProductForm;
