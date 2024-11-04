import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const SucursalList = () => {
  const [sucursales, setSucursales] = useState([]);
  const [empresas, setEmpresas] = useState([]); // Lista de empresas
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newSucursal, setNewSucursal] = useState({
    nombre: '',
    direccion: '',
    idEmpresa: '',
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: '',
  });

  const [editSucursal, setEditSucursal] = useState(null);

  useEffect(() => {
    fetchSucursales();
    fetchEmpresas();
  }, []);

  const fetchSucursales = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/sucursales');
      setSucursales(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sucursales:', error);
      setLoading(false);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error fetching empresas:', error);
    }
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (sucursal) => {
    setEditSucursal({
      ...sucursal,
      usuarioModificacion: localStorage.getItem('username'),
    });
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditSucursal(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSucursal({ ...newSucursal, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditSucursal({ ...editSucursal, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      const sucursalToSubmit = {
        ...newSucursal,
        fechaCreacion: currentDateTime,
      };
      await axios.post('http://localhost:8081/api/sucursales', sucursalToSubmit);
      setShowAddModal(false);
      fetchSucursales();
    } catch (error) {
      console.error('Error adding new sucursal:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    if (editSucursal && window.confirm('¿Está seguro de que desea actualizar esta sucursal?')) {
      try {
        const updatedSucursal = {
          ...editSucursal,
          fechaModificacion: new Date().toISOString(),
        };

        await axios.put(`http://localhost:8081/api/sucursales/${updatedSucursal.idSucursal}`, updatedSucursal);
        handleCloseEdit();
        fetchSucursales();
      } catch (error) {
        console.error('Error updating sucursal:', error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Sucursales</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleShowAdd}>Nueva Sucursal</Button>
        </Col>
      </Row>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Id</th>
              <th className="text-center">Nombre</th>
              <th className="text-center">Dirección</th>
              <th className="text-center">Empresa</th>
              <th className="text-center">Fecha Creación</th>
              <th className="text-center">Usuario Creación</th>
              <th className="text-center">Fecha Modificación</th>
              <th className="text-center">Usuario Modificación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">No se encontraron sucursales</td>
              </tr>
            ) : (
              sucursales.map((sucursal) => (
                <tr key={sucursal.idSucursal}>
                  <td className="text-center">{sucursal.idSucursal}</td>
                  <td>{sucursal.nombre}</td>
                  <td>{sucursal.direccion}</td>
                  <td>{empresas.find(e => e.idEmpresa === sucursal.idEmpresa)?.nombre || 'Desconocida'}</td>
                  <td className="text-center">{new Date(sucursal.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{sucursal.usuarioCreacion}</td>
                  <td className="text-center">{sucursal.fechaModificacion ? new Date(sucursal.fechaModificacion).toLocaleDateString() : ''}</td>
                  <td className="text-center">{sucursal.usuarioModificacion}</td>
                  <td className="text-center">
                    <Button variant="warning" size="sm" onClick={() => handleShowEdit(sucursal)}>Editar</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new sucursal */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Sucursal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newSucursal.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={newSucursal.direccion}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="idEmpresa">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                as="select"
                name="idEmpresa"
                value={newSucursal.idEmpresa}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione una empresa</option>
                {empresas.map((empresa) => (
                  <option key={empresa.idEmpresa} value={empresa.idEmpresa}>{empresa.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Sucursal</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing sucursal */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Sucursal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editSucursal && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editSucursal.nombre}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={editSucursal.direccion}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="idEmpresa">
                <Form.Label>Empresa</Form.Label>
                <Form.Control
                  as="select"
                  name="idEmpresa"
                  value={editSucursal.idEmpresa}
                  onChange={handleEditInputChange}
                  required
                >
                  <option value="">Seleccione una empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.idEmpresa} value={empresa.idEmpresa}>{empresa.nombre}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Guardar Cambios</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SucursalList;
