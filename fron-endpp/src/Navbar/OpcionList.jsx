import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form, Pagination } from 'react-bootstrap';
import axios from 'axios';

const OpcionList = () => {
  const [opciones, setOpciones] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newMenu, setNewOpcion] = useState({
    nombre: '',
    idModulo: '',
    ordenMenu: '',
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: '',
  });
  const [editOpcion, setEditOpcion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [permissions, setPermissions] = useState({ alta: false, baja: false, cambio: false, imprimir: false, exportar: false });

  // Obten idRole y idOpcion para determinar permisos
  const userRole = localStorage.getItem('userRole');
  const idOpcion = localStorage.getItem('idOpcion');

  useEffect(() => {

    // Fetch permissions for the selected role and option
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/role-opcion/${userRole}/${idOpcion}`);
        const { alta, baja, cambio, imprimir, exportar } = response.data;
        setPermissions({ alta, baja, cambio, imprimir, exportar });
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, [userRole, idOpcion]);
  

  useEffect(() => {
    fetchOpciones();
    fetchMenus();
  }, []);
 

  const fetchOpciones = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/opciones/get`);
      setOpciones(response.data);
      setLoading(false);
      setNewOpcion((prev) => ({ ...prev, ordenMenu: response.data.length + 1 }));
    } catch (error) {
      console.error('Error fetching Opciones:', error);
      setLoading(false);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/menu/get`);
      setMenus(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Menús:', error);
      setLoading(false);
    }
  };

  const getMenuNameById = (id) => {
    const menu = menus.find(m => m.idMenu === id);
    return menu ? menu.nombre : 'Unknown';
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (opcion) => {
    setEditOpcion(opcion);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditOpcion(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOpcion({ ...newMenu, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditOpcion({ ...editOpcion, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      const moduloToSubmit = {
        ...newMenu,
        fechaCreacion: currentDateTime,
      };
      await axios.post('http://localhost:8081/api/opciones', moduloToSubmit);
      setShowAddModal(false);
      fetchOpciones();
    } catch (error) {
      console.error('Error adding new Opcion:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString(); // Capture the current date/time
      const updatedOpcion = {
        ...editOpcion,
        usuarioModificacion: localStorage.getItem('username'),
        fechaModificacion: currentDateTime, // Set the modification date
      };

      const originalOrdenMenu = editOpcion.ordenMenu;
      const newOrdenMenu = parseInt(updatedOpcion.ordenMenu);

      if (originalOrdenMenu !== newOrdenMenu) {
        const updatedMenu = opciones.map((menu) => {
          if (menu.idMenu !== updatedOpcion.idMenu) {
            if (menu.ordenMenu >= newOrdenMenu && menu.ordenMenu < originalOrdenMenu) {
              return { ...menu, ordenMenu: menu.ordenMenu + 1 };
            }
            if (menu.ordenMenu <= newOrdenMenu && menu.ordenMenu > originalOrdenMenu) {
              return { ...menu, ordenMenu: menu.ordenMenu - 1 };
            }
          }
          return menu;
        });

        await Promise.all(updatedMenu.map(opcion =>
          axios.put(`http://localhost:8081/api/opciones/${opcion.idOpcion}`, opcion)
        ));
      }

      await axios.put(`http://localhost:8081/api/opciones/${updatedOpcion.idOpcion}`, updatedOpcion);
      handleCloseEdit();
      fetchOpciones();
    } catch (error) {
      console.error('Error updating Opciones:', error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOpciones = opciones.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/opciones/${id}`);
      alert('Opción eliminada con éxito');
      setOpciones(opciones.filter((opcion) => opcion.idOpcion !== id));
    } catch (error) {
      console.error('Error al eliminar la opcion:', error);
      alert('Error al eliminar la opcion');
    }
  };

  
  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Opciones</h1>
        </Col>
        <Col className="text-right">
          {permissions.alta && (
          <Button variant="primary" onClick={handleShowAdd}>Nueva Opción</Button>
          )}
        </Col>
      </Row>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Table striped bordered hover className="mt-3">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Menú</th>
                <th className="text-center">Orden Menú</th>
                <th className="text-center">Fecha Creación</th>
                <th className="text-center">Usuario Creación</th>
                <th className="text-center">Fecha Modificación</th>
                <th className="text-center">Usuario Modificación</th>
                <th className="text-center">Página</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentOpciones.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No se encontraron Opciones</td>
                </tr>
              ) : (
                currentOpciones.map((item) => (
                  <tr key={item.idOpcion}>
                    <td className="text-center">{item.idOpcion}</td>
                    <td>{item.nombre}</td>
                    <td className="text-center">{getMenuNameById(item.idMenu)}</td>
                    <td className="text-center">{item.ordenMenu}</td>
                    <td className="text-center">{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                    <td className="text-center">{item.usuarioCreacion}</td>
                    <td className="text-center">{new Date(item.fechaModificacion).toLocaleDateString()}</td>
                    <td className="text-center">{item.usuarioModificacion}</td>
                    <td className="text-center">{item.pagina}</td>
                    <td className="text-center align-middle d-flex justify-content-start">
                  {/* Conditionally render the "Eliminar" button based on baja permission */}
                  {permissions.cambio && (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleShowEdit(item)}
                    >
                      Editar
                    </button>
                  )}
                  
                  {/* Conditionally render the "Eliminar" button based on baja permission */}
                  {permissions.baja && (
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(item.idOpcion)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
                    
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {/* Pagination component */}
          <Pagination className="justify-content-center">
            {Array.from({ length: Math.ceil(opciones.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}

      {/* Modal for adding new modulo */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Opción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newMenu.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="idMenu" className="mt-3">
              <Form.Label>Seleccionar Menú al que pertenece</Form.Label>
              <Form.Control
                as="select"
                name="idMenu"
                value={newMenu.idMenu}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un Menú</option>
                {menus.map(menu => (
                  <option key={menu.idMenu} value={menu.idMenu}>
                    {menu.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="ordenMenu" className="mt-3">
              <Form.Label>Orden Menu</Form.Label>
              <Form.Control
                type="number"
                name="ordenMenu"
                value={newMenu.ordenMenu}
                onChange={handleInputChange} // Allow user input
                required
              />
            </Form.Group>
            <Form.Group controlId="pagina" className="mt-3">
              <Form.Label>Página</Form.Label>
              <Form.Control
                type="text"
                name="pagina"
                value={newMenu.pagina}
                onChange={handleInputChange} // Allow user input
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Opción</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing modulo */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Opción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editOpcion && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editOpcion.nombre}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="idMenu" className="mt-3">
                <Form.Label>Seleccionar Menú</Form.Label>
                <Form.Control
                  as="select"
                  name="idMenu"
                  value={editOpcion.idMenu}
                  onChange={handleEditInputChange}
                  required
                >
                  {menus.map(menu => (
                    <option key={menu.idMenu} value={menu.idMenu}>
                      {menu.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="ordenMenu" className="mt-3">
                <Form.Label>Orden Menu</Form.Label>
                <Form.Control
                  type="number"
                  name="ordenMenu"
                  value={editOpcion.ordenMenu}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="pagina" className="mt-3">
                <Form.Label>Página</Form.Label>
                <Form.Control
                  type="text"
                  name="pagina"
                  value={editOpcion.pagina}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Opciones</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OpcionList;
