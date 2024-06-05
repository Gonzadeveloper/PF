import React, { useState, useEffect } from "react";
import { Product } from "../../../../types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProd,
  deleteProd,
} from "../../../../Redux/Actions/productActions";
import UpdateProductForm from "./UpdateProductForm";
import styles from "./UserProducts.module.css";
import { setStatus } from "../../../../Redux/Slices/OrdersSlice";
import { selectAllOrders } from "../../../../Redux/Selector";
import { newStatus } from "../../../../Redux/Actions/orderActions";
import { AppDispatch } from "../../../../Redux";

interface UserProductsProps {
  products: Product[];
}

const UserProducts: React.FC<UserProductsProps> = ({ products }) => {

  const dispatch = useDispatch<AppDispatch>();
  const glOrders = useSelector(selectAllOrders);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleEdit = (productId: number) => {
    setEditProductId(productId);
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
  };

  const handleUpdate = (updatedProduct: Product) => {
    dispatch(updateProd(updatedProduct)).then(() => {
      setLocalProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setEditProductId(null);
    });
  };

  const handleDelete = (productId: number) => {
    dispatch(deleteProd(productId)).then(() => {
      setLocalProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    });
  };

  const handleStatus = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    setSelectedProductId(product.id);
    setShowModal(true);
  }

  const confirmStatusChange = () => {
    localProducts.forEach((produ) => {
      glOrders.forEach((ord) => ord.productOrder.forEach((prod) => {
        if (prod.productId === produ.id && produ.id === selectedProductId) {
          dispatch(newStatus({
            orderStatus: "Enviado"
          }, ord.id));
        }
      }))
    });
    setShowModal(false);
  }

  return (
    <div className="row row-cols-1 row-cols-md-1 g-4">
      {localProducts.length > 0 ? (
        localProducts.map((product) => {
          return (
            <div className="col mb-4" key={product.id}>
              {editProductId === product.id ? (
                <UpdateProductForm
                  product={product}
                  onCancel={handleCancelEdit}
                  onUpdate={handleUpdate}
                />
              ) : (
                <Card className={`position-relative ${styles.productCard}`}>
                  <Card.Img
                    variant="top"
                    src={product?.image}
                    className={styles.productImage}
                  />
                  {glOrders.map(order => 
                   order.productOrder&&order.productOrder.map(prod => 
                      prod.productId === product.id && order.orderStatus === "Pendiente" && (
                        <button
                          className="btn btn-secondary position-absolute"
                          style={{ top: '10px', right: '10px' }}
                          onClick={e => handleStatus(e, product)}
                          key={prod.productId}
                        >
                          🚚
                        </button>
                      )
                    )
                  )}
                  <Card.Body>
                    <Card.Title>
                      <h3 className="mb-3">{product?.name}</h3>
                    </Card.Title>
                    <Card.Text>
                      <strong>Descripción: </strong>
                      {product?.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Condición: </strong>
                      {product?.condition}
                    </Card.Text>
                    <Card.Text>
                      <strong>Precio: </strong>${product?.price?.toFixed(2)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Cantidad en Stock: </strong>
                      {product?.stock}
                    </Card.Text>
                    <Link
                      to={`/products/${product.id}`}
                      className={`btn btn-primary ${styles.btnSpace}`}
                    >
                      Ver Detalles
                    </Link>
                    <button
                      className={`btn btn-warning ${styles.btnSpace}`}
                      onClick={() => handleEdit(product.id)}
                    >
                      Modificar
                    </button>
                    <button
                      className={`btn btn-danger ${styles.btnSpace}`}
                      onClick={() => handleDelete(product.id)}
                    >
                      Eliminar
                    </button>
                  </Card.Body>
                </Card>
              )}
            </div>
          );
        })
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

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Cambio de Estado</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas cambiar el estado a "Enviado"?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={confirmStatusChange}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
