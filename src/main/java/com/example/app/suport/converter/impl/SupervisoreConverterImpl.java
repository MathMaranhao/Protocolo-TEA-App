package com.example.app.suport.converter.impl;

import com.example.app.domain.dto.supervisor.SupervisorDTO;
import com.example.app.domain.model.Supervisor;
import com.example.app.suport.converter.SupervisorConverterInterface;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class SupervisoreConverterImpl implements SupervisorConverterInterface {
    @Override
    public Supervisor converterSupervisor(SupervisorDTO dto) {
        return Supervisor.builder()
                .nome(dto.getNome())
                .cpf(dto.getCpf())
                .dataNascimento(dto.getDataNascimento())
                .matricula(dto.getMatricula())
                .build();
    }

    @Override
    public SupervisorDTO converterSupervisorDTO(Supervisor entity) {
        return SupervisorDTO.builder()
                .nome(entity.getNome())
                .matricula(entity.getMatricula())
                .cpf(entity.getCpf())
                .dataNascimento(entity.getDataNascimento())
                .build();
    }

    @Override
    public List<Supervisor> converterListSupervisores(List<SupervisorDTO> supervisoresDTOS) {
        return supervisoresDTOS
                .stream()
                .map(this::converterSupervisor)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public List<SupervisorDTO> converterListSupervisoresDTO(List<Supervisor> proferrores) {
        return proferrores
                .stream()
                .map(this::converterSupervisorDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
