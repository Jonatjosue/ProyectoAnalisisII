import React, { useState, useEffect, useRef } from 'react';

function SaldoCuentaPage() {
  const [saldoCuentas, setSaldoCuentas] = useState([]);
  const [idPersona, setIdPersona] = useState('');
  const [idSaldoCuenta, setIdSaldoCuenta] = useState('');
  const dialogRef = useRef(null);

  // Función para obtener los saldos de cuenta junto con el nombre de usuario
  const fetchSaldoCuentas = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/saldo-cuenta-usuario/${idPersona}`);
      const data = await response.json();
      setSaldoCuentas(data);
    } catch (error) {
      console.error('Error fetching saldo cuentas:', error);
    }
  };

  // Ejecutar la consulta cada vez que se establezca un idPersona
  useEffect(() => {
    if (idPersona) {
      fetchSaldoCuentas();
    }
  }, [idPersona]);

  // Manejar cambio de entrada para el ID de la persona
  const handleIdPersonaChange = (e) => {
    setIdPersona(e.target.value);
  };

  // Función para abrir el diálogo
  const openDialog = (cuenta) => {
    setIdSaldoCuenta(cuenta.Id_Saldo_Cuenta); // Establece el ID de saldo de cuenta para actualizar
    dialogRef.current.showModal();
  };

  // Función para cerrar el diálogo
  const closeDialog = () => {
    dialogRef.current.close();
    setIdSaldoCuenta('');
  };

  // Función para ejecutar el procedimiento de actualización de una sola cuenta
  const actualizarSaldoCuenta = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/actualizar-saldo-cuenta/${idSaldoCuenta}/${idPersona}`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('Saldo actualizado exitosamente');
        closeDialog();
        fetchSaldoCuentas(); // Refresca los datos después de la actualización
      } else {
        alert('Error al actualizar el saldo');
      }
    } catch (error) {
      console.error('Error al actualizar el saldo:', error);
      alert('Error al actualizar el saldo');
    }
  };

  // Función para ejecutar el procedimiento de actualización para todas las cuentas
  const actualizarSaldoTodasCuentas = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/actualizar-saldo-todas-cuentas`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('Saldo de todas las cuentas actualizado exitosamente');
        fetchSaldoCuentas(); // Refresca los datos después de la actualización
      } else {
        alert('Error al actualizar el saldo de todas las cuentas');
      }
    } catch (error) {
      console.error('Error al actualizar el saldo de todas las cuentas:', error);
      alert('Error al actualizar el saldo de todas las cuentas');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Saldos de Cuentas</h2>

      <div className="form-group">
        <label>Ingrese el ID de Persona:</label>
        <input
          type="number"
          className="form-control"
          value={idPersona}
          onChange={handleIdPersonaChange}
          placeholder="ID de Persona"
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={fetchSaldoCuentas}>
        Consultar Saldos
      </button>

      <button className="btn btn-danger mb-4 ml-2" onClick={actualizarSaldoTodasCuentas}>
        Ejecución en Todas las Cuentas
      </button>

      {/* Tabla para mostrar los saldos de cuenta */}
      {saldoCuentas.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Nombre del Cliente</th>
                <th>ID Saldo Cuenta</th>
                <th>Saldo Anterior</th>
                <th>Débitos</th>
                <th>Créditos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {saldoCuentas.map((cuenta) => (
                <tr key={cuenta.Id_Saldo_Cuenta}>
                  <td>{cuenta.NombreUsuario}</td>
                  <td>{cuenta.Id_Saldo_Cuenta}</td>
                  <td>{cuenta.Saldo_Anterior}</td>
                  <td>{cuenta.Debitos}</td>
                  <td>{cuenta.Creditos}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => openDialog(cuenta)}>
                      Actualizar Saldo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se encontraron saldos de cuenta para este ID de Persona.</p>
      )}

      {/* Cuadro de diálogo para actualizar saldo */}
      <dialog ref={dialogRef}>
        <h5>¿Desea actualizar el saldo de cuenta?</h5>
        <p>ID Saldo Cuenta: {idSaldoCuenta}</p>
        <p>ID Persona: {idPersona}</p>
        <button className="btn btn-success" onClick={actualizarSaldoCuenta}>Confirmar</button>
        <button className="btn btn-secondary" onClick={closeDialog}>Cancelar</button>
      </dialog>
    </div>
  );
}

export default SaldoCuentaPage;