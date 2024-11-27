import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        marginTop: '50px',
        marginLeft: '11%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <h1>Bem-vindo à Biblioteca</h1>
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <Card 
            onClick={() => navigate('/books')} 
            style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <Card.Img 
              variant="top" 
              src="/images/livro1.jpg"
              style={{ height: '300px', objectFit: 'cover' }} 
            />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>Livros</Card.Title>
              <Card.Text style={{ textAlign: 'center' }}>
                Clique para gerenciar os livros da biblioteca.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card 
            onClick={() => navigate('/authors')} 
            style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <Card.Img 
              variant="top" 
              src="/images/autor2.jpg"
              style={{ height: '300px', objectFit: 'cover' }} 
            />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>Autores</Card.Title>
              <Card.Text style={{ textAlign: 'center' }}>
                Clique para gerenciar os autores da biblioteca.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
