import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
    const [personas, setPersonas] = useState([]);
    const [error, setError] = useState(null); // Agregado para manejar errores

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/personas');
                setPersonas(response.data);
            } catch (error) {
                console.error('Hubo un error al obtener las personas:', error);
                setError('No se pudieron cargar las personas. Intenta más tarde.'); // Mensaje de error
            }
        };
        
        fetchPersonas();
    }, []);

    const containerStyle = {
        maxWidth: '1000px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'Arial, sans-serif',
    };

    const thTdStyle = {
        padding: '12px',
        border: '1px solid #ddd',
        textAlign: 'left',
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
    };

    const trEvenStyle = {
        backgroundColor: '#f2f2f2',
    };

    const trHoverStyle = {
        backgroundColor: '#ddd',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Lista de Clientes</h1>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>} {/* Mensaje de error */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Apellido</th>
                        <th style={thStyle}>Fecha de Nacimiento</th>
                        <th style={thStyle}>Género</th>
                        <th style={thStyle}>Dirección</th>
                        <th style={thStyle}>Teléfono</th>
                        <th style={thStyle}>Correo Electrónico</th>
                        <th style={thStyle}>Estado Civil</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona, index) => (
                        <tr
                            key={persona.idPersona}
                            style={index % 2 === 0 ? trEvenStyle : null}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? trEvenStyle.backgroundColor : 'transparent'}
                        >
                            <td style={thTdStyle}>{persona.nombre}</td>
                            <td style={thTdStyle}>{persona.apellido}</td>
                            <td style={thTdStyle}>{new Date(persona.fechaNacimiento).toLocaleDateString()}</td>
                            <td style={thTdStyle}>{persona.genero?.descripcion || 'N/A'}</td> {/* Manejo de posibles datos nulos */}
                            <td style={thTdStyle}>{persona.direccion || 'N/A'}</td>
                            <td style={thTdStyle}>{persona.telefono || 'N/A'}</td>
                            <td style={thTdStyle}>{persona.correoElectronico || 'N/A'}</td>
                            <td style={thTdStyle}>{persona.estadoCivil?.descripcion || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;
