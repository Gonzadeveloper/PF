import { setArticles } from "../../Redux/Slices/ProductsSlice"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/index';
import './Home.css'

function Home () {
    // const articles = [
    //     {
    //         id: 1,
    //         img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
    //         title: "First Article",
    //         content: "This is the first article.",
    //         price: 90,
    //         ratings: [
    //             {
    //                 stars: 3,
    //                 description: 'Este producto me resultó muy bueno'
    //             },
    //             {
    //                 stars: 4,
    //                 description: 'Me gustó mucho el producto'
    //             }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
    //         title: "Second Article",
    //         content: "This is the second article.",
    //         price: 230,
    //         ratings: [
    //             {
    //                 stars: 1,
    //                 description: 'Este producto me resultó muy malo'
    //             },
    //             {
    //                 stars: 2,
    //                 description: 'Me gustó aunque no tanto'
    //             }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
    //         title: "Third Article",
    //         content: "This is the third article.",
    //         price: 120,
    //         ratings: [
    //             {
    //                 stars: 5,
    //                 description: '¡Increíble producto!'
    //             },
    //             {
    //                 stars: 4,
    //                 description: 'Muy buena calidad'
    //             }
    //         ]
    //     },
    //     {
    //         id: 4,
    //         img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
    //         title: "Fourth Article",
    //         content: "This is the fourth article.",
    //         price: 150,
    //         ratings: [
    //             {
    //                 stars: 4,
    //                 description: 'Excelente relación calidad-precio'
    //             },
    //             {
    //                 stars: 3,
    //                 description: 'Buen producto, recomendado'
    //             }
    //         ]
    //     },
    //     {
    //         id: 5,
    //         img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
    //         title: "Fifth Article",
    //         content: "This is the fifth article.",
    //         price: 180,
    //         ratings: [
    //             {
    //                 stars: 5,
    //                 description: '¡Me encantó este producto!'
    //             },
    //             {
    //                 stars: 4,
    //                 description: 'Buena experiencia de compra'
    //             }
    //         ]
    //     },
    //     {
    //         id: 6,
    //         img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
    //         title: "Sixth Article",
    //         content: "This is the sixth article.",
    //         price: 200,
    //         ratings: [
    //             {
    //                 stars: 3,
    //                 description: 'Buen producto, cumplió mis expectativas'
    //             },
    //             {
    //                 stars: 4,
    //                 description: 'Lo recomendaría a mis amigos'
    //             }
    //         ]
    //     },
    //     {
    //         id: 7,
    //         img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
    //         title: "Seventh Article",
    //         content: "This is the seventh article.",
    //         price: 300,
    //         ratings: [
    //             {
    //                 stars: 4,
    //                 description: 'Muy satisfecho con la compra'
    //             },
    //             {
    //                 stars: 5,
    //                 description: 'Gran calidad y precio'
    //             }
    //         ]
    //     }
    // ];

    // const dispatch = useDispatch();

    // dispatch(setArticles(articles));

    // const article = useSelector((state: RootState) => state.articles.list);

    return (
            <div className="container">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="card">
                                <div className="img-wrapper">
                                    <img src="https://mariacarolinachapellin.com/wp-content/uploads/2020/05/celulares-hjj-1.jpg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Card title 1</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card">
                                <div className="img-wrapper">
                                    <img src="https://resizer.iproimg.com/unsafe/1280x/filters:format(webp)/https://assets.iprofesional.com/assets/jpeg/2023/09/560535.jpeg" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Card title 2</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card">
                                <div className="img-wrapper">
                                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpucKm2t9I8_IDEQP3cFbQj5V11739w7cY6wYgnD4UjqTHAeM8_Umpp4UvBge_Q9OG1f0ehHYXwBD3SCOm3aErsHwV5OfkFTbzEFN_LfDr6sVFAsyy5k1HmV1QoCIcNtPqvNpD7iRGfdxydNHO2SFz3fXa1oHUNCETI00AJi857JaJw5WqU8jtZ3tg/s1584/imagen_2023-03-23_203445988.png" className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Card title 3</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            <div className="container">
                <h1> 🔥Encontra lo que buscas 🔥</h1>

                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col">
                        <div className="card">
                        <img src="https://www.cronista.com/files/image/419/419139/61d3378d218ac.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Celulares</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                        <img src="https://www.rentadvisor.com.co/wp-content/uploads/images-2-500x281.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Computadoras</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                        <img src="https://cdn-us0.puzzlegarage.com/img/puzzle/5/645_preview.v2.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Auriculares</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                        <img src="https://vibes.okdiario.com/wp-content/uploads/2023/11/Television.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">Televisores</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
       
    );
}

export default Home;