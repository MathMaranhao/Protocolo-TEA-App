package com.example.app.domain.repository;

import com.example.app.domain.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessoRepository extends JpaRepository<Professor, Long> {

    Optional<Professor> findByCpfIgnoreCase(String cpf);
}
