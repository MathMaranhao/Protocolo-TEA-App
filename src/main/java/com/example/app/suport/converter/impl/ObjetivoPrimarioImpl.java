package com.example.app.suport.converter.impl;

import com.example.app.domain.dto.objetivo.ObjetivoPrimarioDTO;
import com.example.app.domain.model.ObjetivoPrimario;
import com.example.app.suport.converter.ObjetivoPrimarioConverterInterface;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class ObjetivoPrimarioImpl implements ObjetivoPrimarioConverterInterface {
    @Override
    public ObjetivoPrimario converterObjetivoPrimario(ObjetivoPrimarioDTO dto) {
        return ObjetivoPrimario.builder()
                .id(dto.getId())
                .codObjetivo(dto.getCodObjetivo())
                .descricao(dto.getDescricao())
                .build();
    }

    @Override
    public ObjetivoPrimarioDTO converterObjetivoPrimarioDTO(ObjetivoPrimario entity) {
        return ObjetivoPrimarioDTO.builder()
                .id(entity.getId())
                .codObjetivo(entity.getCodObjetivo())
                .descricao(entity.getDescricao())
                .build();
    }

    @Override
    public List<ObjetivoPrimario> converterObjetivosPrimarios(List<ObjetivoPrimarioDTO> dtos) {
        return dtos
                .stream()
                .map(this::converterObjetivoPrimario)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public List<ObjetivoPrimarioDTO> converterObjetivosPrimariosDTO(List<ObjetivoPrimario> entitys) {
        return entitys
                .stream()
                .map(this::converterObjetivoPrimarioDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
