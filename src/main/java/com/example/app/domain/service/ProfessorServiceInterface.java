package com.example.app.domain.service;

import com.example.app.domain.dto.professor.ProfessorDTO;
import com.example.app.domain.model.Professor;

import java.util.List;

public interface ProfessorServiceInterface {

    void salvarProfessor(ProfessorDTO professorDTO);

    ProfessorDTO buscarProfessorCpf(String cpf);

    List<ProfessorDTO> buscarTodosProfessoresDTOs();

    void deletarProfessor(String cpf);
}
