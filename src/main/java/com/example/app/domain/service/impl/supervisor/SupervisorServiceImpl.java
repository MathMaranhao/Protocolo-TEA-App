package com.example.app.domain.service.impl.supervisor;

import com.example.app.domain.dto.supervisor.SupervisorDTO;
import com.example.app.domain.model.Supervisor;
import com.example.app.domain.repository.SupervisorRepository;
import com.example.app.domain.service.SupervisorServiceInterface;
import com.example.app.suport.converter.SupervisorConverterInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SupervisorServiceImpl implements SupervisorServiceInterface {

    private final SupervisorRepository repository;
    private final SupervisorConverterInterface converter;

    @Override
    public void salvarSupervisor(SupervisorDTO supervisorDTO) {
        Supervisor supervisor = converter.converterSupervisor(supervisorDTO);
        this.repository.save(supervisor);
    }

    @Override
    public SupervisorDTO buscarSupervisorCPF(String cpf) {

        Optional<Supervisor> supervisor = this.repository.findByCpfIgnoreCase(cpf);
        return this.converter.converterSupervisorDTO(supervisor.get());
    }

    @Override
    public List<SupervisorDTO> listarTodosSupervisore() {

        List<Supervisor> supervisorList = this.repository.findAll();
        return converter.converterListSupervisoresDTO(supervisorList);
    }

    @Override
    public void deletarSupervisor(String cpf) {

        Optional<Supervisor> supervisor = this.repository.findByCpfIgnoreCase(cpf);
        this.repository.delete(supervisor.get());
    }
}
