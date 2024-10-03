import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ActualizarEmpresa.module.css';

const ActualizarEmpresa = () => {
  const [empresaId, setEmpresaId] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    nit: '',
    // otros campos...
  });

  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

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
      await axios.put(`http://localhost:8081/api/empresas/${empresaId}`, formData);
      alert('Empresa actualizada con éxito');
      closeDialog();
    } catch (error) {
      console.error('Error al actualizar la empresa:', error);
      alert('Error al actualizar la empresa');
    }
  };

  const handleFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/empresas/${empresaId}`);
      setFormData(response.data);
      openDialog();
    } catch (error) {
      console.error('Error al obtener la empresa:', error);
      alert('Error al obtener la empresa');
    }
  };

  return (
    <div className="actualizar-empresa">
      <h2>Actualizar Empresa</h2>
      <input
        type="text"
        placeholder="ID de la Empresa"
        value={empresaId}
        onChange={(e) => setEmpresaId(e.target.value)}
      />
      <button onClick={handleFetch}>Buscar Empresa</button>

      <dialog ref={dialogRef}>
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
              {/* Otros campos */}
            </tbody>
          </table>
          <div>
            <button type="submit">Actualizar Empresa</button>
            <button type="button" onClick={closeDialog}>Cerrar</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ActualizarEmpresa;
