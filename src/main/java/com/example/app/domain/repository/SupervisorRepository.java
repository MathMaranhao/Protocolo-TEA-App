package com.example.app.domain.repository;

import com.example.app.domain.model.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SupervisorRepository extends JpaRepository<Supervisor, Long> {

    Optional<Supervisor> findByCpfIgnoreCase(String cpf);
}
