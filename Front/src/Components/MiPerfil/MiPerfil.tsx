import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import styles from "./Miperfil.module.css";
import ProfileForm from "./components/ProfileForm";
import ProfileInfo from "./components/ProfileInfo";
import axios from "axios";
import { FormData } from "../../types"; // Importamos la interfaz FormData desde types.ts

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
    address: "",
    country: "",
    city: "",
    state: "",
    postalcode: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState: FormData) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();

      if (!userData?.id) {
        console.error("El ID del usuario es undefined");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/user/${userData.id}`,
        {
          name: user?.name,
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
      console.log("Token enviado:", token);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User:", user);
    }
  }, [user]);

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
  } else {
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
  }
};

export default MiPerfil;
