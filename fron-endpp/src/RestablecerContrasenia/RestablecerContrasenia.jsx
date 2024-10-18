import React, { useState, useContext } from "react";
import axios from "axios";
import { resolvePath } from "react-router-dom";
import { AuthContext } from "../autenticacion/AuthContext";

const RestablecerContrasenia = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(
    "Paso 1: valide su usuario o correo primero"
  );
  const [error, setError] = useState("");
  const [desactivar, setDesactivar] = useState(false);
  const [verificar, setVerificar] = useState("verificar correo y usuario");
  const [respuestas, setRespuestas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [preguntas, setPreguntas] = useState([]); // Para almacenar preguntas e ids
  const { cambiarContrasenia } = useContext(AuthContext);

  const obtnerPreguntas = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const formValido = e.target.reportValidity();
    const objRepuesta = { username, email };

    if (formValido) {
      try {
        const responses = await axios.post(
          "http://127.0.0.1:8081/api/Usuario/obtienePreguntas",
          objRepuesta,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (responses.data && responses.data.length > 0) {
          // Guardar preguntas y ids en el estado
          setPreguntas(
            responses.data.map((response) => ({
              idRespuesta: response.idPregunta, // Ajusta según el nombre real del campo
              pregunta: response.pregunta,
            }))
          );
          setRespuestas(Array(responses.data.length).fill({ respuesta: "" }));
          setDesactivar(true); // Desactiva los inputs de usuario y correo
        } else {
          setError("No se encontró el usuario o correo. Pruebe de nuevo.");
        }
      } catch (error) {
        setError("Error al obtener las preguntas.");
      }
    }
  };

  const enviarRespuestas = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const formValido = e.target.reportValidity();
    const objRepuesta = {
      username,
      email,
      respuestas: respuestas.map((respuesta, index) => ({
        idRespuesta: preguntas[index].idRespuesta,
        respuesta: respuesta.respuesta,
      })),
    };

    if (formValido) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8081/api/Usuario/recuperarCuenta",
          objRepuesta,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.data.respuesta.respuesta === true) {
          setMessage(
            "Respuestas correctas. Proceda con el restablecimiento de contraseña."
          );

          cambiarContrasenia(response.data.token, response.data.role)
        } else {
          setError(response.data.respuesta.descripcion);
          setRespuestas(Array(preguntas.length).fill({ respuesta: "" }));
          setPreguntaActual(0);
        }
      } catch (error) {
        setError("Error de conexión con el servidor.");
      }
    }
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desactivar) {
      await obtnerPreguntas(e);
    } else {
      await enviarRespuestas(e);
    }
  };

  const handleRespuestaChange = (e) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = {
      ...nuevasRespuestas[preguntaActual],
      respuesta: e.target.value,
    };
    setRespuestas(nuevasRespuestas);
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    }
  };



  const progreso = ((preguntaActual + 1) / preguntas.length) * 100;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>Restablecer Contraseña</h3>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={desactivar}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Ingresa tu nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={desactivar}
                  />
                </div>

                {preguntas.length > 0 && (
                  <div className="mb-3">
                    <label htmlFor="securityQuestion" className="form-label">
                      Pregunta de seguridad:{" "}
                      {preguntas[preguntaActual].pregunta}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="securityQuestion"
                      placeholder="Ingresa la respuesta"
                      value={respuestas[preguntaActual].respuesta || ""}
                      onChange={handleRespuestaChange}
                      required
                      disabled={!desactivar}
                    />
                  </div>
                )}

                <div className="col-12 mt-3  d-flex justify-content-end">
                  <button
                    className={`btn ${
                      !desactivar ? "btn-secondary" : "btn-success"
                    }`}
                    onClick={siguientePregunta}
                    disabled={
                      preguntaActual === preguntas.length - 1 ||
                      preguntas.length === 0
                    }
                  >
                    Siguiente
                  </button>
                </div>

                {preguntas.length > 0 && (
                  <div className="progress mt-3">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progreso}%` }}
                      aria-valuenow={progreso}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {preguntaActual + 1} / {preguntas.length}
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  {verificar}
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <a href="/login" className="text-decoration-none">
              Volver al inicio de sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestablecerContrasenia;
