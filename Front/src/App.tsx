import { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Favorites from "./Components/Favorites/Favorites";
import MyProfile from "./Components/MyProfile/MyProfile";
import MyShopping from "./Components/MyShopping/My shopping";
import Notifications from "./Components/Notifications/Notifications";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Help from "./Components/Help/Help";
import ProductDetail from "./Components/Detail/Detail";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProducts } from "./Redux/Slices/ProductsSlice";
import Registrar from "./Components/Registrar/Registrar";
import NewProduct from './Components/NewProduct/NewProduct'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_ENDPOINT}/products`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setProducts(data.products));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favoritos" element={<Favorites />} />
          <Route path="/MiPerfil" element={<MyProfile />} />
          <Route path="/MisCompras" element={<MyShopping />} />
          <Route path="/Notificaciones" element={<Notifications />} />
          <Route path="/CarritoDeCompras" element={<ShoppingCart />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path='/newproduct' element={<NewProduct/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
