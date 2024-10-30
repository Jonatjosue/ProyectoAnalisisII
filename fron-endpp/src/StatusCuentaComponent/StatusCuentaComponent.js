import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StatusCuenta.css'; // Importa el archivo CSS

const BASE_URL = 'http://localhost:8081/api/status-cuenta';

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
    const [error, setError] = useState(null);
    const [nuevoStatusCuenta, setNuevoStatusCuenta] = useState({ nombre: '', usuarioCreacion: '' });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [statusCuentaEditando, setStatusCuentaEditando] = useState(null);
    const [detallesVisibles, setDetallesVisibles] = useState({});

    useEffect(() => {
        statusCuentaService.obtenerTodos()
            .then(response => setStatusCuentas(response.data))
            .catch(error => {
                setError("Error al obtener los estados de cuenta");
                console.error(error);
            });

        const usuarioCreacion = localStorage.getItem('username') || '';
        setNuevoStatusCuenta(prev => ({ ...prev, usuarioCreacion }));
    }, []);

    const handleCrearStatusCuenta = () => {
        const statusCuenta = {
            nombre: nuevoStatusCuenta.nombre,
            fechaCreacion: new Date().toISOString(),
            usuarioCreacion: nuevoStatusCuenta.usuarioCreacion,
        };

        statusCuentaService.crearStatusCuenta(statusCuenta)
            .then(response => {
                setStatusCuentas([...statusCuentas, response.data]);
                setNuevoStatusCuenta({ nombre: '', usuarioCreacion: nuevoStatusCuenta.usuarioCreacion });
            })
            .catch(error => {
                setError("Error al crear el estado de cuenta");
                console.error(error);
            });
    };

    const handleActualizarStatusCuenta = () => {
        if (!window.confirm("¿Está seguro de que desea actualizar este estado de cuenta?")) return;

        const statusCuentaActualizado = {
            nombre: nuevoStatusCuenta.nombre,
            fechaModificacion: new Date().toISOString(),
            usuarioModificacion: nuevoStatusCuenta.usuarioCreacion,
        };

        statusCuentaService.actualizarStatusCuenta(statusCuentaEditando.idStatusCuenta, statusCuentaActualizado)
            .then(response => {
                const nuevosStatusCuentas = statusCuentas.map(sc => 
                    sc.idStatusCuenta === response.data.idStatusCuenta ? response.data : sc
                );
                setStatusCuentas(nuevosStatusCuentas);
                setModoEdicion(false);
                setStatusCuentaEditando(null);
                setNuevoStatusCuenta({ nombre: '', usuarioCreacion: nuevoStatusCuenta.usuarioCreacion });
            })
            .catch(error => {
                setError("Error al actualizar el estado de cuenta");
                console.error(error);
            });
    };

    const handleEliminarStatusCuenta = (id) => {
        if (!window.confirm("¿Está seguro de que desea eliminar este estado de cuenta?")) return;

        statusCuentaService.eliminarStatusCuenta(id)
            .then(() => {
                setStatusCuentas(statusCuentas.filter(sc => sc.idStatusCuenta !== id));
                setModoEdicion(false);
                setStatusCuentaEditando(null);
                setNuevoStatusCuenta({ nombre: '', usuarioCreacion: nuevoStatusCuenta.usuarioCreacion });
            })
            .catch(error => {
                setError("Error al eliminar el estado de cuenta");
                console.error(error);
            });
    };

    const handleEditarStatusCuenta = (statusCuenta) => {
        setModoEdicion(true);
        setStatusCuentaEditando(statusCuenta);
        setNuevoStatusCuenta({ nombre: statusCuenta.nombre, usuarioCreacion: statusCuenta.usuarioCreacion || '' });
    };

    const handleCancelarEdicion = () => {
        setModoEdicion(false);
        setStatusCuentaEditando(null);
        setNuevoStatusCuenta({ nombre: '', usuarioCreacion: nuevoStatusCuenta.usuarioCreacion });
    };

    const toggleDetalles = (id) => {
        setDetallesVisibles(prevDetalles => ({
            ...prevDetalles,
            [id]: !prevDetalles[id]
        }));
    };

    return (
        <div className="status-cuenta-container">
            <h2>Lista de Estados de Cuenta</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="status-cuenta-list">
                {statusCuentas.map(statusCuenta => (
                    <li key={statusCuenta.idStatusCuenta} className="status-cuenta-item">
                        <span>{statusCuenta.nombre}</span>
                        <div className="button-group-inline">
                            <button onClick={() => toggleDetalles(statusCuenta.idStatusCuenta)} className="details-button">
                                {detallesVisibles[statusCuenta.idStatusCuenta] ? 'Ocultar Detalles' : 'Mostrar Detalles'}
                            </button>
                            <button onClick={() => handleEditarStatusCuenta(statusCuenta)} className="edit-button">Editar</button>
                        </div>
                        {detallesVisibles[statusCuenta.idStatusCuenta] && (
                            <div className="status-cuenta-details">
                                <p>Fecha de Creación: {new Date(statusCuenta.fechaCreacion).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</p>
                                <p>Usuario de Creación: {statusCuenta.usuarioCreacion}</p>
                                <p>Fecha de Modificación: {statusCuenta.fechaModificacion ? new Date(statusCuenta.fechaModificacion).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) : ''}</p>
                                <p>Usuario de Modificación: {statusCuenta.usuarioModificacion || ''}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {modoEdicion && (
                <button onClick={handleCancelarEdicion} className="cancel-button">
                    Regresar
                </button>
            )}
            <h3>{modoEdicion ? 'Actualizar Estado de Cuenta' : 'Agregar Nuevo Estado de Cuenta'}</h3>
            <input
                type="text"
                placeholder="Nombre del Estado"
                value={nuevoStatusCuenta.nombre}
                onChange={(e) => setNuevoStatusCuenta({ ...nuevoStatusCuenta, nombre: e.target.value })}
                className="input-field"
            />
            <div className="button-group">
                <button onClick={modoEdicion ? handleActualizarStatusCuenta : handleCrearStatusCuenta} className="submit-button">
                    {modoEdicion ? 'Actualizar' : 'Crear Estado'}
                </button>
                {modoEdicion && (
                    <button onClick={() => handleEliminarStatusCuenta(statusCuentaEditando.idStatusCuenta)} className="delete-button">
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
};

export default StatusCuentaComponent;
