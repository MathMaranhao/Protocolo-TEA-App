package com.example.app.domain.service;

import com.example.app.domain.dto.objetivo.ObjetivoPrimarioAtualizarDTO;
import com.example.app.domain.dto.objetivo.ObjetivoPrimarioDTO;
import com.example.app.domain.model.ObjetivoPrimario;

import java.util.List;

public interface ObjetivoPrimarioServiceInterface {

    void salvarObjetivoPrimario(ObjetivoPrimarioDTO objetivoDto);

    void atualizarObjetivoPrimarioAtualizar(ObjetivoPrimarioAtualizarDTO objetivoPrimarioAtualizarDTO, Integer codigo);

    ObjetivoPrimario bucarObjetivoPrimario (Long id);

    ObjetivoPrimarioDTO bucarObjetivoPrimarioCodigo(Integer codigo);

    List<ObjetivoPrimarioDTO> buscarTodosObjetivos();

    void deletarObjetivo(Integer codigo);
}
