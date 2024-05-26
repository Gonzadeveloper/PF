// MiPerfil.tsx
import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import styles from "./Miperfil.module.css";
import ProfileForm from "./components/ProfileForm";
import ProfileInfo from "./components/ProfileInfo";
import axios from "axios";

// Define una interfaz para los datos del formulario
interface FormData {
  password: string;
  typeuser: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postalcode: string;
}

const MiPerfil: React.FC = () => {
  // Hook de autenticación
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    password: "",
    typeuser: "USER",
    address: "",
    country: "",
    city: "",
    state: "",
    postalcode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState: FormData) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Estado para controlar la visualización del formulario
  const [showForm, setShowForm] = useState(false);

  // Función para manejar la presentación del formulario
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/user/${user?.id}`,
        {
          name: user?.name,
          email: user?.email,
          password: formData.password,
          typeuser: "USER",
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
      console.log("Token enviado:", token);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  // Renderizado del componente basado en si el usuario está autenticado o no
  if (isAuthenticated) {
    return (
      <div
        className={`${styles.container} mt-5 d-flex justify-content-center align-items-center`}>
        <div className={styles.card}>
          <div className={styles["card-body"]}>
            <h2 className={styles["card-title"]}>Perfil de Usuario</h2>
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
          </div>
        </div>
      </div>
    );
  }

  // Si el usuario no está autenticado, muestra la opción para iniciar sesión
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Iniciar Sesión</h2>
          <button
            type="submit"
            className={`btn btn-primary ${styles["btn-primary"]}`}
            onClick={() => loginWithRedirect()}>
            Iniciar Sesión
          </button>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default MiPerfil;
