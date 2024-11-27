package com.br.projectspring.biblioteca.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookDto extends RepresentationModel<BookDto> {

    private long id;
    private String title;
    private String genre;

}
