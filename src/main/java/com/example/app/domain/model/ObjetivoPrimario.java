package com.example.app.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "cod_objetivo_primario", schema = "aba-projeto")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ObjetivoPrimario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cod_objetivo", nullable = false)
    private Integer codObjetivo;

    @Column(name = "descricao", nullable = false, length = 255)
    private String descricao;
}
