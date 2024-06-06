import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import styles from "./Miperfil.module.css";
import ProfileForm from "./components/ProfileForm";
import ProfileInfo from "./components/ProfileInfo";
import UserProducts from "./components/SoldIitems/UserProducts";
import axios from "axios";
import { FormData } from "../../types";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const MiPerfil: React.FC = () => {

  const navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && userData) {
      getUserData();
    }
  }, [isAuthenticated, userData]);

  useEffect(() => {
    if (user && isAuthenticated && !userData) {
      getUserData();
    }
  }, [user, isAuthenticated, userData]);

  const getUserData = async () => {
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
        setIsLoading(false);
      });
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

      localStorage.setItem("user", JSON.stringify(response.data));
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
      console.log("Cuenta eliminada con éxito");

      alert("Cuenta recientemente eliminada");

      setTimeout(() => {
        logout();
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 1000);
        console.log("Sesión cerrada");
        localStorage.removeItem("user");
      }, 1000);
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  };

  const handleLoginClick = () => {
    loginWithRedirect();
  };

  return isAuthenticated ? (
    <div className={`container ${styles.outerContainer} mt-5`}>
      {isLoading ? (
        <div className="loading-container">
          <ClipLoader size={150} />
        </div>
      ) : (
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
              Artículos en venta
              <hr />
            </h2>
            <UserProducts products={userData?.products || []} />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <h2 className={styles.welcomeMessage}>
          ¡Bienvenido a Electro Emporium!
        </h2>
        <p className={styles.loginMessage}>
          ¡El mejor lugar para explorar y comprar una amplia gama de productos
          electrónicos! Sumérgete en el emocionante mundo de la tecnología y
          descubre las últimas novedades en dispositivos electrónicos, desde
          smartphones y laptops hasta dispositivos inteligentes para el hogar.
        </p>

        <p className={styles.loginMessage}>
          ¡Regístrate ahora para comenzar a explorar nuestro catálogo y
          disfrutar de una experiencia de compra incomparable en Electro
          Emporium!
        </p>
        <button
          className={`btn btn-primary ${styles.loginButton}`}
          onClick={handleLoginClick}>
          Iniciar Sesión
        </button>

        <br></br>
        <br></br>
        <button
          className="btn btn-success mr-2" // Agregar clases de Bootstrap para color verde y margen a la derecha
          onClick={() => navigate("/Admin")} // Navegar a la ruta "/Admin" al hacer clic en el botón
        >
          Logearse como Administrador
        </button>
      </div>
    </div>
  );
};

export default MiPerfil;