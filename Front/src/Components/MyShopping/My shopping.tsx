import { useDispatch, useSelector } from "react-redux";
import { selectAllOrders, selectProducts, selectUser } from "../../Redux/Selector";
import { useEffect, useState } from "react";
import { getAllOrders, newStatus } from "../../Redux/Actions/orderActions";
import { AppDispatch } from "../../Redux";
import { Order, Product } from "../../types";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


function MyShopping() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const allProds = useSelector(selectProducts)
    const user = useSelector(selectUser)
    const orders = useSelector(selectAllOrders)
    let products: Product[] = []


    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const ordersUser = orders.filter((ord: Order) => {
        if (user) { if (ord.userId == user.id) return ord }
    });

    function addProd(id: number, status: string, date: Date) {
        allProds.forEach((prod: Product) => {
            if (prod.id == id) {
                products = [
                    ...products,
                    {
                        ...prod,

                        status: status,
                        soldDate: date
                    }
                ]
            }
        })
    }


    ordersUser.forEach((ord: Order) => {
        ord.productOrder?.forEach((prod: ProductOrder) => addProd(prod.productId, ord.orderStatus, ord.orderDate))
    });

    const handleReceived = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedProductId(Number(e.currentTarget.value));
        setShowModal(true);
    }

    const confirmReceived = () => {
        ordersUser.forEach((ord) => ord.productOrder.forEach(prod => {
            if (prod.productId === selectedProductId) {
                dispatch(newStatus({ orderStatus: "Entregado" }, ord.id));
                navigate(`/review/${prod.productId}`)
            }
        }));
        setShowModal(false);
    }

    if (!user || user.length == 0) {
        return (
            <div className="container mt-5">
                <h1 className="mb-4">Mis compras</h1>
                <div className="row g-0 align-items-center">
                    <h3>No estas registrado</h3>
                    <br />
                    <h6>Inicia sesión o registrate o  para ver tus compras!</h6>
                </div>
                <button type="button" className="btn btn-primary" onClick={e => {
                    e.preventDefault()
                    navigate('/MiPerfil')
                }}>Iniciar sesión</button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="container mt-2">
                <h1 className="mb-5">Mis compras</h1>
                <div className="row g-0 align-items-center">
                    <h3>No tienes compras registradas.</h3>
                    <br />
                    <h6>Te invitamos a comprar!</h6>
                </div>
                <button type="button" className="btn btn-primary" onClick={e => {
                    e.preventDefault()
                    navigate('/Search')
                }}>Ir a comprar</button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Mis compras</h1>
            {products.map((prod) => {
                return (
                    <div className="card mb-4 mx-auto" style={{ width: '90%', maxWidth: '800px' }} key={prod.id}>
                        <div className="row g-0 align-items-center">
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{prod.name}</h5>
                                    <p className="text-muted mb-1">Estado de envío: {prod.status}</p>
                                    <p className="text-muted">Fecha de compra: {prod.soldDate}</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <img src={prod.image} alt="product" className="img-fluid" style={{ height: '150px', objectFit: 'cover', width: '100%' }} />
                            </div>
                            <div className="col-md-1 d-flex justify-content-center align-items-center">
                                {prod.status === "Enviado" && (
                                    <button type="button" className="btn btn-primary" onClick={handleReceived} value={prod.id}>📬</button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            {/* Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmación de Entrega</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Este boton indica que recibiste la orden con todos los productos 😊
                                ¿Estás seguro de que has recibido la orden?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={confirmReceived}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyShopping;
