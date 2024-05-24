import React, { useState } from "react";
import axios from "axios";

const Registrar: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeuser, setTypeuser] = useState("USER");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [country, setCountry] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_ENDPOINT}/user/`, {
        name,
        email,
        password,
        typeuser,
        address,
        city,
        state,
        postalcode,
        country,
      });
      setMessage("¡Usuario creado con éxito! Redirigiendo...");
      setMessageType("success");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Crear Cuenta</h2>
          {message && (
            <div
              className={`alert ${
                messageType === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="new-name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="new-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new-email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="new-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea una contraseña"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="typeuser" className="form-label">
                Tipo de Usuario
              </label>
              <select
                className="form-control"
                id="typeuser"
                value={typeuser}
                onChange={(e) => setTypeuser(e.target.value)}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="new-address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="new-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa tu dirección"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new-city" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                className="form-control"
                id="new-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ingresa tu ciudad"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new-state" className="form-label">
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                id="new-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Ingresa tu estado"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new-postalcode" className="form-label">
                Código Postal
              </label>
              <input
                type="text"
                className="form-control"
                id="new-postalcode"
                value={postalcode}
                onChange={(e) => setPostalcode(e.target.value)}
                placeholder="Ingresa tu código postal"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new-country" className="form-label">
                País
              </label>
              <input
                type="text"
                className="form-control"
                id="new-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Ingresa tu país"
                required
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
