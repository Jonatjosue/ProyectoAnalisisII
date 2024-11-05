import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ModuloList = () => {
  const [menus, setMenus] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newModulo, setNewMenu] = useState({
    nombre: '',
    idModulo: '', // Added idModulo to newModulo state
    ordenMenu: '', // Allow user input for ordenMenu
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: '',
  });

  const [editModulo, setEditModulo] = useState(null);

  useEffect(() => {
    
    fetchMenus();
    fetchModulos(); // Fetch modulos here
  }, []);
  
  const role = localStorage.getItem('userRole');
const usuario = localStorage.getItem('username');

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/menu`);
      setMenus(response.data);
      setLoading(false);
      setNewMenu((prev) => ({ ...prev, ordenMenu: response.data.length + 1 }));
    } catch (error) {
      console.error('Error fetching Menus:', error);
      setLoading(false);
    }
  };

  const fetchModulos = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/modulos`);
      setModulos(response.data); // Store the fetched modulos
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Modulos:', error);
      setLoading(false);
    }
  };

  // Function to get the name of the module by ID
  const getModuloNameById = (id) => {
    const modulo = modulos.find(m => m.idModulo === id);
    return modulo ? modulo.nombre : 'Unknown'; // Return 'Unknown' if not found
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
    setNewMenu({ ...newModulo, [name]: value });
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
      await axios.post('http://localhost:8081/api/menu', moduloToSubmit);
      setShowAddModal(false);
      fetchMenus();
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
        const updatedModulos = menus.map((modulo) => {
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
          axios.put(`http://localhost:8081/api/menu/${modulo.idMenu}`, modulo)
        ));
      }

      await axios.put(`http://localhost:8081/api/menu/${updatedModulo.idMenu}`, updatedModulo);
      handleCloseEdit();
      fetchMenus();
    } catch (error) {
      console.error('Error updating Modulo:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Menú</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleShowAdd}>Nuevo Menú</Button>
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
              <th className="text-center">Módulo</th>
              <th className="text-center">Orden Menú</th>
              <th className="text-center">Fecha Creación</th>
              <th className="text-center">Usuario Creación</th>
              <th className="text-center">Fecha Modificación</th>
              <th className="text-center">Usuario Modificación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {menus.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No Modulos found</td>
              </tr>
            ) : (
              menus.map((item) => (
                <tr key={item.idMenu}>
                  <td className="text-center">{item.idMenu}</td>
                  <td>{item.nombre}</td>
                  <td className="text-center">{getModuloNameById(item.idModulo)}</td> {/* Display module name */}
                  <td className="text-center">{item.ordenMenu}</td>
                  <td className="text-center">{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{item.usuarioCreacion}</td>
                  <td className="text-center">{new Date(item.fechaModificacion).toLocaleDateString()}</td>
                  <td className="text-center">{item.usuarioModificacion}</td>
                  <td className="text-center">
                    <Button variant="warning" size="sm" className="mr-2" onClick={() => handleShowEdit(item)}>Editar</Button>
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
            <Form.Group controlId="idModulo" className="mt-3">
              <Form.Label>Seleccionar Módulo</Form.Label>
              <Form.Control
                as="select"
                name="idModulo"
                value={newModulo.idModulo}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un Módulo</option>
                {modulos.map(modulo => (
                  <option key={modulo.idModulo} value={modulo.idModulo}>
                    {modulo.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="ordenMenu" className="mt-3">
              <Form.Label>Orden Menu</Form.Label>
              <Form.Control
                type="number"
                name="ordenMenu"
                value={newModulo.ordenMenu}
                onChange={handleInputChange} // Allow user input
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Menú</Button>
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
              <Form.Group controlId="idModulo" className="mt-3">
                <Form.Label>Seleccionar Módulo</Form.Label>
                <Form.Control
                  as="select"
                  name="idModulo"
                  value={editModulo.idModulo}
                  onChange={handleEditInputChange}
                  required
                >
                  {modulos.map(modulo => (
                    <option key={modulo.idModulo} value={modulo.idModulo}>
                      {modulo.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ordenMenu" className="mt-3">
                <Form.Label>Orden Menu</Form.Label>
                <Form.Control
                  type="number"
                  name="ordenMenu"
                  value={editModulo.ordenMenu}
                  onChange={handleEditInputChange}
                  required
                />
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
