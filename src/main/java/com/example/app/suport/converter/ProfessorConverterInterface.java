package com.example.app.suport.converter;

import com.example.app.domain.dto.professor.ProfessorDTO;
import com.example.app.domain.model.Professor;

import java.util.List;

public interface ProfessorConverterInterface {

    Professor converterProfessor(ProfessorDTO dto);

    ProfessorDTO converterProfessorDTO(Professor entity);

    List<Professor> converterListProfessores(List<ProfessorDTO> professorDTOS);

    List<ProfessorDTO> converterListProfessoresDTO(List<Professor> proferrores);
}
