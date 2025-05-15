import React from 'react';
import styled from 'styled-components';

const CLOUDFRONT_URL = 'https://drutegwkh099g.cloudfront.net';

const mediaFiles = [
  'dd208480c697eb68a91f73df5ca904a.jpg',
  'video1.mp4',
  'imagen2.png'
];

const Container = styled.div`
  padding: 2rem;
  font-family: sans-serif;
  background: #f3f4f6;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const FileName = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function GalleryViewer() {
  return (
    <Container>
      <Title>Galería multimedia</Title>
      <Grid>
        {mediaFiles.map((file, index) => {
          const url = `${CLOUDFRONT_URL}/${file}`;
          const ext = file.split('.').pop().toLowerCase();
          const isVideo = ['mp4', 'webm', 'mov'].includes(ext);

          return (
            <Card key={index}>
              {isVideo ? (
                <video
                  controls
                  style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                >
                  <source src={url} type={`video/${ext}`} />
                  Tu navegador no soporta el video.
                </video>
              ) : (
                <img
                  src={url}
                  alt={file}
                  style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                />
              )}
              <FileName>{file}</FileName>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
}
