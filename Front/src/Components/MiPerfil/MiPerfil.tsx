import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import styles from "./Miperfil.module.css";

const MiPerfil: React.FC = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const [formData, setFormData] = useState({
    password: "",
    typeuser: "USER",
    address: "",
    country: "",
    city: "",
    state: "",
    postalcode: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const getToken = async () => {
        const token = await getAccessTokenSilently();
        console.log("Token de acceso:", token); // Imprime el token en la consola
      };
      getToken();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && !formData.address) {
      getUserProfile();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/user`,
        {
          ...formData,
          name: user?.name,
          email: user?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      console.log("Token enviado:", token);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const getUserProfile = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userProfileData = response.data;
      setFormData((prevState) => ({
        ...prevState,
        address: userProfileData.address || "",
        country: userProfileData.country || "",
        city: userProfileData.city || "",
        state: userProfileData.state || "",
        postalcode: userProfileData.postalcode || "",
      }));
    } catch (error) {
      console.error("Error al obtener los datos del perfil:", error);
    }
  };

  if (isAuthenticated) {
    return (
      <div
        className={`${styles.container} mt-5 d-flex justify-content-center align-items-center`}>
        <div className={styles.card}>
          <div className={styles["card-body"]}>
            <h2 className={styles["card-title"]}>Perfil de Usuario</h2>
            <div className="text-center">
              {user && user.picture && (
                <img
                  src={user.picture}
                  className={styles.avatar}
                  alt="Avatar"
                />
              )}
              <p className={styles["card-text"]}>Bienvenido, {user?.name}</p>
              <p className={styles["card-text"]}>Email: {user?.email}</p>
              <button
                className={`btn btn-secondary mt-3 ${styles["btn-primary"]}`}
                onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancelar" : "Modificar Información"}
              </button>
              {showForm && (
                <form onSubmit={handleProfileSubmit} className="mt-3">
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      País
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      Estado
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="postalcode" className="form-label">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postalcode"
                      value={formData.postalcode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary ${styles["btn-primary"]}`}>
                    Guardar Información
                  </button>
                </form>
              )}
              <button
                className={`btn btn-primary mt-3 ${styles["btn-primary"]}`}
                onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Iniciar Sesión</h2>
          <button
            type="submit"
            className={`btn btn-primary ${styles["btn-primary"]}`}
            onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default MiPerfil;
