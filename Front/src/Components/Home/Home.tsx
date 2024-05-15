import { setArticles } from "../../Redux/Slices/ArticlesSlice"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/index';
import './style.css'

function Home() {
  const articles = [
    {
      id: 1,
      img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
      title: "First Article",
      content: "This is the first article.",
      price: 90,
      ratings: [
        {
          stars: 3,
          description: "Este producto me resultó muy bueno",
        },
        {
          stars: 4,
          description: "Me gustó mucho el producto",
        },
      ],
    },
    {
      id: 2,
      img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
      title: "Second Article",
      content: "This is the second article.",
      price: 230,
      ratings: [
        {
          stars: 1,
          description: "Este producto me resultó muy malo",
        },
        {
          stars: 2,
          description: "Me gustó aunque no tanto",
        },
      ],
    },
    {
      id: 3,
      img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
      title: "Third Article",
      content: "This is the third article.",
      price: 120,
      ratings: [
        {
          stars: 5,
          description: "¡Increíble producto!",
        },
        {
          stars: 4,
          description: "Muy buena calidad",
        },
      ],
    },
    {
      id: 4,
      img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
      title: "Fourth Article",
      content: "This is the fourth article.",
      price: 150,
      ratings: [
        {
          stars: 4,
          description: "Excelente relación calidad-precio",
        },
        {
          stars: 3,
          description: "Buen producto, recomendado",
        },
      ],
    },
    {
      id: 5,
      img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
      title: "Fifth Article",
      content: "This is the fifth article.",
      price: 180,
      ratings: [
        {
          stars: 5,
          description: "¡Me encantó este producto!",
        },
        {
          stars: 4,
          description: "Buena experiencia de compra",
        },
      ],
    },
    {
      id: 6,
      img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
      title: "Sixth Article",
      content: "This is the sixth article.",
      price: 200,
      ratings: [
        {
          stars: 3,
          description: "Buen producto, cumplió mis expectativas",
        },
        {
          stars: 4,
          description: "Lo recomendaría a mis amigos",
        },
      ],
    },
    {
      id: 7,
      img: "https://tiendadiggit.com.ar/web/image/product.product/16003/image_128",
      title: "Seventh Article",
      content: "This is the seventh article.",
      price: 300,
      ratings: [
        {
          stars: 4,
          description: "Muy satisfecho con la compra",
        },
        {
          stars: 5,
          description: "Gran calidad y precio",
        },
      ],
    },
  ];

  const dispatch = useDispatch();

  dispatch(setArticles(articles));

  const article = useSelector((state: RootState) => state.articles.list);


  return (
    <div className="container">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="card">
              <div className="img-wrapper">
                <img src="https://tiendadiggit.com.ar/web/image/product.product/16003/image_128" className="card-img-top" alt="..." />
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
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lg.com%2Fcl%2Flg-telefonos-moviles%2Fsmartphones%2Fa270%2F&psig=AOvVaw0KzPc8mavUJa0x86stZ5T0&ust=1715788029827000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjw3NO-jYYDFQAAAAAdAAAAABAX" className="card-img-top" alt="..." />
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
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Far.celulares.com%2Fnokia%2F6610&psig=AOvVaw0KzPc8mavUJa0x86stZ5T0&ust=1715788029827000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjw3NO-jYYDFQAAAAAdAAAAABAf" className="card-img-top" alt="..." />
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
    </div>

  );
}

export default Home;
