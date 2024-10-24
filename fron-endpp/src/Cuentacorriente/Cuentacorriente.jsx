import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CuentasCorrientes() {
  const [cuentasCorrientes, setCuentasCorrientes] = useState([]);


  const [roleOpcion, setRoleOpcion] = useState(null); //agregar pagina
  
  
  const [formData, setFormData] = useState({
    idTipoDocumento: '',
    idPersona: '',
    noDocumento: '',
    idSaldoCuenta: '',
    saldoAnterior: 0.00,
    debitos: 0.00,
    creditos: 0.00,
    saldoFechaCreacion: '',
    saldoUsuarioCreacion: '',
    saldoFechaModificacion: '',
    saldoUsuarioModificacion: '',
    statusCuenta: '',
    tipoSaldoCuenta: '',
    fechaMovimiento: '',
    valorMovimiento: '',
    valorMovimientoPagado: '',
    generadoAutomaticamente: false,
    descripcion: '',
    tipoMovimientoCXC: '',
    operacionCuentaCorriente: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const dialogRef = useRef(null);

  
  
  
  useEffect(() => {
   
    fetchRoleOpcion(localStorage.getItem("userRole"), 'Empresas');
  }, []); // agregar pagina

  
  
  const fetchCuentaCorrienteByIds = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/cuentasCorrientes/${formData.idTipoDocumento}/${formData.idPersona}`);
      const data = await response.json();
      setCuentasCorrientes([data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  const openDialog = (cuentaCorriente = null) => {
    if (cuentaCorriente) {
      setFormData(cuentaCorriente);
      setIsEditing(true);
    } else {
      setFormData({
        idTipoDocumento: '',
        idPersona: '',
        noDocumento: '',
        idSaldoCuenta: '',
        saldoAnterior: 0.00,
        debitos: 0.00,
        creditos: 0.00,
        saldoFechaCreacion: '',
        saldoUsuarioCreacion: '',
        saldoFechaModificacion: '',
        saldoUsuarioModificacion: '',
        statusCuenta: '',
        tipoSaldoCuenta: '',
        fechaMovimiento: '',
        valorMovimiento: '',
        valorMovimientoPagado: '',
        generadoAutomaticamente: false,
        descripcion: '',
        tipoMovimientoCXC: '',
        operacionCuentaCorriente: ''
      });
      setIsEditing(false);
    }
    dialogRef.current.showModal();
  };


  const closeDialog = () => {
    dialogRef.current.close();
    setFormData({
      idTipoDocumento: '',
      idPersona: '',
      noDocumento: '',
      idSaldoCuenta: '',
      saldoAnterior: 0.00,
      debitos: 0.00,
      creditos: 0.00,
      saldoFechaCreacion: '',
      saldoUsuarioCreacion: '',
      saldoFechaModificacion: '',
      saldoUsuarioModificacion: '',
      statusCuenta: '',
      tipoSaldoCuenta: '',
      fechaMovimiento: '',
      valorMovimiento: '',
      valorMovimientoPagado: '',
      generadoAutomaticamente: false,
      descripcion: '',
      tipoMovimientoCXC: '',
      operacionCuentaCorriente: ''
    });
    setIsEditing(false);
  };

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  
  const fetchRoleOpcion = async (idRole, nombreOpcion) => {
    try {
        const response = await fetch(`http://localhost:8081/api/role-opcion-por-nombre/`+idRole+`/`+nombreOpcion);
        const data = await response.json();
        setRoleOpcion(data);  // Actualizamos el estado con los datos recibidos
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      const url = isEditing
        ? `http://localhost:8081/api/cuentasCorrientes/${formData.idTipoDocumento}/${formData.idPersona}`
        : 'http://localhost:8081/api/cuentasCorrientes';
      await fetch(url, requestOptions);
      alert(`Cuenta corriente ${isEditing ? 'actualizada' : 'creada'} con éxito`);
      closeDialog();
      fetchCuentaCorrienteByIds();
    } catch (error) {
      console.error('Error al guardar la cuenta corriente:', error);
      alert('Error al guardar la cuenta corriente');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Crear Cuenta Corriente</h1>
      {
        (roleOpcion.Alta===true)?<form></form>:<p>No puede escribir</p>
        
      }
    
      {/* Aquí continúan el resto de inputs y tabla como en tu código original */}
    </div>
  );//agregar tambien
}

export default CuentasCorrientes;