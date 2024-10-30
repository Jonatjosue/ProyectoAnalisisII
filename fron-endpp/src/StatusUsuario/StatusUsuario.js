import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StatusUsuario.css'; // Importa el archivo CSS

// URL base de la API
const BASE_URL = 'http://localhost:8081/api/statusUsuarios';

// Servicio para manejar las operaciones CRUD
class StatusUsuarioService {
    obtenerTodos() {
        return axios.get(BASE_URL);
    }

    obtenerPorId(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    crearStatusUsuario(statusUsuario) {
        return axios.post(BASE_URL, statusUsuario);
    }

    actualizarStatusUsuario(id, statusUsuario) {
        return axios.put(`${BASE_URL}/${id}`, statusUsuario);
    }

    eliminarStatusUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
    
}


const statusUsuarioService = new StatusUsuarioService();

const StatusUsuarioComponent = () => {
    const [statusUsuarios, setStatusUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [nuevoStatusUsuario, setNuevoStatusUsuario] = useState({ nombre: '', usuarioCreacion: '' });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [statusUsuarioEditando, setStatusUsuarioEditando] = useState(null);

    useEffect(() => {
        statusUsuarioService.obtenerTodos()
            .then(response => setStatusUsuarios(response.data))
            .catch(error => {
                setError("Error al obtener los status de usuario");
                console.error(error);
            });

        const usuarioCreacion = localStorage.getItem('username') || '';
        setNuevoStatusUsuario(prev => ({ ...prev, usuarioCreacion }));
    }, []);

    const handleCrearStatusUsuario = () => {
        const statusUsuario = {
            nombre: nuevoStatusUsuario.nombre,
            fechaCreacion: new Date().toISOString(),
            usuarioCreacion: nuevoStatusUsuario.usuarioCreacion,
        };

        statusUsuarioService.crearStatusUsuario(statusUsuario)
            .then(response => {
                setStatusUsuarios([...statusUsuarios, response.data]);
                setNuevoStatusUsuario({ nombre: '', usuarioCreacion: nuevoStatusUsuario.usuarioCreacion });
            })
            .catch(error => {
                setError("Error al crear el status de usuario");
                console.error(error);
            });
    };

    const handleActualizarStatusUsuario = () => {
        if (!window.confirm("¿Está seguro de que desea actualizar este status de usuario?")) return;

        const statusUsuarioActualizado = {
            nombre: nuevoStatusUsuario.nombre,
            fechaModificacion: new Date().toISOString(),
            usuarioModificacion: nuevoStatusUsuario.usuarioCreacion,
        };

        statusUsuarioService.actualizarStatusUsuario(statusUsuarioEditando.idStatusUsuario, statusUsuarioActualizado)
            .then(response => {
                const nuevosStatusUsuarios = statusUsuarios.map(su => 
                    su.idStatusUsuario === response.data.idStatusUsuario ? response.data : su
                );
                setStatusUsuarios(nuevosStatusUsuarios);
                setModoEdicion(false);
                setStatusUsuarioEditando(null);
                setNuevoStatusUsuario({ nombre: '', usuarioCreacion: nuevoStatusUsuario.usuarioCreacion });
            })
            .catch(error => {
                setError("Error al actualizar el status de usuario");
                console.error(error);
            });
    };

    const handleEliminarStatusUsuario = (id) => {
        if (!window.confirm("¿Está seguro de que desea eliminar este status de usuario?")) return;

        statusUsuarioService.eliminarStatusUsuario(id)
            .then(() => {
                setStatusUsuarios(statusUsuarios.filter(su => su.idStatusUsuario !== id));
                setModoEdicion(false);
                setStatusUsuarioEditando(null);
                setNuevoStatusUsuario({ nombre: '', usuarioCreacion: nuevoStatusUsuario.usuarioCreacion });
            })
            .catch(error => {
                setError("Error al eliminar el status de usuario");
                console.error(error);
            });
    };

    const handleEditarStatusUsuario = (statusUsuario) => {
        setModoEdicion(true);
        setStatusUsuarioEditando(statusUsuario);
        setNuevoStatusUsuario({ nombre: statusUsuario.nombre, usuarioCreacion: statusUsuario.usuarioCreacion || '' });
    };

    const handleCancelarEdicion = () => {
        setModoEdicion(false);
        setStatusUsuarioEditando(null);
        setNuevoStatusUsuario({ nombre: '', usuarioCreacion: nuevoStatusUsuario.usuarioCreacion });
    };

    return (
        <div className="status-usuario-container">
            <h2>Lista de Status de Usuario</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="status-usuario-list">
                {statusUsuarios.map(statusUsuario => (
                    <li key={statusUsuario.idStatusUsuario} className="status-usuario-item">
                        {statusUsuario.nombre}
                        <button onClick={() => handleEditarStatusUsuario(statusUsuario)} className="edit-button">Editar</button>
                    </li>
                ))}
            </ul>

            {modoEdicion && (
                <button onClick={handleCancelarEdicion} className="cancel-button">
                    Regresar
                </button>
            )}
            <h3>{modoEdicion ? 'Actualizar Status de Usuario' : 'Agregar Nuevo Status de Usuario'}</h3>
            <input
                type="text"
                placeholder="Nombre del Status"
                value={nuevoStatusUsuario.nombre}
                onChange={(e) => setNuevoStatusUsuario({ ...nuevoStatusUsuario, nombre: e.target.value })}
                className="input-field"
            />
            <div className="button-group">
                <button onClick={modoEdicion ? handleActualizarStatusUsuario : handleCrearStatusUsuario} className="submit-button">
                    {modoEdicion ? 'Actualizar' : 'Crear Status'}
                </button>
                {modoEdicion && (
                    <button onClick={() => handleEliminarStatusUsuario(statusUsuarioEditando.idStatusUsuario)} className="delete-button">
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
};

export default StatusUsuarioComponent;
