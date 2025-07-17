package com.example.app.controller;

import com.example.app.domain.dto.AprendizAtualizarDTO;
import com.example.app.domain.dto.AprendizDTO;
import com.example.app.domain.service.ApredizServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AprendizController {

    private final ApredizServiceInterface service;

    @PostMapping(value = "/salvar")
    public ResponseEntity<Void> salvar(@RequestBody AprendizDTO dto){
        this.service.salvarAprediz(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping(value = "/atualizar")
    public ResponseEntity<Void> atualizar(@RequestBody AprendizAtualizarDTO atualizarDTO, @RequestParam("id") Long id){
        this.service.atualizarAprendiz(atualizarDTO, id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(value = "/buscar")
    public ResponseEntity<AprendizDTO> buscarAprendizCPF(@RequestParam("cpf") String cpf){
        AprendizDTO aprendizDTO = this.service.buscarAprendizCPF(cpf);
        return ResponseEntity.status(HttpStatus.OK).body(aprendizDTO);
    }

    @GetMapping(value = "/buscartodos")
    public ResponseEntity<List<AprendizDTO>> listarApredizes(){
        List<AprendizDTO> aprendizDTOList = this.service.listarTodosAprendizDTO();
        return ResponseEntity.status(HttpStatus.OK).body(aprendizDTOList);
    }

    @DeleteMapping(value = "/deletar")
    public ResponseEntity<Void> deletarAprendiz(@RequestParam("id") Long id){
        this.service.deletarAprendiz(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
