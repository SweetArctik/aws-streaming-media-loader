import React, { useEffect, useState } from 'react';
import './Styles/GalleryStyles.css'

const CLOUDFRONT_URL = "https://d18srlidxjcidy.cloudfront.net";

const GalleryViewer = () => {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [modalFile, setModalFile] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/files')
      .then(res => res.json())
      .then(setFiles)
      .catch(console.error);
  }, []);

  const isImage = file => /\.(png|jpg|jpeg|gif)$/i.test(file);
  const isVideo = file => /\.(mp4|webm|ogg)$/i.test(file);

  const filteredFiles = files.filter(file =>
    activeTab === "images" ? isImage(file) : isVideo(file)
  );

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Galería multimedia</h1>

      <div className="gallery-buttons">
        <button
          className={`gallery-button ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
        <button
          className={`gallery-button ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Imágenes
        </button>
      </div>

      <div className="gallery-grid">
        {filteredFiles.map((file, i) => (
          <div key={i} className="gallery-item" onClick={() => setModalFile(file)}>
            {isImage(file) ? (
              <img src={`${CLOUDFRONT_URL}/${file}`} alt={file} />
            ) : (
              <video src={`${CLOUDFRONT_URL}/${file}`} controls />
            )}
            <p>{file}</p>
          </div>
        ))}
      </div>

      {modalFile && (
        <div className="modal-backdrop" onClick={() => setModalFile(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {isImage(modalFile) ? (
              <img src={`${CLOUDFRONT_URL}/${modalFile}`} alt={modalFile} />
            ) : (
              <video src={`${CLOUDFRONT_URL}/${modalFile}`} controls autoPlay />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryViewer;
