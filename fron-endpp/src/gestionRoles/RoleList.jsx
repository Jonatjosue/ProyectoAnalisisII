import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRole, setNewRole] = useState({
    nombre: '',
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: '',
  });

  const [editRole, setEditRole] = useState(null);
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
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/Role');
      setRoles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Roles:', error);
      setLoading(false);
    }
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (role) => {
    setEditRole(role);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditRole(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditRole({ ...editRole, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      const roleToSubmit = {
        ...newRole,
        fechaCreacion: currentDateTime,
      };
      await axios.post('http://localhost:8081/api/Role', roleToSubmit);
      setShowAddModal(false);
      fetchRoles();
    } catch (error) {
      console.error('Error adding new Role:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRole = {
        ...editRole,
        usuarioModificacion: localStorage.getItem('username'), // Set usuarioModificacion
        fechaModificacion: new Date().toISOString(),
      };

      await axios.put(`http://localhost:8081/api/Role/${updatedRole.idRole}`, updatedRole);
      handleCloseEdit();
      fetchRoles();
    } catch (error) {
      console.error('Error updating Role:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/Role/${id}`);
      alert('Role eliminado con éxito');
      setRoles(roles.filter((role) => role.idRole !== id));
    } catch (error) {
      console.error('Error al eliminar el Role:', error);
      alert('Error al eliminar el Role');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Roles</h1>
        </Col>
        <Col className="text-right">
          {permissions.alta && (<Button variant="primary" onClick={handleShowAdd}>Nuevo Rol</Button>)}
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
            {roles.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No Roles found</td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role.idRole}>
                  <td className="text-center">{role.idRole}</td>
                  <td>{role.nombre}</td>
                  <td className="text-center">{new Date(role.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{role.usuarioCreacion}</td>
                  <td className="text-center">{role.fechaModificacion ? new Date(role.fechaModificacion).toLocaleDateString() : ''}</td>
                  <td className="text-center">{role.usuarioModificacion}</td>
                  <td className="text-center">
                    {permissions.cambio && (<Button variant="warning" size="md" className="mr-2" onClick={() => handleShowEdit(role)}>Editar</Button>)}
                    {permissions.baja && (<Button variant="danger" size="md" className="ms-2" onClick={() => handleDelete(role.idRole)}>Eliminar</Button>)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new role */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newRole.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Rol</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing role */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editRole && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editRole.nombre}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Rol</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RoleList;
