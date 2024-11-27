package com.br.projectspring.biblioteca.service;

import com.br.projectspring.biblioteca.dto.BookDto;
import com.br.projectspring.biblioteca.exception.ResourceNotFoundException;
import com.br.projectspring.biblioteca.mapper.CustomModelMapper;
import com.br.projectspring.biblioteca.model.BookModel;
import com.br.projectspring.biblioteca.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    public BookDto create(BookDto bookDto){
        BookModel book = CustomModelMapper.parseObject(bookDto, BookModel.class);
        return CustomModelMapper.parseObject(repository.save(book), BookDto.class);
    }

    public BookDto findById(long id){
        BookModel found = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Livro não encontrado!")
        );
        return CustomModelMapper.parseObject(found, BookDto.class);
    }

    public BookDto update(BookDto bookDto){
        BookModel found = repository.findById(bookDto.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Livro não encontrado!"));
        found.setTitle(bookDto.getTitle());
        found.setGenre(bookDto.getGenre());
        return CustomModelMapper.parseObject(repository.save(found), BookDto.class);
    }

    public void delete(long id){
        BookModel found = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Livro não encontrado!"));
        repository.delete(found);
    }

    public List<BookDto> findAll(){
        var list = repository.findAll();
        return CustomModelMapper.parseObjectList(list, BookDto.class);
    }

    public List<BookDto> findByTitle(String title){
        var books = repository.findByTitleContainsIgnoreCaseOrderByTitle(title);
        return CustomModelMapper.parseObjectList(books, BookDto.class);
    }

    public List<BookDto> findByGenre(String genre){
        var books = repository.findByGenreEqualsIgnoreCaseOrderByGenreAscTitleAsc(genre);
        return CustomModelMapper.parseObjectList(books, BookDto.class);
    }

}
