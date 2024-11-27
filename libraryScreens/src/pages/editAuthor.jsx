import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditAuthor = () => {
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const { authorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/authors/${authorId}`)
      .then(response => {
        setFullName(response.data.fullName);
        setNationality(response.data.nationality);
        setSelectedBookId(response.data.book ? response.data.book.id : null);
      })
      .catch(err => console.error('Erro ao carregar autor:', err));

    api.get('/books')
      .then(response => {
        setBooks(response.data._embedded.bookDtoList || []);
      })
      .catch(err => console.error('Erro ao carregar livros:', err));
  }, [authorId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAuthor = {
      fullName,
      nationality,
      book: selectedBookId ? { id: selectedBookId } : null, // Atualizar associação com o livro
    };

    api.put(`/authors/${authorId}`, updatedAuthor)
      .then(() => {
        alert('Autor atualizado com sucesso!');
        navigate('/authors');
      })
      .catch(err => {
        console.error('Erro ao atualizar autor:', err);
        alert('Erro ao atualizar o autor.');
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
      <h2>Editar Autor</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAuthorName" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginBottom: '0.5rem' }}>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome completo do autor"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ marginBottom: '1rem' }}
          />
        </Form.Group>
        
        <Form.Group controlId="formAuthorNationality" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginBottom: '0.5rem' }}>Nacionalidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a nacionalidade do autor"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
            style={{ marginBottom: '1rem' }} 
          />
        </Form.Group>
        
        <Form.Group controlId="formAuthorBook" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginBottom: '0.5rem' }}>Associar a um Livro</Form.Label>
          <Form.Control
            as="select"
            value={selectedBookId || ''}
            onChange={(e) => setSelectedBookId(e.target.value)}
            style={{ marginBottom: '1rem' }} 
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
          Atualizar
        </Button>
      </Form>
    </Container>
  );
};

export default EditAuthor;
