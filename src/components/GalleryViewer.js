import React, { useEffect, useState } from 'react';
import './Styles/GalleryStyles.css';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const CLOUDFRONT_URL = "https://d18srlidxjcidy.cloudfront.net";

const GalleryViewer = () => {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [modalIndex, setModalIndex] = useState(null);

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

  const openModal = (index) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);
  const currentFile = modalIndex !== null ? filteredFiles[modalIndex] : null;

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
        {/* <button
          className={`gallery-button ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Imágenes
        </button> */}
      </div>

      <div className="gallery-grid">
        {filteredFiles.map((file, i) => (
          <div key={i} className="gallery-item" onClick={() => openModal(i)}>
            {isImage(file) ? (
              <img src={`${CLOUDFRONT_URL}/${file}`} alt={file} className="media" />
            ) : (
              <video src={`${CLOUDFRONT_URL}/${file}`} controls className="media" />
            )}
            <p>{file}</p>
          </div>
        ))}
      </div>

      {modalIndex !== null && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="modal-controls">
              <button
                className="nav-button"
                onClick={() => setModalIndex((modalIndex - 1 + filteredFiles.length) % filteredFiles.length)}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="modal-media-wrapper">
                {isImage(currentFile) ? (
                  <img src={`${CLOUDFRONT_URL}/${currentFile}`} alt={currentFile} className="modal-media" />
                ) : (
                  <video src={`${CLOUDFRONT_URL}/${currentFile}`} controls autoPlay className="modal-media" />
                )}
              </div>

              <button
                className="nav-button"
                onClick={() => setModalIndex((modalIndex + 1) % filteredFiles.length)}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <p className="modal-caption">{currentFile}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryViewer;
