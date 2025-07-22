package com.example.app.suport.converter;

import com.example.app.domain.dto.professor.ProfessorDTO;
import com.example.app.domain.dto.supervisor.SupervisorDTO;
import com.example.app.domain.model.Professor;
import com.example.app.domain.model.Supervisor;

import java.util.List;

public interface SupervisorConverterInterface {

    Supervisor converterSupervisor(SupervisorDTO dto);

    SupervisorDTO converterSupervisorDTO(Supervisor entity);

    List<Supervisor> converterListSupervisores(List<SupervisorDTO> supervisoresDTOS);

    List<SupervisorDTO> converterListSupervisoresDTO(List<Supervisor> proferrores);
}
