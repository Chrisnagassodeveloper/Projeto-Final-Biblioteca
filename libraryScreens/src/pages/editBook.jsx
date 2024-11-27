import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${bookId}`)
      .then(response => {
        setTitle(response.data.title);
        setGenre(response.data.genre);
      })
      .catch(err => {
        alert('Erro ao carregar o livro para edição.');
      });
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = { title, genre };

    api.put(`/books/${bookId}`, updatedBook)
      .then(response => {
        alert('Livro atualizado com sucesso!');
        navigate('/books');
      })
      .catch(err => {
        alert('Erro ao atualizar o livro.');
      });
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
      <h2>Editar Livro</h2>
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
          Atualizar
        </Button>
      </Form>
    </Container>
  );
};

export default EditBook;
