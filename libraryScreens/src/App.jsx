import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/homePage';
import BooksPage from './pages/booksPage'; // Corrigido para BooksPage
import CreateBook from './pages/createBook';
import EditBook from './pages/editBook';
import AuthorsPage from './pages/authorPage';
import CreateAuthor from './pages/createAuthor';
import EditAuthor from './pages/editAuthor';
import { Container } from 'react-bootstrap';
import TopBar from './components/topbar';
import Sidebar from './components/sidebar';


const App = () => {
  return (
    <Router>
      <div className="app">
        <TopBar />

        <div className="main-content">
          <Sidebar />

          <Container>
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/create" element={<CreateBook />} />
                <Route path="/books/update/:bookId" element={<EditBook />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/authors/create" element={<CreateAuthor />} />
                <Route path="/authors/update/:authorId" element={<EditAuthor />} />
              </Routes>
            </div>
          </Container>
        </div>
      </div>
    </Router>
  );
};

export default App;
