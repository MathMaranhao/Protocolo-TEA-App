package com.example.app.domain.service;

import com.example.app.domain.dto.supervisor.SupervisorDTO;

import java.util.List;

public interface SupervisorServiceInterface {

    void salvarSupervisor(SupervisorDTO supervisorDTO);

    SupervisorDTO buscarSupervisorCPF(String cpf);

    List<SupervisorDTO> listarTodosSupervisore();

    void deletarSupervisor(String cpf);
}
