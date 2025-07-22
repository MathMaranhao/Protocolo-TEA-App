package com.example.app.controller;

import com.example.app.domain.dto.professor.ProfessorDTO;
import com.example.app.domain.service.ProfessorServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/professor")
@RequiredArgsConstructor
public class ProfessorController {

    private final ProfessorServiceInterface service;

    @PostMapping(value = "/salvar")
    public ResponseEntity<Void> salvarProfessor(@RequestBody ProfessorDTO professorDTO){
        this.service.salvarProfessor(professorDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping(value = "/buscar")
    public ResponseEntity<ProfessorDTO> buscarProfessor(@RequestParam("cpf") String codigo){
        ProfessorDTO professorDTO = this.service.buscarProfessorCpf(codigo);
        return ResponseEntity.status(HttpStatus.OK).body(professorDTO);
    }

    @GetMapping(value = "/listar")
    public ResponseEntity<List<ProfessorDTO>> buscarTodosProfessores(){
        List<ProfessorDTO> professorDTOList = this.service.buscarTodosProfessoresDTOs();
        return ResponseEntity.status(HttpStatus.OK).body(professorDTOList);
    }

    @DeleteMapping(value = "/deletar")
    public ResponseEntity<Void> deletarProfessor(@RequestParam("cpf") String cpf){
        this.service.deletarProfessor(cpf);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
