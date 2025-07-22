package com.example.app.controller;

import com.example.app.domain.dto.supervisor.SupervisorDTO;
import com.example.app.domain.service.SupervisorServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/supervisor")
@RequiredArgsConstructor
public class SupervisorController {

    private final SupervisorServiceInterface service;

    @PostMapping(value = "/salvar")
    public ResponseEntity<Void> salvarSupervisor(@RequestBody SupervisorDTO dto){

        this.service.salvarSupervisor(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping(value = "/buscar")
    public ResponseEntity<SupervisorDTO> buscarSupervisor(@RequestParam("cpf") String cpf){

        SupervisorDTO supervisorDTO = this.service.buscarSupervisorCPF(cpf);
        return ResponseEntity.status(HttpStatus.OK).body(supervisorDTO);
    }

    @GetMapping(value = "/listar")
    public ResponseEntity<Void> buscarTodosSupervisores(){
        this.service.listarTodosSupervisore();
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping(value = "/deletar")
    public ResponseEntity<Void> deletarProfessor(@RequestParam("cpf") String cpf){
        this.service.deletarSupervisor(cpf);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
