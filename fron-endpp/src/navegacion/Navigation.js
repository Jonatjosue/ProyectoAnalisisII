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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginAutenticacion />} />
      <Route path="/" element={<ProtectedRoute><Navigation /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="about" element={<Blogs />} />
        <Route path="FormularioUsuario" element={<FormularioUsuario />} />
        <Route path="FormularioEmpresa" element={<FormularioEmpresa />} />
        <Route path="ListaEmpresas" element={<ListaEmpresas />} />
        <Route path="Usuarios" element={<Usuarios />} />
      </Route>
    </Routes>
  );
}

export default App;
