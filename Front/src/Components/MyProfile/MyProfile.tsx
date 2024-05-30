import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import styles from "./Miperfil.module.css";
import ProfileForm from "./components/ProfileForm";
import ProfileInfo from "./components/ProfileInfo";
import UserProducts from "./components/UserProducts";
import axios from "axios";
import { FormData } from "../../types";

const MiPerfil: React.FC = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    logout,
    userData,
  } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    password: "",
    typeuser: "USER",
    picture: "",
    address: "",
    country: "",
    city: "",
    state: "",
    postalcode: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user && userData) {
      getUserData();
    }
  }, [user, userData]);

  const getUserData = async () => {
    if (!userData) return console.error("La variable userData es null");

    const token = await getAccessTokenSilently();
    return axios
      .get(`${import.meta.env.VITE_ENDPOINT}/user/${userData.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const userDataFromServer = response.data.user;
        setFormData({
          password: userDataFromServer.password || "",
          typeuser: userDataFromServer.typeuser || "USER",
          picture: userDataFromServer.picture || "",
          address: userDataFromServer.address[0]?.address || "",
          country: userDataFromServer.address[0]?.country || "",
          city: userDataFromServer.address[0]?.city || "",
          state: userDataFromServer.address[0]?.state || "",
          postalcode: userDataFromServer.address[0]?.postalcode || "",
        });
        console.log("Datos del usuario obtenidos:", userDataFromServer);
      })
      .catch((error) =>
        console.error("Error al obtener los datos del usuario:", error)
      );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();

      if (!userData?.id) {
        console.error("El ID del usuario es undefined");
        throw new Error("ID del usuario no definido");
      }

      const response = await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/user/${userData.id}`,
        {
          name: user?.name,
          picture: user?.picture,
          email: user?.email,
          password: formData.password,
          typeuser: formData.typeuser,
          address: formData.address,
          country: formData.country,
          city: formData.city,
          state: formData.state,
          postalcode: formData.postalcode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      throw error;
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(
        `${import.meta.env.VITE_ENDPOINT}/user/${userData.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      logout({ returnTo: window.location.origin });
      console.log("Cuenta eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  };

  const handleLoginClick = () => {
    loginWithRedirect();
  };
  useEffect(() => {
    if (isAuthenticated && userData) {
      getUserData();
    }
  }, [isAuthenticated, userData]);

  return isAuthenticated ? (
    <div className={`container ${styles.outerContainer} mt-5`}>
      <div className={`row ${styles.container}`}>
        <div className={`col-md-4 ${styles.leftContainer}`}>
          <div className={`card ${styles.card}`}>
            <div className={`card-body ${styles["card-body"]}`}>
              <h2 className={`card-title ${styles["card-title"]}`}>
                Perfil de Usuario
              </h2>
              <ProfileInfo
                user={user}
                showForm={showForm}
                setShowForm={setShowForm}
                handleLogout={logout}
              />
              {showForm && (
                <ProfileForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleProfileSubmit={handleProfileSubmit}
                />
              )}
              <button
                className="btn btn-danger mt-3"
                onClick={handleDeleteAccount}>
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
        <div className={`col-md-7 ml-4 ${styles.rightContent}`}>
          <h2 className={`card-title ${styles["card-title"]}`}>
            Articulos en venta
            <hr></hr>
          </h2>
          <UserProducts products={userData?.products || []} />
        </div>
      </div>
    </div>
  ) : (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Iniciar Sesión</h2>
          <button
            className={`btn btn-primary ${styles["btn-primary"]}`}
            onClick={handleLoginClick}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
