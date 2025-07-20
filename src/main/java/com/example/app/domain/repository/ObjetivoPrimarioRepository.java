package com.example.app.domain.repository;

import com.example.app.domain.model.ObjetivoPrimario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ObjetivoPrimarioRepository extends JpaRepository<ObjetivoPrimario, Long> {

    Optional<ObjetivoPrimario> findByCodObjetivo(Integer codObjetivo);
}
