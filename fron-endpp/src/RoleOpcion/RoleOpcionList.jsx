import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const RoleOpcionList = () => {
    const [roleOpciones, setRoleOpciones] = useState([]);
    const [roles, setRoles] = useState([]);
    const [opciones, setOpciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        idRole: '',
        idOpcion: '',
        alta: false,
        baja: false,
        imprimir: false,
        exportar: false,
        fechaModificacion: null,
        usuarioModificacion: null
    });

    useEffect(() => {
        fetchRolesAndRoleOpciones();
    }, []);

    const fetchRolesAndRoleOpciones = async () => {
        try {
            // Fetching Role data
            const roleResponse = await axios.get('http://localhost:8081/api/Role');
            setRoles(roleResponse.data);

            // Fetching RoleOpcion data
            const roleOpcionResponse = await axios.get('http://localhost:8081/api/role-opcion');
            setRoleOpciones(roleOpcionResponse.data);

            // Fetching Opciones data
            const opcionesResponse = await axios.get('http://localhost:8081/api/opciones/get');
            setOpciones(opcionesResponse.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        alert(item.idRole+'/'+item.idOpcion);
        setFormData({
            idRole: item.idRole,
            idOpcion: item.idOpcion,
            alta: item.alta,
            baja: item.baja,
            imprimir: item.imprimir,
            exportar: item.exportar,
            fechaModificacion: new Date().toISOString(),
            usuarioModificacion: localStorage.getItem('username'),
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingItem(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSaveChanges = async () => {
        try {
            // Prepare the updated item with the correct IDs and other changes
            const updatedItem = {
                ...editingItem,
                idRole: formData.idRole,   // Using the ID of the role
                idOpcion: formData.idOpcion, // Using the ID of the option
                alta: formData.alta,
                baja: formData.baja,
                imprimir: formData.imprimir,
                exportar: formData.exportar,
                fechaModificacion: formData.fechaModificacion,
                usuarioModificacion: formData.usuarioModificacion,
            };

            // Make an API call to save the updated data (sending the IDs, not the names)
            await axios.put(`http://localhost:8081/api/role-opcion/${updatedItem.idRole}/${updatedItem.idOpcion}`, updatedItem);

            // Update the roleOpciones state with the modified item
            setRoleOpciones((prev) =>
                prev.map((item) =>
                    item.idRole === updatedItem.idRole && item.idOpcion === updatedItem.idOpcion ? updatedItem : item
                )
            );

            // Close the modal after saving
            handleCloseModal();
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const handleDeleteClick = async (idRole, idOpcion) => {
        try {
            // Make an API call to delete the RoleOpcion entry
            await axios.delete(`http://localhost:8081/api/role-opcion/${idRole}/${idOpcion}`);

            // Remove the deleted item from the state
            setRoleOpciones((prev) =>
                prev.filter((item) => item.idRole !== idRole || item.idOpcion !== idOpcion)
            );
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Function to get the role name by idRole
    const getRoleName = (idRole) => {
        const role = roles.find((role) => role.idRole === idRole);
        return role ? role.nombre : 'Unknown';
    };

    // Function to get the option name by idOpcion
    const getOpcionName = (idOpcion) => {
        const opcion = opciones.find((opcion) => opcion.idOpcion === idOpcion);
        return opcion ? opcion.nombre : 'Unknown';
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center align-middle">Role Opción List</h1>
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
                            <th className="text-center align-middle">Key</th>
                            <th className="text-center align-middle">Role</th>
                            <th className="text-center align-middle">Opción</th>
                            <th className="text-center align-middle">Alta</th>
                            <th className="text-center align-middle">Baja</th>
                            <th className="text-center align-middle">Imprimir</th>
                            <th className="text-center align-middle">Exportar</th>
                            <th className="text-center align-middle">Fecha Creación</th>
                            <th className="text-center align-middle">Usuario Creación</th>
                            <th className="text-center align-middle">Fecha Modificación</th>
                            <th className="text-center align-middle">Usuario Modificación</th>
                            <th className="text-center align-middle">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleOpciones.length === 0 ? (
                            <tr>
                                <td colSpan="11" className="text-center align-middle">No Role Opción found</td>
                            </tr>
                        ) : (
                            roleOpciones.map((item) => (
                                <tr key={`${item.idRole}${item.idOpcion}`}>
                                    <td className="text-center align-middle">{`${item.idRole}${item.idOpcion}`}</td>
                                    <td className="text-center align-middle">{getRoleName(item.idRole)}</td>
                                    <td className="text-center align-middle">{getOpcionName(item.idOpcion)}</td>
                                    <td className="text-center align-middle">{item.alta ? 'Sí' : 'No'}</td>
                                    <td className="text-center align-middle">{item.baja ? 'Sí' : 'No'}</td>
                                    <td className="text-center align-middle">{item.imprimir ? 'Sí' : 'No'}</td>
                                    <td className="text-center align-middle">{item.exportar ? 'Sí' : 'No'}</td>
                                    <td className="text-center align-middle">{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                                    <td className="text-center align-middle">{item.usuarioCreacion}</td>
                                    <td className="text-center align-middle">{new Date(item.fechaModificacion).toLocaleDateString()}</td>
                                    <td className="text-center align-middle">{item.usuarioModificacion}</td>
                                    <td className="text-center align-middle d-flex justify-content-start">
                                        <Button variant="warning" size="sm" onClick={() => handleEditClick(item)} className="mr-2">
                                            Editar
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.idRole, item.idOpcion)} className="ml-2">
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}

            {/* Modal for editing */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Role Opción</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="idRole"
                                value={formData.idRole}
                                onChange={handleInputChange}
                                disabled // Disable the select dropdown
                            >
                                {roles.map((role) => (
                                    <option key={role.idRole} value={role.idRole}>
                                        {role.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formOpcion">
                            <Form.Label>Opción</Form.Label>
                            <Form.Control
                                as="select"
                                name="idOpcion"
                                value={formData.idOpcion}
                                onChange={handleInputChange}
                                disabled // Disable the select dropdown
                            >
                                {opciones.map((opcion) => (
                                    <option key={opcion.idOpcion} value={opcion.idOpcion}>
                                        {opcion.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formAlta">
                            <Form.Check
                                type="checkbox"
                                label="Alta"
                                name="alta"
                                checked={formData.alta}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBaja">
                            <Form.Check
                                type="checkbox"
                                label="Baja"
                                name="baja"
                                checked={formData.baja}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formImprimir">
                            <Form.Check
                                type="checkbox"
                                label="Imprimir"
                                name="imprimir"
                                checked={formData.imprimir}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formExportar">
                            <Form.Check
                                type="checkbox"
                                label="Exportar"
                                name="exportar"
                                checked={formData.exportar}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Guardar cambios</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RoleOpcionList;
