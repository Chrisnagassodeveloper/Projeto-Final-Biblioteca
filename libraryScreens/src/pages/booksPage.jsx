import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/books')
      .then(response => {
        setBooks(response.data._embedded.bookDtoList);
      })
      .catch(err => {
        console.error('Erro ao buscar livros:', err);
        setError(true);
      });
  }, []);

  const deleteBook = (bookId) => {
    api.delete(`/books/${bookId}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== bookId));
        alert('Livro excluído com sucesso!');
      })
      .catch(err => console.error('Erro ao excluir livro:', err));
  };

  const handleEdit = (bookId) => {

    navigate(`/books/update/${bookId}`);
  };

  const handleCreate = () => {
    navigate('/books/create');
  };

  return (
    <Container style={{ marginTop: '50px', marginLeft: '11%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2>Livros</h2>
      {error && <p style={{ color: 'red' }}>Erro ao carregar os dados.</p>}
      <Button variant="success" style={{ marginBottom: '20px' }} onClick={handleCreate}>Cadastrar Novo Livro</Button>
      <Row>
        {books.map(book => (
          <Col key={book.id} sm={12} md={6} lg={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.genre}</Card.Subtitle>
                <Button variant="primary" onClick={() => handleEdit(book.id)}>Editar</Button>
                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => deleteBook(book.id)}>
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

export default BooksPage;
