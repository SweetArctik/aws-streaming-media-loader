import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import S3Uploader from './components/S3Uploader';
import GalleryViewer from './components/GalleryViewer';

export default function App() {
  return (
    <Router>
      <div className="p-4 font-sans">
        <nav className="mb-6 flex gap-4 text-blue-600">
          <Link to="/subir">Subir archivo</Link>
          <Link to="/galeria">Galería</Link>
        </nav>

        <Routes>
          <Route path="/subir" element={<S3Uploader />} />
          <Route path="/galeria" element={<GalleryViewer />} />
          <Route path="*" element={<div>Selecciona una opción en el menú</div>} />
        </Routes>
      </div>
    </Router>
  );
}