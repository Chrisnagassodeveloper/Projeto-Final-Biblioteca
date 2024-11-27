package com.br.projectspring.biblioteca.service;

import com.br.projectspring.biblioteca.dto.AuthorDto;
import com.br.projectspring.biblioteca.exception.ResourceNotFoundException;
import com.br.projectspring.biblioteca.mapper.CustomModelMapper;
import com.br.projectspring.biblioteca.model.AuthorModel;
import com.br.projectspring.biblioteca.model.BookModel;
import com.br.projectspring.biblioteca.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository repository;

    public AuthorDto create(AuthorDto authorDto){
        AuthorModel authorModel = CustomModelMapper.parseObject(authorDto, AuthorModel.class);
        return CustomModelMapper.parseObject(repository.save(authorModel), AuthorDto.class);
    }

    public AuthorDto findById(Long id){
        AuthorModel authorModel = repository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Autor não encontrado!"));
        return CustomModelMapper.parseObject(authorModel, AuthorDto.class);
    }

    public AuthorDto update(AuthorDto authorDto){
        AuthorModel authorModel = repository.findById(authorDto.getId()).orElseThrow(
                ()-> new ResourceNotFoundException("Autor não encontrado!"));
        authorModel.setFullName(authorDto.getFullName());
        authorModel.setNationality(authorDto.getNationality());
        authorModel.setBook(CustomModelMapper.parseObject(authorDto.getBook(), BookModel.class));
        return CustomModelMapper.parseObject(repository.save(authorModel), AuthorDto.class);
    }

    public void delete(long id){
        AuthorModel authorModel = repository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Autor não encontrado!"));
        repository.delete(authorModel);
    }

    public Page<AuthorDto> findAll(Pageable pageable){
        var authors = repository.findAll(pageable);
        return authors.map( c -> CustomModelMapper.parseObject(c, AuthorDto.class));
    }
}
