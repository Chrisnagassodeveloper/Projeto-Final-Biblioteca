package com.br.projectspring.biblioteca.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthorDto extends RepresentationModel<AuthorDto> {

    private long id;
    private String fullName;
    private String nationality;
    private BookDto book;


}
