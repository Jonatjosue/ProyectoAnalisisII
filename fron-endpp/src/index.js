import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { LoginAutenticacion } from './LoginAuntenticacion/LoginAutenticacion';
import TipoDocumentoPage from "./TipoDocumentoPage/TipoDocumentoPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App></App>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
