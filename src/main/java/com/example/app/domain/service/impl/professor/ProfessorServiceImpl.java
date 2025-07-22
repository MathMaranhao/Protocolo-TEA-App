package com.example.app.domain.service.impl.professor;

import com.example.app.domain.dto.professor.ProfessorDTO;
import com.example.app.domain.model.Professor;
import com.example.app.domain.repository.ProfessoRepository;
import com.example.app.domain.service.ProfessorServiceInterface;
import com.example.app.suport.converter.ProfessorConverterInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfessorServiceImpl implements ProfessorServiceInterface {

    private final ProfessorConverterInterface converter;
    private final ProfessoRepository repository;


    @Override
    public void salvarProfessor(ProfessorDTO professorDTO) {
        Professor professor = converter.converterProfessor(professorDTO);
        this.repository.save(professor);
    }

    @Override
    public ProfessorDTO buscarProfessorCpf(String cpf) {

        Optional<Professor> professor = repository.findByCpfIgnoreCase(cpf);

        return converter.converterProfessorDTO(professor.get());
    }

    @Override
    public List<ProfessorDTO> buscarTodosProfessoresDTOs() {

        List<Professor> professores = repository.findAll();
        return converter.converterListProfessoresDTO(professores);
    }

    @Override
    public void deletarProfessor(String cpf) {

        Optional<Professor> professor = repository.findByCpfIgnoreCase(cpf);

        this.repository.delete(professor.get());

    }
}
