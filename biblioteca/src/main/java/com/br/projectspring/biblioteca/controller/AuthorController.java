package com.br.projectspring.biblioteca.controller;

import com.br.projectspring.biblioteca.dto.AuthorDto;
import com.br.projectspring.biblioteca.exception.CustomExceptionResponse;
import com.br.projectspring.biblioteca.service.AuthorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Authors", description = "Endpoint usado para operações que envolvem Authors")
@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Cria ou cadastra um novo Author (Autor)", tags = {"Author"},responses = {
            @ApiResponse(description = "CREATED", responseCode = "201", content = {@Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = AuthorDto.class)
            )}),
    })
    public ResponseEntity<AuthorDto> create(@RequestBody AuthorDto authorDto){
        AuthorDto author = authorService.create(authorDto);
        return new ResponseEntity<>(author, HttpStatus.CREATED);
    }

    @Operation(summary = "Recuperar um Author (ou Autor) mediante um ID informado", tags = {"Autor"},
            responses = {
                    @ApiResponse(description = "Author recuperado com sucesso!", responseCode = "200", content = {@Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthorDto.class)
                    )}),
                    @ApiResponse(description = "Resource not found", responseCode = "404", content = {@Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomExceptionResponse.class)
                    )})
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<AuthorDto> findById(@PathVariable(name = "id") long id){
        AuthorDto author = authorService.findById(id);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<AuthorDto> update(@RequestBody AuthorDto authorDto){
        AuthorDto authorUpdated = authorService.update(authorDto);
        return new ResponseEntity<>(authorUpdated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable(name = "id") long id){
        authorService.delete(id);
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<org.springframework.data.domain.Page<AuthorDto>> findAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            PagedResourcesAssembler<AuthorDto> assembler
    ){
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "fullName"));
        Page<AuthorDto> authors = authorService.findAll(pageable);
        return new ResponseEntity(assembler.toModel(authors), HttpStatus.OK);

    }

}
