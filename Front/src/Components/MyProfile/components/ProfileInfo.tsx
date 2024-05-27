import React from "react";
import styles from "../Miperfil.module.css";

interface ProfileInfoProps {
  user: any;
  showForm: boolean;
  setShowForm: (value: boolean) => void;
  handleLogout: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  user,
  showForm,
  setShowForm,
  handleLogout,
}) => {
  return (
    <div className="text-center">
      {user && user.picture && (
        <img src={user.picture} className={styles.avatar} alt="Avatar" />
      )}
      <p className={styles["card-text"]}>Bienvenido, {user?.name}</p>
      <p className={styles["card-text"]}>Email: {user?.email}</p>
      <button
        className={`btn btn-secondary mt-3 ${styles["btn-primary"]}`}
        onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancelar" : "Modificar Información"}
      </button>
      <button
        className={`btn btn-primary mt-3 ${styles["btn-primary"]}`}
        onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default ProfileInfo;
