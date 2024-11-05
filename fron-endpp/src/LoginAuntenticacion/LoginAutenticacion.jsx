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
        onHidden();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mostrar, onHidden]);

  if (!visible) return null;

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

function ConfirmationMessage({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        width: "300px",
      }}
    >
      {message}
      <button type="button" className="btn-close" onClick={() => setVisible(false)} aria-label="Close"></button>
    </div>
  );
}

const LoginAutenticacion = () => {
  const [persona, setPersona] = useState({ usuario: "", password: "" });
  const [errorRespuesta, setErrorRespuesta] = useState("");
  const [mostrarError, setMostrarError] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // State for the selected role name
  const [roleIds, setRoleIds] = useState([]); // State for role names and ids
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const [confirmationMessage, setConfirmationMessage] = useState("");

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
         // const idRoles = response.data.roles.map(role => role.idRole);
         const selectedRoleId = roleIds.find(role => role.name === selectedRole)?.id;
          redirigir(response.data.token, selectedRoleId, persona.usuario);

          // Log the ID of the selected role
          console.log("Selected Role ID:", selectedRoleId);
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
    if (e.target.name === 'usuario') {
      setRoleIds([]);
      setSelectedRole('');
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleBuscarRoles = async () => {
    try {
      const username = persona.usuario;
      const rolesResponse = await axios.get(`http://127.0.0.1:8081/api/Usuario/getRole/${username}`, {
        headers: { "Content-Type": "application/json" }
      });

      const rolesDataResponse = await axios.get("http://127.0.0.1:8081/api/user-roles", {
        headers: { "Content-Type": "application/json" }
      });

      const roles = rolesResponse.data.map(role => {
        const roleData = rolesDataResponse.data.find(r => r.roleId === role.idRole);
        return { id: role.idRole, name: roleData ? roleData.roleName : "Unknown Role" };
      });

      setRoleIds(roles);
      setConfirmationMessage(`El usuario cuenta con ${roles.length} role(s).`);
    } catch (error) {
      setErrorRespuesta("Error al obtener roles");
      setMostrarError(true);
      console.error("Error:", error);
    }
  };

  const generateMD5Hash = (str) => {
    return CryptoJs.MD5(str).toString();
  };

  const redirigir = (token, idrole, username) => {
    login(token, idrole);
    console.log(idrole)
    localStorage.setItem('username', username);
    localStorage.setItem('role', 'Administrador');
  // localStorage.setItem('userRole', this.selectedRoleId);
    const startSession = new Date().toISOString();
    localStorage.setItem('startSession', startSession);
    navigate('/');
  };

  const ocultarError = () => {
    setMostrarError(false);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#f8f9fa' }}>
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
            <div className="card shadow-sm" style={{ borderRadius: '1rem', backgroundColor: '#ffffff' }}>
              <div className="card-body p-4">
                <h2 className="text-center">Iniciar Sesión</h2>

                <ConfirmationMessage message={confirmationMessage} />

                <form onSubmit={iniciarSesion} id="formUsuario">
                  <br />
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
                    <label className="form-label" htmlFor="campoUsuario" style={{ marginLeft: '16px' }}>
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
                    <label className="form-label" htmlFor="password" style={{ marginLeft: '16px'}}>
                      Password
                    </label>
                  </div>

                  <div className="d-flex mb-4 align-items-center">
                    <button 
                      type="button" 
                      className="btn btn-secondary me-2" 
                      style={{ width: '200px' }}
                      onClick={handleBuscarRoles}
                    >
                      Buscar Roles
                    </button>
                    <select 
                      className="form-select" 
                      value={selectedRole} 
                      onChange={handleRoleChange}
                    >
                      <option value="">Selecciona un Role</option>
                      {roleIds.map((role, index) => (
                        <option key={index} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg btn-block" 
                      disabled={selectedRole === ""}
                    >
                      Iniciar sesión
                    </button>
                  </div>

                  <div className="d-flex justify-content-around align-items-center mb-4">
                    <a href="/RestrablecerContrasenia">Olvidé mi contraseña</a>
                  </div>
                </form>
                <ErrorAutenticacion 
                  respuesta={errorRespuesta} 
                  mostrar={mostrarError} 
                  onHidden={ocultarError} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginAutenticacion;
 

/*
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
        onHidden();  // Reset state when the error is hidden
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
  const [selectedRole, setSelectedRole] = useState(""); // State for the selected role
  const [roleNames, setRoleNames] = useState([]); // State for role names
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
          const idRoles = response.data.roles.map(role => role.idRole); // Extract idRole
          redirigir(response.data.token, idRoles, persona.usuario);
  
          // Fetch role names from api/user-roles
          const rolesResponse = await axios.get("http://127.0.0.1:8081/api/user-roles", {
            headers: { "Content-Type": "application/json" }
          });
          
          // Map role names to idRoles
          const names = idRoles.map(idRole => {
            const role = rolesResponse.data.find(role => role.roleId === idRole);
            return role ? role.roleName : "Unknown Role";
          });

          setRoleNames(names); // Store the role names in the state
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

    // Reset role names when the username changes
    if (e.target.name === 'usuario') {
      setRoleNames([]); // Reset the array of role names
      setSelectedRole(''); // Optionally reset selected role as well
    }
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value); // Update the selected role
  };

  const [confirmationMessage, setConfirmationMessage] = useState(""); // State for confirmation message

  const handleBuscarRoles = async () => {
    try {
      const username = persona.usuario;

      // Fetch the roles associated with the user
      const rolesResponse = await axios.get(`http://127.0.0.1:8081/api/Usuario/getRole/${username}`, {
        headers: { "Content-Type": "application/json" }
      });

      // Extract idRole values
      const idRoles = rolesResponse.data.map(role => role.idRole);

      // Fetch role names from api/user-roles
      const rolesDataResponse = await axios.get("http://127.0.0.1:8081/api/user-roles", {
        headers: { "Content-Type": "application/json" }
      });

      // Map role names to idRoles
      const names = idRoles.map(idRole => {
        const role = rolesDataResponse.data.find(role => role.roleId === idRole);
        return role ? role.roleName : "Unknown Role";
      });

      setRoleNames(names); // Store role names in state
      // Show confirmation message
      setConfirmationMessage(`Se recuperaron ${names.length} roles.`);

    } catch (error) {
      setErrorRespuesta("Error al obtener roles");
      setMostrarError(true);
      console.error("Error:", error);
    }
  };

  const generateMD5Hash = (str) => {
    return CryptoJs.MD5(str).toString();
  };

  const redirigir = (token, idrole, username) => {
    login(token, idrole);
    localStorage.setItem('username', username); // Store username in localStorage
    localStorage.setItem('role', 'Administrador');
    const startSession = new Date().toISOString(); // Capture current date/time
    localStorage.setItem('startSession', startSession); // Store session start time in localStorage
    navigate('/');
  };

  const ocultarError = () => {
    setMostrarError(false);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#f8f9fa' }}>
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
            <div className="card shadow-sm" style={{ borderRadius: '1rem', backgroundColor: '#ffffff' }}>
              <div className="card-body p-4">
                <h2 className="text-center">Iniciar Sesión</h2>

                {confirmationMessage && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {confirmationMessage}
                    <button type="button" className="btn-close" onClick={() => setConfirmationMessage("")} aria-label="Close"></button>
                  </div>
                )}

                <form onSubmit={iniciarSesion} id="formUsuario">
                  <br />
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
                    <label 
                      className="form-label" 
                      htmlFor="campoUsuario"
                      style={{ marginLeft: '16px' }} // Add left margin
                    >
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
                    <label className="form-label" htmlFor="password" style={{ marginLeft: '16px'}}>
                      Password
                    </label>
                  </div>

                  
                  <div className="d-flex mb-4 align-items-center">
                    <button 
                      type="button" 
                      className="btn btn-secondary me-2" 
                      style={{ width: '200px' }} // Set to your desired width
                      onClick={handleBuscarRoles} // Capture username on click
                    >
                      Buscar Roles
                    </button>
                    <select 
                      className="form-select" 
                      value={selectedRole} 
                      onChange={handleRoleChange}
                    >
                      <option value="">Selecciona un Role</option>
                      {roleNames.map((roleName, index) => (
                        <option key={index} value={roleName}>{roleName}</option> // Display role names
                      ))}
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg btn-block" 
                    disabled={selectedRole === ""} // Disable the button if no role is selected
                  >
                    Sign in
                  </button>
                  <div className="d-flex justify-content-around align-items-center mb-4">
                    <a href="/RestrablecerContrasenia" className="text-decoration-none">
                      Olvidé mi contraseña
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mostrarError && <ErrorAutenticacion respuesta={errorRespuesta} mostrar={mostrarError} onHidden={ocultarError} />}
    </section>

  );
};

export { LoginAutenticacion };
*/