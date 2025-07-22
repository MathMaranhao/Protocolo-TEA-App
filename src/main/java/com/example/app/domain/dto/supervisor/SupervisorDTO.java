package com.example.app.domain.dto.supervisor;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupervisorDTO {

    private String nome;

    private LocalDateTime dataNascimento;

    private String cpf;

    private String matricula;
}
