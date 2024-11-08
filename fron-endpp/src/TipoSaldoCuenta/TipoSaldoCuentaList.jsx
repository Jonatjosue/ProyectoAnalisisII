import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const TipoSaldoCuentaList = () => {
  const [tipoSaldoCuentas, setTipoSaldoCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTipoSaldoCuenta, setNewTipoSaldoCuenta] = useState({
    nombre: '',
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: new Date().toISOString(),
  });

  const [editTipoSaldoCuenta, setEditTipoSaldoCuenta] = useState(null);
  const [permissions, setPermissions] = useState({ alta: false, baja: false, cambio: false, imprimir: false, exportar: false });

  // Fetch permissions for the selected role and option
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
    fetchTipoSaldoCuentas();
  }, []);

  const fetchTipoSaldoCuentas = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/tiposaldo');
      setTipoSaldoCuentas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching TipoSaldoCuentas:', error);
      setLoading(false);
    }
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (tipoSaldoCuenta) => {
    setEditTipoSaldoCuenta(tipoSaldoCuenta);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditTipoSaldoCuenta(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTipoSaldoCuenta({ ...newTipoSaldoCuenta, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTipoSaldoCuenta({ ...editTipoSaldoCuenta, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      const tipoSaldoCuentaToSubmit = {
        ...newTipoSaldoCuenta,
        fechaCreacion: currentDateTime,
      };
      await axios.post('http://localhost:8081/api/tiposaldo', tipoSaldoCuentaToSubmit);
      setShowAddModal(false);
      fetchTipoSaldoCuentas();
    } catch (error) {
      console.error('Error adding new TipoSaldoCuenta:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTipoSaldoCuenta = {
        ...editTipoSaldoCuenta,
        usuarioModificacion: localStorage.getItem('username'), // Set usuarioModificacion
        fechaModificacion: new Date().toISOString(),
      };

      await axios.put(`http://localhost:8081/api/tiposaldo/${updatedTipoSaldoCuenta.idTipoSaldoCuenta}`, updatedTipoSaldoCuenta);
      handleCloseEdit();
      fetchTipoSaldoCuentas();
    } catch (error) {
      console.error('Error updating TipoSaldoCuenta:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/tiposaldo/${id}`);
      alert('TipoSaldoCuenta eliminado con éxito');
      setTipoSaldoCuentas(tipoSaldoCuentas.filter((tipoSaldoCuenta) => tipoSaldoCuenta.idTipoSaldoCuenta !== id));
    } catch (error) {
      console.error('Error al eliminar TipoSaldoCuenta:', error);
      alert('Error al eliminar TipoSaldoCuenta');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Tipos de Saldo de Cuenta</h1>
        </Col>
        <Col className="text-right">
          {permissions.alta && (<Button variant="primary" onClick={handleShowAdd}>Nuevo Tipo de Saldo</Button>)}
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
            {tipoSaldoCuentas.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No se encontraron Tipos de Saldo de Cuenta</td>
              </tr>
            ) : (
              tipoSaldoCuentas.map((tipoSaldoCuenta) => (
                <tr key={tipoSaldoCuenta.idTipoSaldoCuenta}>
                  <td className="text-center">{tipoSaldoCuenta.idTipoSaldoCuenta}</td>
                  <td>{tipoSaldoCuenta.nombre}</td>
                  <td className="text-center">{new Date(tipoSaldoCuenta.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{tipoSaldoCuenta.usuarioCreacion}</td>
                  <td className="text-center">{tipoSaldoCuenta.fechaModificacion ? new Date(tipoSaldoCuenta.fechaModificacion).toLocaleDateString() : ''}</td>
                  <td className="text-center">{tipoSaldoCuenta.usuarioModificacion}</td>
                  <td className="text-center">
                    {permissions.cambio && (<Button variant="warning" size="md" className="mr-2" onClick={() => handleShowEdit(tipoSaldoCuenta)}>Editar</Button>)}
                    {permissions.baja && (<Button variant="danger" size="md" className="ms-2" onClick={() => handleDelete(tipoSaldoCuenta.idTipoSaldoCuenta)}>Eliminar</Button>)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new TipoSaldoCuenta */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Tipo de Saldo de Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newTipoSaldoCuenta.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Tipo de Saldo de Cuenta</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing TipoSaldoCuenta */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tipo de Saldo de Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTipoSaldoCuenta && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editTipoSaldoCuenta.nombre}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Tipo de Saldo de Cuenta</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TipoSaldoCuentaList;
