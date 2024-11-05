import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ModuloList = () => {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newModulo, setNewModulo] = useState({
    nombre: '',
    ordenMenu: '',
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: '',
  });

  const [editModulo, setEditModulo] = useState(null);

  useEffect(() => {
    fetchModulos();
  }, []);
  const role = localStorage.getItem('userRole');
  const usuario = localStorage.getItem('username');


  const fetchModulos = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/modulos`);
      setModulos(response.data);
      setLoading(false);
      setNewModulo((prev) => ({ ...prev, ordenMenu: response.data.length + 1 }));
    } catch (error) {
      console.error('Error fetching Modulos:', error);
      setLoading(false);
    }
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (modulo) => {
    setEditModulo(modulo);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditModulo(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModulo({ ...newModulo, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditModulo({ ...editModulo, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      const moduloToSubmit = {
        ...newModulo,
        fechaCreacion: currentDateTime,
      };
      await axios.post('http://localhost:8081/api/modulos', moduloToSubmit);
      setShowAddModal(false);
      fetchModulos();
    } catch (error) {
      console.error('Error adding new Modulo:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedModulo = {
        ...editModulo,
        usuarioModificacion: localStorage.getItem('username'), // Set usuarioModificacion
      };

      const originalOrdenMenu = editModulo.ordenMenu;
      const newOrdenMenu = parseInt(updatedModulo.ordenMenu);

      if (originalOrdenMenu !== newOrdenMenu) {
        const updatedModulos = modulos.map((modulo) => {
          if (modulo.idModulo !== updatedModulo.idModulo) {
            if (modulo.ordenMenu >= newOrdenMenu && modulo.ordenMenu < originalOrdenMenu) {
              return { ...modulo, ordenMenu: modulo.ordenMenu + 1 };
            }
            if (modulo.ordenMenu <= newOrdenMenu && modulo.ordenMenu > originalOrdenMenu) {
              return { ...modulo, ordenMenu: modulo.ordenMenu - 1 };
            }
          }
          return modulo;
        });

        await Promise.all(updatedModulos.map(modulo => 
          axios.put(`http://localhost:8081/api/modulos/${modulo.idModulo}`, modulo)
        ));
      }

      await axios.put(`http://localhost:8081/api/modulos/${updatedModulo.idModulo}`, updatedModulo);
      handleCloseEdit();
      fetchModulos();
    } catch (error) {
      console.error('Error updating Modulo:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Módulos</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleShowAdd}>Nuevo Modulo</Button>
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
              <th className="text-center">Orden Menú</th>
              <th className="text-center">Fecha Creación</th>
              <th className="text-center">Usuario Creación</th>
              <th className="text-center">Fecha Modificación</th>
              <th className="text-center">Usuario Modificación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {modulos.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No Modulos found</td>
              </tr>
            ) : (
              modulos.map((modulo) => (
                <tr key={modulo.idModulo}>
                  <td className="text-center">{modulo.idModulo}</td>
                  <td >{modulo.nombre}</td>
                  <td className="text-center">{modulo.ordenMenu}</td>
                  <td className="text-center">{new Date(modulo.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{modulo.usuarioCreacion}</td>
                  <td className="text-center">{new Date(modulo.fechaModificacion).toLocaleDateString()}</td>
                  <td className="text-center">{modulo.usuarioModificacion}</td>
                  <td className="text-center">
                    <Button variant="warning" size="sm" className="mr-2" onClick={() => handleShowEdit(modulo)}>Editar</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new modulo */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Modulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newModulo.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="ordenMenu" className="mt-3">
              <Form.Label>Orden Menu</Form.Label>
              <Form.Control
                type="number"
                name="ordenMenu"
                value={newModulo.ordenMenu}
                readOnly
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Modulo</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing modulo */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Modulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editModulo && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editModulo.nombre}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="ordenMenu" className="mt-3">
                <Form.Label>Orden Menu</Form.Label>
                <Form.Control
                  as="select"
                  name="ordenMenu"
                  value={editModulo.ordenMenu}
                  onChange={handleEditInputChange}
                >
                  {[...Array(modulos.length)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Módulo</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ModuloList;
