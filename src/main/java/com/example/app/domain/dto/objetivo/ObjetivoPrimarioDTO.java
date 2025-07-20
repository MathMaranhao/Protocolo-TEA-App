package com.example.app.domain.dto.objetivo;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ObjetivoPrimarioDTO {

    private Long id;

    private Integer codObjetivo;

    private String descricao;
}
