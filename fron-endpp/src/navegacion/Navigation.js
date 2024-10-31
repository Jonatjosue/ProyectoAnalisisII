// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Blogs from './Blogs';
import FormularioUsuario from './FormularioUsuario';
import FormularioEmpresa from './FormularioEmpresa';
import ListaEmpresas from './ListaEmpresas';
import Usuarios from './Usuarios/Usuarios';
import Navigation from './Navigation';
import LoginAutenticacion from './LoginAutenticacion/LoginAutenticacion';
import ProtectedRoute from '../rutaProtegida/ProtectedRoute';
import RestrablecerContrasenia from '../RestablecerContrasenia/RestablecerContrasenia';
import MiPerfil from '../MiPerfil';
import CuentasCorrientes from '../Cuentacorriente/Cuentacorriente';
import CambiarContrasenia from '../CambiarContrasenia/CambiarContrasenia';
import Persona from '../Persona/Persona'
import TipoDocumentoPage from "./TipoDocumentoPage/TipoDocumentoPage";
import SaldoCuentaPage from "./SaldoCuentaPage/SaldoCuentaPage";
import MovimientoCuentaPage from "./MovimientoCuentaPage/MovimientoCuentaPage";

// <Route path='/RestrablecerContrasenia' element={<RestrablecerContrasenia/>} />
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginAutenticacion />} />
      <Route path='/RestrablecerContrasenia' element={<RestrablecerContrasenia/>} />
      <Route path="/" element={<ProtectedRoute><Navigation /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="about" element={<Blogs />} />
        <Route path="FormularioUsuario" element={<FormularioUsuario />} />
        <Route path="FormularioEmpresa" element={<FormularioEmpresa />} />
        <Route path="ListaEmpresas" element={<ListaEmpresas />} />
        <Route path="Usuarios" element={<Usuarios />} />
        <Route path="Persona" element={< Persona/>} />
        <Route path="CuentasCorrientes" element={<CuentasCorrientes />} />
        <Route path='/CambiarContrasenia' element={<CambiarContrasenia/>}/>
        <Route path='/TipoDocumentoPage' element={<TipoDocumentoPage/>}/>
        <Route path='/SaldoCuentaPage' element={<SaldoCuentaPage/>}/>
        <Route path='/MovimientoCuentaPage' element={<MovimientoCuentaPage/>}/>

      </Route>
    </Routes>
  );
}

export default App;
