package com.example.app.suport.converter.impl;

import com.example.app.domain.dto.professor.ProfessorDTO;
import com.example.app.domain.model.Professor;
import com.example.app.suport.converter.ProfessorConverterInterface;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class ProfessorConverterImpl implements ProfessorConverterInterface {
    @Override
    public Professor converterProfessor(ProfessorDTO dto) {
        return Professor.builder()
                .nome(dto.getNome())
                .cpf(dto.getCpf())
                .dataNascimento(dto.getDataNascimento())
                .matricula(dto.getMatricula())
                .build();
    }

    @Override
    public ProfessorDTO converterProfessorDTO(Professor entity) {
        return ProfessorDTO.builder()
                .nome(entity.getNome())
                .matricula(entity.getMatricula())
                .cpf(entity.getCpf())
                .dataNascimento(entity.getDataNascimento())
                .build();
    }

    @Override
    public List<Professor> converterListProfessores(List<ProfessorDTO> professorDTOS) {
        return professorDTOS
                .stream()
                .map(this::converterProfessor)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProfessorDTO> converterListProfessoresDTO(List<Professor> proferrores) {
        return proferrores
                .stream()
                .map(this::converterProfessorDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
