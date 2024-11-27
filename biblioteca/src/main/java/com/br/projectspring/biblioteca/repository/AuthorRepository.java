package com.br.projectspring.biblioteca.repository;

import com.br.projectspring.biblioteca.model.AuthorModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<AuthorModel, Long>{

    public Page<AuthorModel> findAll(Pageable pageable);

}
