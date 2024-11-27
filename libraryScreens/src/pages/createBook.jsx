import React, { useState } from 'react';
import api from '../services/api';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, genre };
    api.post('/books', newBook)
      .then(() => {
        alert('Livro cadastrado com sucesso!');
        navigate('/books');
      })
      .catch(err => console.error('Erro ao cadastrar livro:', err));
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
      <h2>Cadastrar Novo Livro</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBookTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o título do livro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginBottom: '1rem' }} 
          />
        </Form.Group>
        <Form.Group controlId="formBookGenre">
          <Form.Label>Gênero</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o gênero do livro"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            style={{ marginBottom: '1rem' }} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBook;
