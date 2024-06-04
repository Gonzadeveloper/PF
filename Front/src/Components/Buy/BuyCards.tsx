function BuyCards ({ id, image, name, price, quantity, updateQuantity, removeItem, decrementItem}){
    
    return (
        <div className="card mb-3" style={{ maxWidth: '540rem' }}>
            <div className="row g-0">
                    <div className="col-md-4">
                    <img src={image} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5> 
                        <p className="card-text">Precio por unidad: {price}</p>
                        <p className="card-text"><small className="text-body-secondary"> unidades: {quantity}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyCards;