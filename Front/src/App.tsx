import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Favoritos from "./Components/Favoritos/Favoritos";
import MiPerfil from "./Components/MiPerfil/MiPerfil";
import MisCompras from "./Components/MisCompras/MisCompras";
import Notificaciones from "./Components/Notificaciones/Notificaciones";
import CarritoDeCompras from "./Components/CarritoDeCompras/CarritoDeCompras";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Help from "./Components/Help/Help";
import ProductDetail from "./Components/Detail/Detail";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProducts } from "./Redux/Slices/ProductsSlice";
import Registrar from "./Components/Registrar/Registrar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3000/products")
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
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favoritos" element={<Favoritos />} />
          <Route path="/MiPerfil" element={<MiPerfil />} />
          <Route path="/MisCompras" element={<MisCompras />} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
          <Route path="/CarritoDeCompras" element={<CarritoDeCompras />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/registrar" element={<Registrar />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
