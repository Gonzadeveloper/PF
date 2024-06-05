import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import MiPerfil from "./Components/MyProfile/MyProfile";
import { useEffect } from "react";
import Favorites from "./Components/Favorites/Favorites";
import MyShopping from "./Components/MyShopping/My shopping";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCartI";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Help from "./Components/Help/Help";
import ProductDetail from "./Components/Detail/Detail";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewProduct from "./Components/NewProduct/NewProduct";
import { getAllProds } from "./Redux/Actions/productActions";
import Buy from "./Components/Buy/Buy";
import Admin from "./Components/Admin/Admin";
import Review from "./Components/Review/Review";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProds());
  }, [dispatch]);

  return (
    <div className=" d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Navbar />
      <ShoppingCart />
      <div className="container flex-grow-1">
        <Routes>
          <Route path="/Buy" element={<Buy />} />
          <Route path="/" element={<Home />} />
          <Route path="/Favoritos" element={<Favorites />} />
          <Route path="/MiPerfil" element={<MiPerfil />} />
          <Route path="/MisCompras" element={<MyShopping />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
