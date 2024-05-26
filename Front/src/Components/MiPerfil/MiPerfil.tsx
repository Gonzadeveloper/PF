import React, { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import styles from "./Miperfil.module.css";
import ProfileForm from "./components/ProfileForm";
import ProfileInfo from "./components/ProfileInfo";
import axios from "axios";

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

  useEffect(() => {
    if (userData) {
      setFormData({
        password: "",
        typeuser: userData.typeuser || "USER",
        address: userData.address || "",
        country: userData.country || "",
        city: userData.city || "",
        state: userData.state || "",
        postalcode: userData.postalcode || "",
      });
    }
  }, [userData]);

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

  const handleLoginClick = async () => {
    await loginWithRedirect();
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
      <div className="d-flex justify-content-center align-items-center">
        <button onClick={handleLoginClick} className="btn btn-primary">
          Iniciar sesión
        </button>
      </div>
    );
  }
};

export default MiPerfil;
