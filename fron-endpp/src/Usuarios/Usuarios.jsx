import React, { useContext, useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../autenticacion/AuthContext';
import axios from 'axios';

function Usuarios() {
  const { userRole, loggedInUser } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    idUsuario: null,
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    password: '',
    ultimaFechaIngreso: '',
    intentosDeAcceso: 0,
    ultimaFechaCambioPassword: '',
    correoElectronico: '',
    fotografia: null,
    telefonoMovil: '',
    idGenero: 2,
    idSucursal: '',
    idStatusUsuario: '',
    fechaCreacion: '',
    fechaModificacion: '',
    usuarioCreacion: '',
    usuarioModificacion: '',
    roles: [],
    statusUsuario: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const dialogRef = useRef(null);

  // State for requirements and regex
  const [requirements, setRequirements] = useState('');
  const [passwordRegex, setPasswordRegex] = useState(null); // Store the regex pattern for validation
  const [passwordValid, setPasswordValid] = useState(true); // To check if the password is valid

  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRoleCount, setSelectedRoleCount] = useState(0);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    // Fetch users
    fetch('http://localhost:8081/api/Usuario/All')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching data:', error));

    // Fetch available roles
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8081/api/Role/All');
        setAvailableRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Fetch requirements based on Sucursal ID
  const handleSucursalChange = async (event) => {
    const idSucursal = event.target.value;
    setFormData({ ...formData, idSucursal: idSucursal });

    if (idSucursal) {
      try {
        const response = await axios.get(`http://localhost:8081/api/Requisitos/${idSucursal}`);
        if (response.status === 200) {
          const {
            passwordCantidadMayusculas,
            passwordCantidadMinusculas,
            passwordCantidadCaracteresEspeciales,
            passwordLargo,
            passwordCantidadNumeros,
          } = response.data;

          // Create regex based on the requirements
          let regexParts = [];

          if (passwordCantidadMayusculas > 0) {
            regexParts.push(`(?=(.*[A-Z]){${passwordCantidadMayusculas},})`);
          }
          if (passwordCantidadMinusculas > 0) {
            regexParts.push(`(?=(.*[a-z]){${passwordCantidadMinusculas},})`);
          }
          if (passwordCantidadNumeros > 0) {
            regexParts.push(`(?=(.*\\d){${passwordCantidadNumeros},})`);
          }
          if (passwordCantidadCaracteresEspeciales > 0) {
            regexParts.push(`(?=(.*[!@#$%^&*()_+\\-={}:;"'<>?,./]){${passwordCantidadCaracteresEspeciales},})`);
          }

          // Ensure the length of the password
          regexParts.push(`.{${passwordLargo},}`);

          // Join all parts into a single regex pattern
          const regex = new RegExp(regexParts.join(''));

          // Store the regex and update requirements for display
          setPasswordRegex(regex);
          setRequirements(`${regex.toString()}`);
        } else {
          setRequirements('No requirements found for this Sucursal.');
          setPasswordRegex(null); // Reset regex if no requirements found
        }
      } catch (error) {
        console.error('Error fetching requirements:', error);
        setRequirements('Error fetching requirements.');
        setPasswordRegex(null); // Reset regex on error
      }
    } else {
      setRequirements('');
      setPasswordRegex(null); // Reset regex if no Sucursal is selected
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

  // If the password field changes, validate it against the regex
  if (name === 'password' && passwordRegex) {
    setPasswordValid(passwordRegex.test(value)); // Validate password
  }

  // Update the form data, handling file inputs if necessary
  setFormData({
    ...formData,
    [name]: type === 'file' ? files[0] : value,
  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent form submission if password is invalid
    if (!passwordValid) {
      alert('Password does not meet the requirements.');
      return;
    } else {
      // Automatically capture today's date and the logged-in user before submitting
    const today = new Date().toISOString();  // Format date in ISO
    const creator = localStorage.getItem('username');  // Retrieve username from localStorage

    try {
      const requestOptions = {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          fechaCreacion: isEditing ? formData.fechaCreacion : today, // Only set if creating
          usuarioCreacion: isEditing ? formData.usuarioCreacion : creator, // Only set if creating
          fechaModificacion: isEditing ? formData.fechaModificacion : today, // Only set if creating
          usuarioModificacion: isEditing ? formData.usuarioModificacion : creator, // Only set if creating
          requiereCambiarPassword: 1,
          statusUsuario: 1,
          roles: selectedRoles,  // Include selected roles
        }),
      };
      console.log(formData);
      const url = isEditing
        ? `http://localhost:8081/api/Usuario/${formData.idUsuario}`
        : 'http://localhost:8081/api/Usuario';
      await fetch(url, requestOptions);
      alert(`Usuario ${isEditing ? 'actualizado' : 'creado'} con éxito`);
      closeDialog();
      const response = await fetch('http://localhost:8081/api/Usuario/All');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      alert('Error al guardar el usuario');
    }
    }
  };

  const openDialog = (usuario = null) => {
    if (usuario) {
      // If a usuario is provided, populate the form data and set editing state
      setFormData({ ...usuario, roles: usuario.roles || [] });
      setSelectedRoles(usuario.roles || []);
      setIsEditing(true);
    } else {
      // If no usuario is provided, reset the form data for a new user
      setFormData({
        idUsuario: null,
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        password: '',
        ultimaFechaIngreso: '',
        intentosDeAcceso: 0,
        ultimaFechaCambioPassword: '',
        correoElectronico: '',
        fotografia: null,
        telefonoMovil: '',
        idGenero: 2, // Default value
        idSucursal: '',
        idStatusUsuario: '',
        fechaCreacion: '',
        fechaModificacion: '',
        usuarioCreacion: '', // Will be set in handleSubmit
        usuarioModificacion: '',
        roles: [],
        statusUsuario: '',
      });
      setSelectedRoles([]); // Reset selected roles for a new user
      setIsEditing(false);
    }
    
    // Show the dialog
    dialogRef.current.showModal();
  };
  

  const closeDialog = () => {
    dialogRef.current.close();
    setFormData({
      idUsuario: null,
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      password: '',
      ultimaFechaIngreso: '',
      intentosDeAcceso: 0,
      ultimaFechaCambioPassword: '',
      correoElectronico: '',
      fotografia: null,
      telefonoMovil: '',
      idGenero: '',
      idSucursal: '',
      idStatusUsuario: '',
      fechaCreacion: '',
      fechaModificacion: '',
      usuarioCreacion: '', // Will be set in handleSubmit
      usuarioModificacion: '',
      roles: [],
      statusUsuario: '',
    });
    setSelectedRoles([]);
    setIsEditing(false);
  };

  // Handle the number of roles user wants to select
  const handleRoleCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setSelectedRoleCount(count);
    setSelectedRoles(Array(count).fill("")); // Reset selected roles
  };

  // Handle role selection for a specific dropdown
  const handleRoleSelection = (index, event) => {
    const newSelectedRoles = [...selectedRoles];
    newSelectedRoles[index] = event.target.value;
    setSelectedRoles(newSelectedRoles);
  };

  // Filter out roles that have already been selected
  const getFilteredRoles = (index) => {
    return availableRoles.filter(
      (role) =>
        !selectedRoles.includes(role.idRole.toString()) ||
        selectedRoles[index] === role.idRole.toString()
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Usuarios</h1>
      {userRole === 1 && (
        <button className="btn btn-primary mb-3" onClick={() => openDialog()}>
          Crear Nuevo Usuario
        </button>
      )}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Correo Electrónico</th>
            <th>Teléfono Móvil</th>
            <th>Última Fecha de Ingreso</th>
            <th>Última Fecha de Cambio de Password</th>
            <th>Intentos de Acceso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.idUsuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{new Date(usuario.fechaNacimiento).toLocaleDateString()}</td>
              <td>{usuario.correoElectronico}</td>
              <td>{usuario.telefonoMovil}</td>
              <td>{new Date(usuario.ultimaFechaIngreso).toLocaleDateString()}</td>
              <td>{new Date(usuario.ultimaFechaCambioPassword).toLocaleDateString()}</td>
              <td>{usuario.intentosDeAcceso}</td>
              <td>
                {userRole === 1 && (
                  <button
                    className="btn btn-warning"
                    onClick={() => openDialog(usuario)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              className="form-control"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              className="form-control"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono Móvil:</label>
            <input
              type="text"
              className="form-control"
              name="telefonoMovil"
              value={formData.telefonoMovil}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fotografía:</label>
            <input
              type="file"
              className="form-control"
              name="fotografia"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Sucursal:</label>
            <input
              type="number"
              className="form-control"
              name="idSucursal"
              value={formData.idSucursal}
              onChange={handleSucursalChange} // Call the new handler
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ borderColor: passwordValid ? 'initial' : 'red' }} // Highlight invalid password
            />
            {/* Display the requirements if the password is invalid */}
            {!passwordValid && (
              <small style={{ color: 'red' }}>
                La contraseña debe cumplir con los siguientes requisitos: {requirements}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Género:</label>
            <input
              type="number"
              className="form-control"
              name="idGenero"
              value={formData.idGenero}
              onChange={handleChange}
            />
          </div>
  
          {/* Role selection code */}
          <div className="form-group">
            <label>How many roles would you like to assign?</label>
            <select
              className="form-control"
              value={selectedRoleCount}
              onChange={handleRoleCountChange}
            >
              <option value="">--Select number of roles--</option>
              {Array.from({ length: availableRoles.length }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
  
          {Array.from({ length: selectedRoleCount }).map((_, index) => (
            <div className="form-group" key={index}>
              <label>Role {index + 1}:</label>
              <select
                className="form-control"
                value={selectedRoles[index] || ''}
                onChange={(event) => handleRoleSelection(index, event)}
              >
                <option value="">--Select a role--</option>
                {getFilteredRoles(index).map((role) => (
                  <option key={role.idRole} value={role.idRole}>
                    {role.nombre}
                  </option>
                ))}
              </select>
            </div>
          ))}
  
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeDialog}
            >
              Cerrar
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default Usuarios;



/*
import React, { useContext, useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../autenticacion/AuthContext';

function Usuarios() {
  const { userRole } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState({});

 
  const [formData, setFormData] = useState({
    idUsuario: null,
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    password: '',
    ultimaFechaIngreso: '',
    intentosDeAcceso: 0,
    // estadoActual: '', // Uncomment if using
    ultimaFechaCambioPassword: '',
    correoElectronico: '',
    fotografia: null,  // For file upload
    telefonoMovil: '',
    idGenero: '',
    idSucursal: '',
    idStatusUsuario: '',
    fechaCreacion: '',
    fechaModificacion: '',
    usuarioCreacion: '',
    usuarioModificacion: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    /*fetch('http://localhost:8081/api/Usuario/All')
      .then(response => response.json())
      .then(data => setUsuarios(data),)
      .catch(error => console.error('Error fetching data:', error));
      
      
      fetch('http://localhost:8081/api/Usuario/All', {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsuarios(data); 
          perfiles(data);
          
        })
        .catch((error) => {
          console.error("Error al obtener los usuarios: ", error);
        });

  perfiles(usuarios);
  }, []);
 
  const openDialog = (usuario = null) => {
    if (usuario) {
      setFormData(usuario);
      setIsEditing(true);
    } else {
      setFormData({
        idUsuario: null,
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        password: '',
        ultimaFechaIngreso: '',
        intentosDeAcceso: 0,
        // estadoActual: '', // Uncomment if using
        ultimaFechaCambioPassword: '',
        correoElectronico: '',
        fotografia: null,
        telefonoMovil: '',
        idGenero: '',
        idSucursal: '',
        idStatusUsuario: '',
        fechaCreacion: '',
        fechaModificacion: '',
        usuarioCreacion: '',
        usuarioModificacion: '',
      });
      setIsEditing(false);
    }
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setFormData({
      idUsuario: null,
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      password: '',
      ultimaFechaIngreso: '',
      intentosDeAcceso: 0,
      // estadoActual: '', // Uncomment if using
      ultimaFechaCambioPassword: '',
      correoElectronico: '',
      fotografia: null,
      telefonoMovil: '',
      idGenero: '',
      idSucursal: '',
      idStatusUsuario: '',
      fechaCreacion: '',
      fechaModificacion: '',
      usuarioCreacion: '',
      usuarioModificacion: '',
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,  // Handle file input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      const url = isEditing
        ? `http://localhost:8081/api/Usuario/${formData.idUsuario}`
        : 'http://localhost:8081/api/Usuario';
      await fetch(url, requestOptions);
      alert(`Usuario ${isEditing ? 'actualizado' : 'creado'} con éxito`);
      closeDialog();
      const response = await fetch('http://localhost:8081/api/Usuario/All');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      alert('Error al guardar el usuario');
    }
  };

  const perfiles = (usuarios) => {
    let rolesTemp = {};
    usuarios.forEach((element) => {
      let IDUsuario = element.idUsuario;
      fetch('http://localhost:8081/api/usuario-role/usuario/' + IDUsuario, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          rolesTemp[IDUsuario] = data[0]?.role?.nombre || 'Sin Rol';
          // Actualizamos los roles en el estado
          setRoles((prevRoles) => ({ ...prevRoles, [IDUsuario]: rolesTemp[IDUsuario] }));
        })
        .catch((error) => {
          console.error('Error al obtener los roles: ', error);
        });
    });
  };
  
  return (
    
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Usuarios</h1>
      {userRole == 1 && (<button className="btn btn-primary mb-3" onClick={() => openDialog()}>Crear Nuevo Usuario</button>)}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Correo Electrónico</th>
            <th>Teléfono Móvil</th>
            <th>Última Fecha de Ingreso</th>
            <th>Última Fecha de Cambio de Password</th>
            <th>Intentos de Acceso</th>
            <th>Roles asignados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            
            <tr key={usuario.idUsuario}>
              
              <td>{usuario.idUsuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{new Date(usuario.fechaNacimiento).toLocaleDateString()}</td>
              <td>{usuario.correoElectronico}</td>
              <td>{usuario.telefonoMovil}</td>
              <td>{new Date(usuario.ultimaFechaIngreso).toLocaleDateString()}</td>
              <td>{new Date(usuario.ultimaFechaCambioPassword).toLocaleDateString()}</td>
              <td>{usuario.intentosDeAcceso}</td>
              <td>{roles[usuario.idUsuario] || 'Sin Rol'}</td>
              <td>
                {userRole ==1 && (
                  <button className="btn btn-warning" onClick={() => openDialog(usuario)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input type="text" className="form-control" name="apellido" value={formData.apellido} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento:</label>
            <input type="date" className="form-control" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input type="email" className="form-control" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Teléfono Móvil:</label>
            <input type="text" className="form-control" name="telefonoMovil" value={formData.telefonoMovil} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Fotografía:</label>
            <input type="file" className="form-control" name="fotografia" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Género:</label>
            <input type="number" className="form-control" name="idGenero" value={formData.idGenero} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Sucursal:</label>
            <input type="number" className="form-control" name="idSucursal" value={formData.idSucursal} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Status Usuario:</label>
            <input type="number" className="form-control" name="idStatusUsuario" value={formData.idStatusUsuario} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Fecha Creación:</label>
            <input type="date" className="form-control" name="fechaCreacion" value={formData.fechaCreacion} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Fecha Modificación:</label>
            <input type="date" className="form-control" name="fechaModificacion" value={formData.fechaModificacion} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Usuario Creación:</label>
            <input type="text" className="form-control" name="usuarioCreacion" value={formData.usuarioCreacion} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Usuario Modificación:</label>
            <input type="text" className="form-control" name="usuarioModificacion" value={formData.usuarioModificacion} onChange={handleChange} />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">{isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
            <button type="button" className="btn btn-secondary" onClick={closeDialog}>Cerrar</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default Usuarios;
*/