package com.example.app.domain.dto.professor;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfessorDTO {

    private String nome;

    private LocalDateTime dataNascimento;

    private String cpf;

    private String matricula;

}
