import React from "react";
import "./Registrar.css";

const Registrar: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Crear Cuenta</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="new-email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="new-email"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new-password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="new-password"
                placeholder="Crea una contraseña"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar;
