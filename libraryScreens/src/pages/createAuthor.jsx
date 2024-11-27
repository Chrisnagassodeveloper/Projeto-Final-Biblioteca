import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateAuthor = () => {
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/books')
      .then(response => {
        setBooks(response.data._embedded.bookDtoList || []);
      })
      .catch(err => console.error('Erro ao carregar livros:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAuthor = {
      fullName,
      nationality,
      book: selectedBookId ? { id: selectedBookId } : null,
    };
    api.post('/authors', newAuthor)
      .then(() => {
        alert('Autor cadastrado com sucesso!');
        navigate('/authors');
      })
      .catch(err => console.error('Erro ao cadastrar autor:', err));
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
      <h2>Cadastrar Novo Autor</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAuthorName">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do autor"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ marginBottom: '1rem' }} 
          />
        </Form.Group>
        <Form.Group controlId="formAuthorNationality">
          <Form.Label>Nacionalidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a nacionalidade do autor"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
            style={{ marginBottom: '1rem' }} 
          />
        </Form.Group>
        <Form.Group controlId="formAuthorBook">
          <Form.Label>Associar a um Livro</Form.Label>
          <Form.Control
            as="select"
            value={selectedBookId || ''}
            onChange={(e) => setSelectedBookId(e.target.value)}
          >
            <option value="">Nenhum</option>
            {books.map(book => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAuthor;
