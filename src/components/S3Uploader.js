import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: 'AKIA23DM6XZAIT5H2FOA',
    secretAccessKey: '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',
  }
});

export default function S3Uploader() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file) {
      alert('Selecciona un archivo antes de subir.');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const body = new Uint8Array(arrayBuffer);

      const uploadParams = {
        Bucket: 'media-originals-bucket',
        Key: file.name,
        Body: body,
        ContentType: file.type
      };

      await s3.send(new PutObjectCommand(uploadParams));
      setStatus(`✅ ¡Subido correctamente como ${file.name}!`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Sube tu archivo multimedia</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: '1rem' }}>
        Subir
      </button>
      <p style={{ color: status.startsWith('❌') ? 'red' : 'green' }}>{status}</p>
    </div>
  );
}
