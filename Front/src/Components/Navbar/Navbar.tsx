import React, { useState } from "react";
import { FaShoppingCart, FaBell, FaSearch } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductByName } from "../../Redux/Slices/ProductsSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { getAllProds, getProdByName } from "../../Redux/Actions/productActions";

const Navbar = () => {
  const dispatch = useDispatch()
  const [searchString, setSearchString] = useState("")

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchString(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(getProdByName(searchString))
  }

  const handleCompraSubmit = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    dispatch(getAllProds())
  }
  
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/">
            <img src={logo} alt="Logo" className="navbar-brand logo" />
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Buscar..."
                onChange={e=>handleChange(e)}
                
              />
                <button type="submit">
                  <Link to="Search">
                  <FaSearch />
                  </Link>
                </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container d-flex justify-content-end">
        <div className="d-flex align-items-center">

          <Link to="newproduct">
            <button className="btn btn-outline-light me-2">Vende</button>
          </Link>

         
            <button className="btn btn-outline-light me-2" onClick={handleCompraSubmit}><Link to="Search">Compra</Link></button>

          <Link to="Favoritos">
            <button className="btn btn-outline-light me-2">Favoritos</button>
          </Link>

          <Link to="MiPerfil">
            <button className="btn btn-outline-light me-2">Mi Perfil</button>
          </Link>

          <Link to="MisCompras">
            <button className="btn btn-outline-light me-2">Mis compras</button>
          </Link>

          <Link to="Help">
            <button className="btn btn-outline-light me-2">Help</button>
          </Link>

          <Link to="Notificaciones">
            <button className="btn btn-outline-light">
              <FaBell />
            </button>
          </Link>

          <Link to="CarritoDeCompras">
            <button className="btn btn-outline-light">
              <FaShoppingCart />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
