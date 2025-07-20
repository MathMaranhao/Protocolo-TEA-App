package com.example.app.domain.dto.objetivo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ObjetivoPrimarioAtualizarDTO {

    private Integer codObjetivo;

    private String descricao;
}
