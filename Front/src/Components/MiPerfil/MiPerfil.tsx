import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./MiPerfil.css";

const MiPerfil: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, loginWithPopup, logout, isAuthenticated, user } =
    useAuth0();

  const handleRegister = () => {
    navigate("/registrar");
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithRedirect();
  };

  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithPopup({
      authorizationParams: {
        connection: "google-oauth2",
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (isAuthenticated) {
    return (
      <div>
        <h2>Perfil de Usuario</h2>
        <div>
          <p>Bienvenido, {user?.name}</p>
          {user && user.picture && <img src={user.picture} alt="Avatar" />}
          <p>Tipo de usuario: {user?.["http://localhost:3000/typeuser"]}</p>
        </div>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    );
  }

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
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Autenticación con Google</h2>
          <button
            type="button"
            className="btn btn-secondary btn-google"
            onClick={handleGoogleLogin}>
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
