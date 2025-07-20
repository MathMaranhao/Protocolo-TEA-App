package com.example.app.controller;

import com.example.app.domain.dto.objetivo.ObjetivoPrimarioAtualizarDTO;
import com.example.app.domain.dto.objetivo.ObjetivoPrimarioDTO;
import com.example.app.domain.service.ObjetivoPrimarioServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ObjetivoPrimarioController {

    private final ObjetivoPrimarioServiceInterface service;

    @PostMapping(value = "/objetivo/salvar")
    public ResponseEntity<Void> salvarobjetivo(@RequestBody ObjetivoPrimarioDTO dto){
        this.service.salvarObjetivoPrimario(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping(value = "/objetivo/atualizar")
    public ResponseEntity<Void> atualizar(@RequestBody ObjetivoPrimarioAtualizarDTO atualizarDTO,
                                          @RequestParam("codigo") Integer codigo){
        this.service.atualizarObjetivoPrimarioAtualizar(atualizarDTO, codigo);
        return ResponseEntity.status((HttpStatus.OK)).build();
    }

    @GetMapping(value = "/objetivo/buscar")
    public ResponseEntity<ObjetivoPrimarioDTO> buscarObjetivoCodigo(@RequestParam("codigo") Integer codigo){
        ObjetivoPrimarioDTO objetivoPrimarioDTO = this.service.bucarObjetivoPrimarioCodigo(codigo);
        return ResponseEntity.status(HttpStatus.OK).body(objetivoPrimarioDTO);
    }

    @GetMapping(value = "/objetivo/buscarTodos")
    public ResponseEntity<List<ObjetivoPrimarioDTO>> buscarTodosObjetivos(){
        List<ObjetivoPrimarioDTO> objetivoPrimarioDTOList = this.service.buscarTodosObjetivos();
        return ResponseEntity.status(HttpStatus.OK).body(objetivoPrimarioDTOList);
    }

    @DeleteMapping(value = "/objetivo/deletar")
    public ResponseEntity<Void> deletarObjetivo(@RequestParam("codigo") Integer codigo){
        this.service.deletarObjetivo(codigo);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
