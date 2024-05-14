import React from "react";
import { FaShoppingCart, FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/">
            <img src={logo} alt="Logo" className="navbar-brand logo" />
          </Link>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar..."
            />
            <Link to="Search">
              <FaSearch />
            </Link>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-end">
        <div className="d-flex align-items-center">
          <Link to="Favoritos">
            <button className="btn btn-outline-light me-2">Favoritos</button>
          </Link>

          <Link to="MiPerfil">
            <button className="btn btn-outline-light me-2">Mi Perfil</button>
          </Link>

          <Link to="MisCompras">
            <button className="btn btn-outline-light me-2">Mis compras</button>
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