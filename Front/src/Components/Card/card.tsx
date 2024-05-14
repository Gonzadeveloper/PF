function Card ({id, img, title, content, price, ratings}: {id: number, img: string, title: string, content: string, price: number, ratings: any[]}) {
    
    return (
        <div className="container mt-4">
          <div className="row">
                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img src={img} alt="avatar" />
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <p className="card-text">Price: {price}</p>
                      <p className="card-text">Descripción: {content}</p>
                    </div>
                  </div>
                </div>   
          </div>
        </div>
      );
}

export default Card;