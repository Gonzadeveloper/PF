import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { getAllProds, getProdByName } from "../../Redux/Actions/productActions";

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchString, setSearchString] = useState("")

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchString(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchString != "") {
      dispatch(getProdByName(searchString))
    } else {
      dispatch(getAllProds())
    }
    navigate('/Search')
  }

  const handleCompraSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(getAllProds())
    navigate('/Search')
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">

          <img src={logo} alt="Logo" className="navbar-brand logo" onClick={e => {e.preventDefault()
            navigate('/')}} />

          <form onSubmit={handleSubmit}>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Buscar..."
                onChange={e => handleChange(e)}
              />
              <button type="submit">
                🔎
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container d-flex justify-content-end">
        <div className="d-flex align-items-center">

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/newproduct')}}>Vende</button>

          <button className="btn btn-outline-light me-2" onClick={handleCompraSubmit}>Compra</button>

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/Favoritos')}}>Favoritos</button>

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/MiPerfil')}}>Mi Perfil</button>

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/MisCompras')}}>Mis compras</button>

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/Help')}}>Help
          </button>

          <button className="btn btn-outline-light" onClick={(e)=>{e.preventDefault()
            navigate('/Notificaciones')}}>
            <FaBell />
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;