// App.js
import React, { useState, useContext } from "react";
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './agregaragencia/Home';
import About from './agregarprivlegios/privilegios';
import FormularioUsuario from './FormularioUsuario/FormularioUsuario';
import FormularioEmpresa from './EmpresaDetails/FormularioEmpresa';
import ListaEmpresas from './ListaEmpresas/ListaEmpresas';
import Usuarios from './Usuarios/Usuarios';
import { AuthProvider , AuthContext } from './autenticacion/AuthContext';
import ProtectedRoute from './rutaProtegida/ProtectedRoute';
import { LoginAutenticacion } from './LoginAuntenticacion/LoginAutenticacion';
import RestrablecerContrasenia from "./RestablecerContrasenia/RestablecerContrasenia";
import CuentaCorriente from './Cuentacorriente/Cuentacorriente'
import Persona from './Persona/Persona';
import CambiarContrasenia from "./CambiarContrasenia/CambiarContrasenia";

// Simulando los permisos para cada ruta
const permisos = {
  FormularioUsuario: 1, 
  FormularioEmpresa: 0,
  ListaEmpresas: 0,
  Usuarios: 0,
  Persona: 0,
  CuentaCorriente: 0,
  CambiarContrasenia: 1
};

function NavBar() {
  const {  authToken , logout } = useContext(AuthContext);
  const [showLinks, setShowLinks] = useState(true);

  const handleClick = () => {
    setShowLinks(false);
  };

  const logoutClick = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Cuenta corriente</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {authToken && (
            <ul className="navbar-nav">
              {showLinks ? (
                <>
                  <li className="nav-link active" aria-current="page"><Link to="/" onClick={handleClick}>Home</Link></li>
                  <li className="nav-link active" aria-current="page"><Link to="/about" onClick={handleClick}>About</Link></li>
                  
                  {/* Condicionales para mostrar/enlazar las rutas según permisos */}
                  {permisos.FormularioEmpresa === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/FormularioEmpresa" onClick={handleClick}>FormularioEmpresa</Link></li>
                  )}
                  {permisos.ListaEmpresas === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/ListaEmpresas" onClick={handleClick}>ListaEmpresas</Link></li>
                  )}
                  {permisos.Usuarios === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/Usuarios" onClick={handleClick}>Usuarios</Link></li>
                  )}
                  {permisos.Persona === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/Persona" onClick={handleClick}>Persona</Link></li>
                  )}
                  {permisos.CambiarContrasenia === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/CambiarContrasenia">Cambiar Contraseña</Link></li>
                  )}
                  {permisos.CuentaCorriente === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/CuentaCorriente" onClick={handleClick}>Cuenta corriente</Link></li>
                  )}
                </>
              ) : (
                <li className="nav-link active" aria-current="page"><Link to="/" onClick={() => setShowLinks(true)}>Home</Link></li>
              )}
              <li className="nav-link active" aria-current="page"><Link to="/login" onClick={logoutClick}>Logout</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div>
        <Routes>
          <Route path="/login" element={<LoginAutenticacion />} />
          <Route path='/RestrablecerContrasenia' element={<RestrablecerContrasenia/>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          
          {/* Condicionales para las rutas basadas en permisos */}
          {permisos.FormularioUsuario === 1 && (
            <Route path="/FormularioUsuario" element={<ProtectedRoute><FormularioUsuario /></ProtectedRoute>} />
          )}
          {permisos.FormularioEmpresa === 1 && (
            <Route path="/FormularioEmpresa" element={<ProtectedRoute><FormularioEmpresa /></ProtectedRoute>} />
          )}
          {permisos.ListaEmpresas === 1 && (
            <Route path="/ListaEmpresas" element={<ProtectedRoute><ListaEmpresas /></ProtectedRoute>} />
          )}
          {permisos.Usuarios === 1 && (
            <Route path="/Usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
          )}
          {permisos.Persona === 1 && (
            <Route path="/Persona" element={<ProtectedRoute><Persona /></ProtectedRoute>} />
          )}
          {permisos.CambiarContrasenia === 1 && (
            <Route path="/CambiarContrasenia" element={<ProtectedRoute><CambiarContrasenia /></ProtectedRoute>} />
          )}
          {permisos.CuentaCorriente === 1 && (
            <Route path="/CuentaCorriente" element={<ProtectedRoute><CuentaCorriente /> </ProtectedRoute>} />
          )}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
