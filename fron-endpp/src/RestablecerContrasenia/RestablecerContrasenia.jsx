import React, { useState } from "react";

const RestablecerContrasenia = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");



 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const formValido = e.target.reportValidity();
    const objRepuesta = { username: username, email: email, respuesta: securityAnswer };

  /*  if (formValido) {
    try {
        const response = await axios.post("http://127.0.0.1:8081/api/Usuario/recuperarCuenta", objRepuesta, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.data.respuesta.respuesta === true) {
          redirigir(response.data.token, response.data.role);
        } else {
          setErrorRespuesta(response.data.respuesta.descripcion);
          setMostrarError(true);
        }
      } catch (error) {
        setErrorRespuesta("Error de conexión con el servidor");
        setMostrarError(true);
        console.error("Error:", error);
      }


    // Validar correo electrónico y nombre de usuario
    if (!isValidEmail || !isValidUsername) {
      setError("El correo electrónico o nombre de usuario no coinciden.");
      return;
    }

    // Validar respuesta de la pregunta de seguridad
    if (!isCorrectAnswer) {
      setError("La respuesta a la pregunta de seguridad es incorrecta.");
      return;
    }

    // Si todo es correcto
    setMessage("Acceso permitido. Puedes restablecer tu contraseña.");

    }*/
  };

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
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="securityQuestion" className="form-label">
                    Pregunta de seguridad: ¿Cuál es el nombre de tu primera mascota?
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="securityQuestion"
                    placeholder="Ingresa la respuesta"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Verificar y Restablecer Contraseña
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
