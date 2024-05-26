import React from "react";
import styles from "../Miperfil.module.css";

interface ProfileFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfileSubmit: (e: React.FormEvent) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  handleInputChange,
  handleProfileSubmit,
}) => {
  return (
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
  );
};

export default ProfileForm;
