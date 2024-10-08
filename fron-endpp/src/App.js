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
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand">Cuenta corriente</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
    { authToken && (
            <ul class="navbar-nav">
            {showLinks ? (
             <>
               <li class="nav-link active" aria-current="page" ><Link to="/" onClick={handleClick}>Home</Link></li>
               <li class="nav-link active" aria-current="page" ><Link to="/about" onClick={handleClick}>About</Link></li>
               <li class="nav-link active" aria-current="page" ><Link to="/FormularioEmpresa" onClick={handleClick}>FormularioEmpresa</Link></li>
               <li class="nav-link active" aria-current="page" ><Link to="/ListaEmpresas" onClick={handleClick}>ListaEmpresas</Link></li>
               <li class="nav-link active" aria-current="page" ><Link to="/Usuarios" onClick={handleClick}>Usuarios</Link></li>
             </>
           ) : (
             <li class="nav-link active" aria-current="page" ><Link to="/" onClick={() => setShowLinks(true)}>Home</Link></li>
           )}
           <li class="nav-link active" aria-current="page" ><Link to="/login" onClick={logoutClick}>Logout</Link></li>
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
          <Route path="/FormularioUsuario" element={<ProtectedRoute><FormularioUsuario /></ProtectedRoute>} />
          <Route path="/FormularioEmpresa" element={<ProtectedRoute><FormularioEmpresa /></ProtectedRoute>} />
          <Route path="/ListaEmpresas" element={<ProtectedRoute><ListaEmpresas /></ProtectedRoute>} />
          <Route path="/Usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
