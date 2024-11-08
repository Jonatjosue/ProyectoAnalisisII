import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";// Importa la instancia configurada
import CryptoJs from "crypto-js";
const CambiarContrasenia = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const generateMD5Hash = (str) => {
    return CryptoJs.MD5(str).toString();
  };

  useEffect(() => {
    setMessage("Al cambiar la contraseña debera de iniciar de nuevo sesion")
  },[]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Verificar que las contraseñas coinciden
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Realizar la solicitud para cambiar la contraseña
    try {
      var passwordHash = generateMD5Hash(password)
      const response = await axiosInstance.post(
        "/Usuario/setNewPassword",
        { nesPassword: passwordHash } // Ajusta los datos que envías según el backend
      );

      // Aquí manejas la respuesta del servidor
      if (response) {
        setMessage("La contraseña ha sido cambiada exitosamente.");
      } else {
        setError("Hubo un error al cambiar la contraseña.");
      }
    } catch (error) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>Cambiar Contraseña</h3>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirma tu nueva contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Cambiar contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CambiarContrasenia;
