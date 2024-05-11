import { setArticles } from "../../Redux/Slices/ArticlesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/index";
import Card from "../Card/Card";

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
    <div>
      {articles.map((article) => (
        <Card
          key={article.id}
          id={article.id}
          img={article.img}
          title={article.title}
          content={article.content}
          price={article.price}
          ratings={article.ratings}
        />
      ))}
    </div>
  );
}

export default Home;
