package com.example.app.domain.repository;

import com.example.app.domain.model.Aprendiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApredizRepository extends JpaRepository<Aprendiz, Long> {
    Optional<Aprendiz> findByCpfIgnoreCase(String cpf);
}
