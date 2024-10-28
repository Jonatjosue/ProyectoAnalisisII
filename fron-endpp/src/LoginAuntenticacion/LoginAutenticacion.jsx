import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import CryptoJs from "crypto-js";
import { AuthContext } from "../autenticacion/AuthContext";
import { useNavigate } from 'react-router-dom';

function ErrorAutenticacion({ respuesta, mostrar, onHidden }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mostrar) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onHidden();  // Restablecer el estado cuando el error se oculta
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mostrar, onHidden]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        width: "300px",
      }}
    >
      <strong>Error:</strong> {respuesta || "Ocurrió un problema inesperado. Inténtalo de nuevo."}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
}

const LoginAutenticacion = () => {
  const [persona, setPersona] = useState({ usuario: "", password: "" });
  const [errorRespuesta, setErrorRespuesta] = useState("");
  const [mostrarError, setMostrarError] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const iniciarSesion = async (event) => {
    event.preventDefault();
    const formValido = event.target.reportValidity();

    if (formValido) {
      const hashedPassword = generateMD5Hash(persona.password);
      const credenciales = { username: persona.usuario, password: hashedPassword };

      try {
        const response = await axios.post("http://127.0.0.1:8081/api/Usuario/login", credenciales, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.data.respuesta.respuesta === true) {
          redirigir(response.data.token, response.data.role, persona.usuario); // Pass the username here
        } else {
          setErrorRespuesta(response.data.respuesta.descripcion);
          setMostrarError(true);
        }
      } catch (error) {
        setErrorRespuesta("Error de conexión con el servidor");
        setMostrarError(true);
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const generateMD5Hash = (str) => {
    return CryptoJs.MD5(str).toString();
  };

  const redirigir = (token, idrole, username) => {
    login(token, idrole);
    localStorage.setItem('username', username); // Store username in localStorage
    const startSession = new Date().toISOString(); // Capture current date/time
    localStorage.setItem('startSession', startSession); // Store session start time in localStorage
  };

  const ocultarError = () => {
    setMostrarError(false);
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={iniciarSesion} id="formUsuario">
              <div className="form-outline mb-4">
                <input
                  id="campoUsuario"
                  className="form-control form-control-lg"
                  type="text"
                  name="usuario"
                  value={persona.usuario}
                  onChange={handleChange}
                  required
                />
                <label className="form-label" htmlFor="campoUsuario">
                  Usuario
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  id="password"
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  value={persona.password}
                  onChange={handleChange}
                  required
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <a href="/RestrablecerContrasenia" className="text-decoration-none">
                  Olvide mi contraseña
                </a>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      {mostrarError && <ErrorAutenticacion respuesta={errorRespuesta} mostrar={mostrarError} onHidden={ocultarError} />}
    </section>
  );
};

export { LoginAutenticacion };
