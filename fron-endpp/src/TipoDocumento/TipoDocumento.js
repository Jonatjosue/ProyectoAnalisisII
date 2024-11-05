import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const TipoDocumentoList = () => {
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTipoDocumento, setNewTipoDocumento] = useState({
    nombre: '',
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: '',
  });

  const [editTipoDocumento, setEditTipoDocumento] = useState(null);

  useEffect(() => {
    fetchTiposDocumentos();
  }, []);

  const fetchTiposDocumentos = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/tipodocumento');
      setTiposDocumentos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Tipo Documento:', error);
      setLoading(false);
    }
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (tipoDocumento) => {
    setEditTipoDocumento(tipoDocumento);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditTipoDocumento(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTipoDocumento({ ...newTipoDocumento, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTipoDocumento({ ...editTipoDocumento, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      const tipoDocumentoToSubmit = {
        ...newTipoDocumento,
        fechaCreacion: currentDateTime,
      };
      await axios.post('http://localhost:8081/api/tipodocumento', tipoDocumentoToSubmit);
      setShowAddModal(false);
      fetchTiposDocumentos();
    } catch (error) {
      console.error('Error adding new Tipo Documento:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('¿Está seguro de que desea actualizar este tipo de documento?')) {
      try {
        const updatedTipoDocumento = {
          ...editTipoDocumento,
          usuarioModificacion: localStorage.getItem('username'),
          fechaModificacion: new Date().toISOString(),
        };

        await axios.put(`http://localhost:8081/api/tipodocumento/${updatedTipoDocumento.idTipoDocumento}`, updatedTipoDocumento);
        handleCloseEdit();
        fetchTiposDocumentos();
      } catch (error) {
        console.error('Error updating Tipo Documento:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar este tipo de documento?')) {
      if (editTipoDocumento) {
        try {
          await axios.delete(`http://localhost:8081/api/tipodocumento/${editTipoDocumento.idTipoDocumento}`);
          handleCloseEdit();
          fetchTiposDocumentos();
        } catch (error) {
          console.error('Error deleting Tipo Documento:', error);
        }
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Tipo de Documento</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleShowAdd}>Nuevo Tipo de Documento</Button>
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
            {tiposDocumentos.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No se encontraron tipos de documento</td>
              </tr>
            ) : (
              tiposDocumentos.map((tipoDocumento) => (
                <tr key={tipoDocumento.idTipoDocumento}>
                  <td className="text-center">{tipoDocumento.idTipoDocumento}</td>
                  <td>{tipoDocumento.nombre}</td>
                  <td className="text-center">{new Date(tipoDocumento.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{tipoDocumento.usuarioCreacion}</td>
                  <td className="text-center">{tipoDocumento.fechaModificacion ? new Date(tipoDocumento.fechaModificacion).toLocaleDateString() : ''}</td>
                  <td className="text-center">{tipoDocumento.usuarioModificacion}</td>
                  <td className="text-center">
                    <Button variant="warning" size="sm" className="mr-2" onClick={() => handleShowEdit(tipoDocumento)}>Editar</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new tipo documento */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Tipo de Documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newTipoDocumento.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Tipo de Documento</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing tipo documento */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tipo de Documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTipoDocumento && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editTipoDocumento.nombre}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Tipo de Documento</Button>
              <Button variant="danger" onClick={handleDelete} className="mt-3 w-100">
                Eliminar Tipo de Documento
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TipoDocumentoList;
