package com.br.projectspring.biblioteca.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "authors")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name ="fullname", length = 50, nullable = false)
    private String fullName;

    @Column(name ="nationality", length = 50, nullable = false)
    private String nationality;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private BookModel book;
}
