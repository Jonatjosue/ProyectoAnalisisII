import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListaEmpresas.module.css';

const ListaEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
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
      setIsEditing(false);
    }
    setShowEditModal(true); // Open the modal
  };

  const handleCloseEdit = () => {
    setShowEditModal(false); // Close the modal
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

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date as MM/DD/YYYY or your local format
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add fechaCreacion and usuarioCreacion for new empresa
      if (!isEditing) {
        selectedEmpresa.fechaCreacion = new Date().toISOString(); // Current date-time
        selectedEmpresa.usuarioCreacion = localStorage.getItem('username'); // Get username from localStorage
      } else {
        selectedEmpresa.usuarioModificacion = localStorage.getItem('username'); // Get username for modification
      }

      if (isEditing) {
        await axios.put(`http://localhost:8081/api/empresas/${selectedEmpresa.idEmpresa}`, selectedEmpresa);
        alert('Empresa actualizada con éxito');
      } else {
        await axios.post('http://localhost:8081/api/empresas', selectedEmpresa);
        alert('Empresa creada con éxito');
      }
      handleCloseEdit();
      const response = await axios.get('http://localhost:8081/api/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error al guardar la empresa:', error);
      alert('Error al guardar la empresa');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '95%' }}>
      <h2 className="mb-4 text-center">Lista de Empresas</h2>
      <button className="btn btn-primary mb-3" onClick={() => openDialog()}>
        Crear Nueva Empresa
      </button>
      <div className="table-responsive mx-auto">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="text-center align-middle">ID</th>
              <th className="text-center align-middle">Nombre</th>
              <th className="text-center align-middle">Dirección</th>
              <th className="text-center align-middle">NIT</th>
              <th className="text-center align-middle">Password Cantidad Mayúsculas</th>
              <th className="text-center align-middle">Password Cantidad Minúsculas</th>
              <th className="text-center align-middle">Password Cantidad Caracteres Especiales</th>
              <th className="text-center align-middle">Password Caducidad Días</th>
              <th className="text-center align-middle">Password Largo</th>
              <th className="text-center align-middle">Password Intentos Antes de Bloquear</th>
              <th className="text-center align-middle">Password Cantidad Números</th>
              <th className="text-center align-middle">Password Cantidad Preguntas a Validar</th>
              <th className="text-center align-middle">Fecha Creación</th>
              <th className="text-center align-middle">Usuario Creación</th>
              <th className="text-center align-middle">Fecha Modificación</th>
              <th className="text-center align-middle">Usuario Modificación</th>
              <th className="text-center align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.idEmpresa}>
                <td className="text-center align-middle">{empresa.idEmpresa}</td>
                <td className="text-center align-middle">{empresa.nombre}</td>
                <td className="text-center align-middle">{empresa.direccion}</td>
                <td className="text-center align-middle">{empresa.nit}</td>
                <td className="text-center align-middle">{empresa.passwordCantidadMayusculas}</td>
                <td className="text-center align-middle">{empresa.passwordCantidadMinusculas}</td>
                <td className="text-center align-middle">{empresa.passwordCantidadCaracteresEspeciales}</td>
                <td className="text-center align-middle">{empresa.passwordCantidadCaducidadDias}</td>
                <td className="text-center align-middle">{empresa.passwordLargo}</td>
                <td className="text-center align-middle">{empresa.passwordIntentosAntesDeBloquear}</td>
                <td className="text-center align-middle">{empresa.passwordCantidadNumeros}</td>
                <td className="text-center align-middle">{empresa.passwordCantidadPreguntasValidar}</td>
                <td className="text-center align-middle">{formatDateForDisplay(empresa.fechaCreacion)}</td>
                <td className="text-center align-middle">{empresa.usuarioCreacion}</td>
                <td className="text-center align-middle">{formatDateForDisplay(empresa.fechaModificacion)}</td>
                <td className="text-center align-middle">{empresa.usuarioModificacion}</td>
                <td className="text-center align-middle">
                  <button className="btn btn-warning btn-sm" onClick={() => openDialog(empresa)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Actualizar Empresa' : 'Crear Empresa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmpresa && (
            <Form onSubmit={handleSubmit}>
              {Object.keys(selectedEmpresa).map((key, index) => (
                // Only show fields that are not excluded
                !['idEmpresa', 'fechaCreacion', 'usuarioCreacion', 'fechaModificacion', 'usuarioModificacion'].includes(key) && (
                  <Form.Group controlId={key} className="mb-3" key={index}>
                    <Form.Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</Form.Label> {/* Humanize label */}
                    <Form.Control
                      type="text"
                      name={key}
                      value={selectedEmpresa[key] || ''}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                )
              ))}
              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  {isEditing ? 'Actualizar Empresa' : 'Crear Empresa'}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListaEmpresas;
