import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

const MiPerfil: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/registrar");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Iniciar Sesión</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Autenticación con Google</h2>
          <button type="button" className="btn btn-secondary btn-google">
            Iniciar Sesión con Google
          </button>
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleRegister}>
              Crear Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
