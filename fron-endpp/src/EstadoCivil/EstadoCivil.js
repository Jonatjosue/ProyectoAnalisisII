import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const EstadoCivilList = () => {
  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEstadoCivil, setNewEstadoCivil] = useState({
    nombre: '',
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: '',
  });

  const [editEstadoCivil, setEditEstadoCivil] = useState(null);

  useEffect(() => {
    fetchEstadosCiviles();
  }, []);

  const fetchEstadosCiviles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/estado-civil');
      setEstadosCiviles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Estado Civil:', error);
      setLoading(false);
    }
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (estadoCivil) => {
    setEditEstadoCivil(estadoCivil);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditEstadoCivil(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEstadoCivil({ ...newEstadoCivil, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEstadoCivil({ ...editEstadoCivil, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      const estadoCivilToSubmit = {
        ...newEstadoCivil,
        fechaCreacion: currentDateTime,
      };
      await axios.post('http://localhost:8081/api/estado-civil', estadoCivilToSubmit);
      setShowAddModal(false);
      fetchEstadosCiviles();
    } catch (error) {
      console.error('Error adding new Estado Civil:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEstadoCivil = {
        ...editEstadoCivil,
        usuarioModificacion: localStorage.getItem('username'),
        fechaModificacion: new Date().toISOString(),
      };

      await axios.put(`http://localhost:8081/api/estado-civil/${updatedEstadoCivil.idEstadoCivil}`, updatedEstadoCivil);
      handleCloseEdit();
      fetchEstadosCiviles();
    } catch (error) {
      console.error('Error updating Estado Civil:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Estado Civil</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleShowAdd}>Nuevo Estado Civil</Button>
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
              <th className="text-center">Fecha Creación</th>
              <th className="text-center">Usuario Creación</th>
              <th className="text-center">Fecha Modificación</th>
              <th className="text-center">Usuario Modificación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estadosCiviles.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No se encontraron estados civiles</td>
              </tr>
            ) : (
              estadosCiviles.map((estadoCivil) => (
                <tr key={estadoCivil.idEstadoCivil}>
                  <td className="text-center">{estadoCivil.idEstadoCivil}</td>
                  <td>{estadoCivil.nombre}</td>
                  <td className="text-center">{new Date(estadoCivil.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{estadoCivil.usuarioCreacion}</td>
                  <td className="text-center">{estadoCivil.fechaModificacion ? new Date(estadoCivil.fechaModificacion).toLocaleDateString() : ''}</td>
                  <td className="text-center">{estadoCivil.usuarioModificacion}</td>
                  <td className="text-center">
                    <Button variant="warning" size="sm" className="mr-2" onClick={() => handleShowEdit(estadoCivil)}>Editar</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new estado civil */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Estado Civil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newEstadoCivil.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Estado Civil</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing estado civil */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estado Civil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editEstadoCivil && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editEstadoCivil.nombre}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Estado Civil</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EstadoCivilList;
