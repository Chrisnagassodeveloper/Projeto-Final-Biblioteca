package com.br.projectspring.biblioteca.repository;

import com.br.projectspring.biblioteca.model.BookModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<BookModel, Long> {

    public List<BookModel> findByTitleContainsIgnoreCaseOrderByTitle(String title);

    public List<BookModel> findByGenreEqualsIgnoreCaseOrderByGenreAscTitleAsc(String genre);
}
