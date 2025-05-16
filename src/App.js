import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GalleryViewer from './components/GalleryViewer';
import S3Uploader from './components/S3Uploader';
import './App.css';

function Home() {
  return (
    <div className="home">
      <img src="/StreamFlix.png" alt="StreamFlix Logo" className="logo" />
      <h1>Bienvenido a Stream Flix</h1>
      <p>
        Stream Flix es una plataforma moderna de gestión y visualización de archivos multimedia, construida sobre la robusta infraestructura de servicios de AWS. Con tecnologías como Amazon S3 para almacenamiento seguro, CloudFront para distribución rápida de contenido, y un backend optimizado que provee endpoints limpios, Stream Flix permite una experiencia fluida tanto en la carga como en la visualización de imágenes y videos. Ideal para equipos creativos, aficionados al cine o proyectos educativos.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/upload">Subir archivo</Link>
        <Link to="/galeria">Galería</Link>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<S3Uploader />} />
          <Route path="/galeria" element={<GalleryViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
