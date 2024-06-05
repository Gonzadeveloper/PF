import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { getProdByName } from "../../Redux/Actions/productActions";
import "./Navbar.css";

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
              <button 
              className="btn btn-primary"
              type="submit"
              >🔎
              </button>
              
            </div>
          </form>
        </div>
      </div>
      <div className="container d-flex justify-content-end">
        <div className="d-flex align-items-center">

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/newproduct')}}>Vende</button>


          <Link to="Search">
            <button className="btn btn-outline-light me-2">Compra</button>
          </Link>


          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/Favoritos')}}>Favoritos</button>

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/MiPerfil')}}>Mi Perfil</button>

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/MisCompras')}}>Mis compras</button>

          <button className="btn btn-outline-light me-2" onClick={e => {e.preventDefault()
            navigate('/Help')}}>Help
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;