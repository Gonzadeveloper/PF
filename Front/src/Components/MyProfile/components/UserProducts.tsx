import React from "react";
import { Product } from "../../../types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface UserProductsProps {
  products: Product[];
}

const UserProducts: React.FC<UserProductsProps> = ({ products }) => {
  return (
    <div className="row row-cols-1 row-cols-md-1 g-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="col mb-4" key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Condición: {product.condition}</Card.Text>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary">
                  Ver Detalles
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <div className="col mb-4">
          <Card>
            <Card.Body>
              <Card.Title>No tienes productos en venta</Card.Title>
              <Card.Text>
                ¡Aún no has registrado ningún producto para la venta! Si tienes
                artículos que deseas vender, puedes crearlos haciendo clic en el
                botón a continuación.
              </Card.Text>
              <Link to="/newproduct" className="btn btn-primary">
                Crear Producto
              </Link>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserProducts;
