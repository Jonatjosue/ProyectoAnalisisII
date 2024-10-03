import React, { useState } from 'react';
import axios from 'axios';
import './FormularioUsuario.module.css';

const FormularioEmpresa = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    nit: '',
    passwordCantidadMayusculas: '',
    passwordCantidadMinusculas: '',
    passwordCantidadCaracteresEspeciales: '',
    passwordCantidadCaducidadDias: '',
    passwordLargo: '',
    passwordIntentosAntesDeBloquear: '',
    passwordCantidadNumeros: '',
    passwordCantidadPreguntasValidar: '',
    fechaCreacion: '',
    usuarioCreacion: '',
    fechaModificacion: '',
    usuarioModificacion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/empresas', formData);
      console.log(response.data);
      alert('Empresa creada con éxito');
    } catch (error) {
      console.error('Error al crear la empresa:', error);
      alert('Error al crear la empresa');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Empresa</h2>
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <td><label>Nombre:</label></td>
              <td><input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Dirección:</label></td>
              <td><input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>NIT:</label></td>
              <td><input type="text" name="nit" value={formData.nit} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password Cantidad Mayúsculas:</label></td>
              <td><input type="number" name="passwordCantidadMayusculas" value={formData.passwordCantidadMayusculas} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password Cantidad Minúsculas:</label></td>
              <td><input type="number" name="passwordCantidadMinusculas" value={formData.passwordCantidadMinusculas} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password Cantidad Caracteres Especiales:</label></td>
              <td><input type="number" name="passwordCantidadCaracteresEspeciales" value={formData.passwordCantidadCaracteresEspeciales} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password Cantidad Caducidad Días:</label></td>
              <td><input type="number" name="passwordCantidadCaducidadDias" value={formData.passwordCantidadCaducidadDias} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password Largo:</label></td>
              <td><input type="number" name="passwordLargo" value={formData.passwordLargo} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password Intentos Antes de Bloquear:</label></td>
              <td><input type="number" name="passwordIntentosAntesDeBloquear" value={formData.passwordIntentosAntesDeBloquear} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password Cantidad Números:</label></td>
              <td><input type="number" name="passwordCantidadNumeros" value={formData.passwordCantidadNumeros} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Password Cantidad Preguntas Validar:</label></td>
              <td><input type="number" name="passwordCantidadPreguntasValidar" value={formData.passwordCantidadPreguntasValidar} onChange={handleChange} required /></td>
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
        <button type="submit">Crear Empresa</button>
      </form>
    </div>
  );
};

export default FormularioEmpresa;
