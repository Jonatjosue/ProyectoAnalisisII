import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Genero.css'; // Importa el archivo CSS

// URL base de la API
const BASE_URL = 'http://localhost:8081/api/generos';

// Servicio para manejar las operaciones CRUD
class GeneroService {
    obtenerTodos() {
        return axios.get(BASE_URL);
    }

    obtenerPorId(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    crearGenero(genero) {
        return axios.post(BASE_URL, genero);
    }

    actualizarGenero(id, genero) {
        return axios.put(`${BASE_URL}/${id}`, genero);
    }
}

const generoService = new GeneroService();

// Componente principal para mostrar y manejar géneros
const GeneroComponent = () => {
    const [generos, setGeneros] = useState([]);
    const [error, setError] = useState(null);
    const [nuevoGenero, setNuevoGenero] = useState({ nombre: '' });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [generoEditando, setGeneroEditando] = useState(null);
    const [detallesVisibles, setDetallesVisibles] = useState({});

    // Obtener todos los géneros al montar el componente
    useEffect(() => {
        generoService.obtenerTodos()
            .then(response => setGeneros(response.data))
            .catch(error => {
                setError("Error al obtener los géneros");
                console.error(error);
            });
    }, []);

    // Manejar la creación de un nuevo género
    const handleCrearGenero = () => {
        const usuarioCreacion = localStorage.getItem('username'); // Obtener username del LocalStorage
        const genero = {
            nombre: nuevoGenero.nombre,
            fechaCreacion: new Date().toISOString(),
            usuarioCreacion: usuarioCreacion,
        };

        generoService.crearGenero(genero)
            .then(response => {
                setGeneros([...generos, response.data]);
                setNuevoGenero({ nombre: '' });
            })
            .catch(error => {
                setError("Error al crear el género");
                console.error(error);
            });
    };

    // Manejar la actualización de un género
    const handleActualizarGenero = () => {
        const usuarioModificacion = localStorage.getItem('username'); // Obtener username del LocalStorage
        const generoActualizado = {
            nombre: nuevoGenero.nombre,
            fechaModificacion: new Date().toISOString(),
            usuarioModificacion: usuarioModificacion,
        };

        generoService.actualizarGenero(generoEditando.idGenero, generoActualizado)
            .then(response => {
                const nuevosGeneros = generos.map(g => 
                    g.idGenero === response.data.idGenero ? response.data : g
                );
                setGeneros(nuevosGeneros);
                setModoEdicion(false);
                setGeneroEditando(null);
                setNuevoGenero({ nombre: '' });
            })
            .catch(error => {
                setError("Error al actualizar el género");
                console.error(error);
            });
    };

    // Manejar la selección de un género para editar
    const handleEditarGenero = (genero) => {
        setModoEdicion(true);
        setGeneroEditando(genero);
        setNuevoGenero({ nombre: genero.nombre });
    };

    // Manejar la visualización de detalles de un género
    const toggleDetalles = (id) => {
        setDetallesVisibles(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="genero-container">
            <h2>Lista de Géneros</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="genero-list">
                {generos.map(genero => (
                    <li key={genero.idGenero} className="genero-item">
                        <div>
                            <strong>{genero.nombre}</strong>
                            <button onClick={() => toggleDetalles(genero.idGenero)} className="details-button">
                                {detallesVisibles[genero.idGenero] ? '  Ocultar Detalles' : '   Mostrar Detalles'}
                            </button>
                            {detallesVisibles[genero.idGenero] && (
                                <div className="genero-details">
                                    <p>Fecha de Creación: {genero.fechaCreacion}</p>
                                    <p>Usuario de Creación: {genero.usuarioCreacion}</p>
                                    <p>Fecha de Modificación: {genero.fechaModificacion ? new Date(genero.fechaModificacion).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) : '' }</p>
                                    <p>Usuario de Modificación: {genero.usuarioModificacion || ''}</p>

                                </div>
                            )}
                        </div>
                        <button onClick={() => handleEditarGenero(genero)} className="edit-button">Editar</button>
                    </li>
                ))}
            </ul>

            <h3>{modoEdicion ? 'Actualizar Género' : 'Agregar Nuevo Género'}</h3>
            <input
                type="text"
                placeholder="Nombre del Género"
                value={nuevoGenero.nombre}
                onChange={(e) => setNuevoGenero({ ...nuevoGenero, nombre: e.target.value })}
                className="input-field"
            />
            <button onClick={modoEdicion ? handleActualizarGenero : handleCrearGenero} className="submit-button">
                {modoEdicion ? 'Actualizar' : 'Crear Género'}
            </button>
        </div>
    );
};

export default GeneroComponent;
