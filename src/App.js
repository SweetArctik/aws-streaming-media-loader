import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GalleryViewer from './components/GalleryViewer';
import S3Uploader from './components/S3Uploader';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Subir archivo</Link>
        <Link to="/galeria">Galería</Link>
      </div>
      <Routes>
        <Route path="/" element={<S3Uploader />} />
        <Route path="/galeria" element={<GalleryViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
