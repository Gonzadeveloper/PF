import { useDispatch, useSelector } from "react-redux";
import { selectAllOrders, selectProducts, selectUser } from "../../Redux/Selector";
import { useEffect } from "react";
import { getAllOrders } from "../../Redux/Actions/orderActions";
import { AppDispatch } from "../../Redux";
import { Order, Product } from "../../types";
import { setStatus } from "../../Redux/Slices/OrdersSlice";


function MyShopping() {
    const dispatch = useDispatch<AppDispatch>()
    const allProds = useSelector(selectProducts)
    const user = useSelector(selectUser)
    const orders = useSelector(selectAllOrders)
    let products: Product[] = []

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const ordersUser = orders.filter((ord:Order) => {
        if (ord.userId == 11) return ord
    })

    function addProd(id: number, status:string, date:Date) {
        allProds.forEach((prod:Product) => {
            if (prod.id == id) {
                products= [
                    ...products,
                    {...prod,
                        status: status,
                        soldDate: date
                    }
                ]
            }
        })
    }

    ordersUser.forEach((ord:Order) => {
        ord.productOrder?.forEach((prod:ProductOrder) => addProd(prod.productId, ord.orderStatus, ord.orderDate))
    })

    const handleReceived = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        ordersUser.forEach((ord)=>ord.productOrder.forEach(prod=>{
            if(prod.productId==e.currentTarget.value){dispatch(setStatus(
                {...ord,
                    orderStatus:"Recibido"
                }
            ))}
        }))
    }

    console.log(orders);
    
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Mis compras</h1>
            {products.map((prod) => {
                return (
                    <div className="card mb-4 mx-auto" key={prod.id} style={{ width: '90%', maxWidth: '800px' }}>
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
                                <button type="button" className="btn btn-primary" onClick={handleReceived} value={prod.id}>📬</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MyShopping;