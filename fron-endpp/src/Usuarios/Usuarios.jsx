import React, { useContext, useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../autenticacion/AuthContext';

function Usuarios() {
  const { userRole } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
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
    fetch('http://localhost:8081/api/Usuario/All')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching data:', error));
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
  console.log(userRole == 1)
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
