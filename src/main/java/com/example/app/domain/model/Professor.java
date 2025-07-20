package com.example.app.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "professor", schema = "aba-projeto")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nome;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDateTime dataNascimento;

    @Column(nullable = false, length = 255, unique = true)
    private String cpf;

    @Column(nullable = false, length = 255, unique = true)
    private String matricula;

}
