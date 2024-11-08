import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://localhost:8081/api/status-cuenta';

// Service class for API requests
class StatusCuentaService {
    obtenerTodos() {
        return axios.get(BASE_URL);
    }

    obtenerPorId(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    crearStatusCuenta(statusCuenta) {
        return axios.post(BASE_URL, statusCuenta);
    }

    actualizarStatusCuenta(id, statusCuenta) {
        return axios.put(`${BASE_URL}/${id}`, statusCuenta);
    }

    eliminarStatusCuenta(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

const statusCuentaService = new StatusCuentaService();

const StatusCuentaComponent = () => {
    const [statusCuentas, setStatusCuentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newStatusCuenta, setNewStatusCuenta] = useState({
        nombre: '',
        usuarioCreacion: localStorage.getItem('username') || '',
        fechaCreacion: '',
    });
    const [editStatusCuenta, setEditStatusCuenta] = useState(null);
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
        fetchStatusCuentas();
    }, []);

    const fetchStatusCuentas = async () => {
        try {
            const response = await statusCuentaService.obtenerTodos();
            setStatusCuentas(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Status Cuentas:', error);
            setLoading(false);
        }
    };

    const handleShowAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleShowEdit = (statusCuenta) => {
        setEditStatusCuenta(statusCuenta);
        setShowEditModal(true);
    };

    const handleCloseEdit = () => {
        setEditStatusCuenta(null);
        setShowEditModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStatusCuenta({ ...newStatusCuenta, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditStatusCuenta({ ...editStatusCuenta, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDateTime = new Date().toISOString();
            const statusCuentaToSubmit = {
                ...newStatusCuenta,
                fechaCreacion: currentDateTime,
            };
            await statusCuentaService.crearStatusCuenta(statusCuentaToSubmit);
            setShowAddModal(false);
            fetchStatusCuentas();
        } catch (error) {
            console.error('Error creating Status Cuenta:', error);
        }
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedStatusCuenta = {
                ...editStatusCuenta,
                usuarioModificacion: localStorage.getItem('username'),
                fechaModificacion: new Date().toISOString(),
            };
            await statusCuentaService.actualizarStatusCuenta(editStatusCuenta.idStatusCuenta, updatedStatusCuenta);
            handleCloseEdit();
            fetchStatusCuentas();
        } catch (error) {
            console.error('Error updating Status Cuenta:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este estado de cuenta?')) {
            try {
                await statusCuentaService.eliminarStatusCuenta(id);
                setStatusCuentas(statusCuentas.filter((status) => status.idStatusCuenta !== id));
            } catch (error) {
                console.error('Error deleting Status Cuenta:', error);
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-between align-items-center">
                <Col>
                    <h1 className="text-center">Gestión de Estados de Cuenta</h1>
                </Col>
                <Col className="text-right">
                    {permissions.alta && (<Button variant="primary" onClick={handleShowAdd}>Nuevo Estado de Cuenta</Button>)}
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
                        {statusCuentas.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">No hay estados de cuenta disponibles</td>
                            </tr>
                        ) : (
                            statusCuentas.map((status) => (
                                <tr key={status.idStatusCuenta}>
                                    <td className="text-center">{status.idStatusCuenta}</td>
                                    <td>{status.nombre}</td>
                                    <td className="text-center">{new Date(status.fechaCreacion).toLocaleDateString()}</td>
                                    <td className="text-center">{status.usuarioCreacion}</td>
                                    <td className="text-center">{status.fechaModificacion ? new Date(status.fechaModificacion).toLocaleDateString() : ''}</td>
                                    <td className="text-center">{status.usuarioModificacion}</td>
                                    <td className="text-center">
                                        {permissions.cambio && (<Button variant="warning" size="sm" onClick={() => handleShowEdit(status)}>Editar</Button>)}
                                        {permissions.baja && (<Button variant="danger" size="sm" className="ml-2" onClick={() => handleDelete(status.idStatusCuenta)}>Eliminar</Button>)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}

            {/* Modal for adding new status cuenta */}
            <Modal show={showAddModal} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Estado de Cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={newStatusCuenta.nombre}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">Crear</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal for editing status cuenta */}
            {editStatusCuenta && (
                <Modal show={showEditModal} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Estado de Cuenta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEditFormSubmit}>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={editStatusCuenta.nombre}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">Actualizar</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </Container>
    );
};

export default StatusCuentaComponent;
