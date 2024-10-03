import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import './ListaEmpresas.module.css';

const ListaEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const dialogRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/empresas');
        setEmpresas(response.data);
      } catch (error) {
        console.error('Error al obtener las empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  const openDialog = (empresa = null) => {
    if (empresa) {
      setSelectedEmpresa(empresa);
      setIsEditing(true);
    } else {
      setSelectedEmpresa({
        idEmpresa: null,
        nombre: '',
        direccion: '',
        nit: '',
        // Inicializa aquí más campos si es necesario
      });
      setIsEditing(false);
    }
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setSelectedEmpresa(null);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmpresa({
      ...selectedEmpresa,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8081/api/empresas/${selectedEmpresa.idEmpresa}`, selectedEmpresa);
        alert('Empresa actualizada con éxito');
      } else {
        await axios.post('http://localhost:8081/api/empresas', selectedEmpresa);
        alert('Empresa creada con éxito');
      }
      closeDialog();
      // Refrescar la lista de empresas
      const response = await axios.get('http://localhost:8081/api/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error al guardar la empresa:', error);
      alert('Error al guardar la empresa');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Empresas</h2>
      <button className="btn btn-primary mb-3" onClick={() => openDialog()}>Crear Nueva Empresa</button>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>NIT</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.idEmpresa}>
              <td>{empresa.idEmpresa}</td>
              <td>{empresa.nombre}</td>
              <td>{empresa.direccion}</td>
              <td>{empresa.nit}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => openDialog(empresa)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={dialogRef} className="p-3 border rounded">
        {selectedEmpresa && (
          <form onSubmit={handleSubmit} className="form-horizontal">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nombre:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={selectedEmpresa.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Dirección:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={selectedEmpresa.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">NIT:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="nit"
                  value={selectedEmpresa.nit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Otros campos */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                {isEditing ? 'Actualizar Empresa' : 'Crear Empresa'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={closeDialog}>
                Cerrar
              </button>
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
};

export default ListaEmpresas;

