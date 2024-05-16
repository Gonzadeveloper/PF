import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button, Form } from "react-bootstrap";
import "./MiPerfil.css"; // Archivo CSS para estilos personalizados

const MiPerfil: React.FC = () => {
  /* const responseGoogle = (response: any) => {
    // Lógica de inicio de sesión con Google
  };

  const handleCreateAccount = () => {
    // Lógica para crear cuenta
    console.log("Crear cuenta");
  }; */

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Ingresa tu e-mail o usuario de Electro Emporium</h2>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3">
              Iniciar sesión
            </Button>
          </Form>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3>Iniciar sesión con Google</h3>
              <GoogleLogin
                clientId="TU_ID_DE_CLIENTE_DE_GOOGLE"
                buttonText="Iniciar sesión con Google"
                /* onSuccess={responseGoogle}
                onFailure={responseGoogle} */
                cookiePolicy={"single_host_origin"}
              />
              <hr />
              <Button variant="primary" /* onClick={handleCreateAccount} */>
                Crear cuenta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
