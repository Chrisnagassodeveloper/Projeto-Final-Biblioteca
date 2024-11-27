import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchAuthors = () => {
    api.get('/authors')
      .then(response => {
        const authorsList = response.data._embedded?.authorDtoList || [];
        setAuthors(authorsList);
        setError(false);
      })
      .catch(err => {
        console.error('Erro ao buscar autores:', err);
        setError(true);
      });
  };

  useEffect(() => {
    fetchAuthors();
  }, [location]);

  const deleteAuthor = (authorId) => {
    api.delete(`/authors/${authorId}`)
      .then(() => {
        alert('Autor excluído com sucesso!');
        fetchAuthors();
      })
      .catch(err => console.error('Erro ao excluir autor:', err));
  };

  const handleCreate = () => {
    navigate('/authors/create');
  };

  const handleEdit = (authorId) => {
    navigate(`/authors/update/${authorId}`);
  };

  return (
    <Container
      style={{
        marginTop: '50px',
        marginLeft: '11%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <h2>Autores</h2>
      {error && <p style={{ color: 'red' }}>Erro ao carregar os dados.</p>}
      <Button variant="success" style={{ marginBottom: '20px' }} onClick={handleCreate}>
        Cadastrar Novo Autor
      </Button>
      <Row>
        {authors.map(author => (
          <Col key={author.id} sm={12} md={6} lg={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>{author.fullName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{author.nationality}</Card.Subtitle>
                {author.book && <Card.Text>Livro: {author.book.title}</Card.Text>}
                <Button variant="primary" onClick={() => handleEdit(author.id)}>
                  Editar
                </Button>
                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => deleteAuthor(author.id)}>
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AuthorsPage;
