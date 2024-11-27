package com.br.projectspring.biblioteca.controller;

import com.br.projectspring.biblioteca.dto.BookDto;
import com.br.projectspring.biblioteca.model.BookModel;
import com.br.projectspring.biblioteca.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.LinkRelation;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/books")
public class BookController {

    @Autowired
    private BookService service;

    @PostMapping
    public ResponseEntity<BookDto> create(@RequestBody BookDto bookDto){
        BookDto book = service.create(bookDto);
        return new ResponseEntity<>(book, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> findById(@PathVariable(name = "id") long id){
        BookDto book = service.findById(id);
        this.buildSelfLink(book);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<BookDto> update(@RequestBody BookDto bookDto){
        BookDto book = service.update(bookDto);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(name = "id") long id){
        service.delete(id);
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<CollectionModel<BookDto>> findAll(){
        CollectionModel<BookDto> books  = CollectionModel.of(service.findAll());
        for(BookDto book : books){
            buildSelfLink(book);
        }
        this.buildCollectionLink(books);
        return new ResponseEntity<CollectionModel<BookDto>>(books, HttpStatus.OK);
    }

    @GetMapping("/find/title/{title}")
    public ResponseEntity<List<BookDto>> findByTitle(@PathVariable(name = "title") String title){
        var books = service.findByTitle(title);
        return new ResponseEntity<List<BookDto>>(books, HttpStatus.OK);
    }

    @GetMapping("/find/genre/{genre}")
    public ResponseEntity<List<BookDto>> findByGenre(@PathVariable(name = "genre") String genre){
        var books = service.findByGenre(genre);
        return new ResponseEntity<List<BookDto>>(books, HttpStatus.OK);
    }

    private void buildSelfLink(BookDto bookDto){
        bookDto.add(
                WebMvcLinkBuilder.linkTo(
                        WebMvcLinkBuilder.methodOn(
                                this.getClass()).findById(bookDto.getId())
                        ).withSelfRel()
                );

    }

    public void buildCollectionLink(CollectionModel<BookDto> books){
        books.add(
                WebMvcLinkBuilder.linkTo(
                        WebMvcLinkBuilder.methodOn(
                                this.getClass()).findAll()
                ).withRel(LinkRelation.of("COLLECTION"))
        );
    }




}
