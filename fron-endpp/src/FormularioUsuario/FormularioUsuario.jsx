import React, { useState } from 'react';
import axios from 'axios';
import './FormularioUsuario.module.css';

const FormularioUsuario = () => {
  const [formData, setFormData] = useState({
    idUsuario: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    password: '',
    ultimaFechaIngreso: '',
    intentosDeAcceso: '',
    ultimaFechaCambioPassword: '',
    correoElectronico: '',
    fotografia: '',
    telefonoMovil: '',
    idGenero: '',
    idSucursal: '',
    idStatusUsuario: '',
    fechaCreacion: '',
    fechaModificacion: '',
    usuarioCreacion: '',
    usuarioModificacion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await axios.post('http://localhost:8081/api/usuarios', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Usuario creado con éxito');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Error al crear el usuario');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <td><label>Nombre:</label></td>
              <td><input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Apellido:</label></td>
              <td><input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Fecha de Nacimiento:</label></td>
              <td><input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password:</label></td>
              <td><input type="password" name="password" value={formData.password} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Última Fecha de Ingreso:</label></td>
              <td><input type="datetime-local" name="ultimaFechaIngreso" value={formData.ultimaFechaIngreso} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Intentos de Acceso:</label></td>
              <td><input type="number" name="intentosDeAcceso" value={formData.intentosDeAcceso} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Última Fecha de Cambio de Password:</label></td>
              <td><input type="datetime-local" name="ultimaFechaCambioPassword" value={formData.ultimaFechaCambioPassword} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Correo Electrónico:</label></td>
              <td><input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Fotografía:</label></td>
              <td><input type="file" name="fotografia" onChange={handleFileChange} required /></td>
            </tr>
            <tr>
              <td><label>Teléfono Móvil:</label></td>
              <td><input type="text" name="telefonoMovil" value={formData.telefonoMovil} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Género (ID):</label></td>
              <td><input type="number" name="idGenero" value={formData.idGenero} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Sucursal (ID):</label></td>
              <td><input type="number" name="idSucursal" value={formData.idSucursal} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Status Usuario (ID):</label></td>
              <td><input type="number" name="idStatusUsuario" value={formData.idStatusUsuario} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Fecha de Creación:</label></td>
              <td><input type="datetime-local" name="fechaCreacion" value={formData.fechaCreacion} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Usuario de Creación:</label></td>
              <td><input type="text" name="usuarioCreacion" value={formData.usuarioCreacion} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Fecha de Modificación:</label></td>
              <td><input type="datetime-local" name="fechaModificacion" value={formData.fechaModificacion} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Usuario de Modificación:</label></td>
              <td><input type="text" name="usuarioModificacion" value={formData.usuarioModificacion} onChange={handleChange} required /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default FormularioUsuario;
