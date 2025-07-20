package com.example.app.domain.service;

import com.example.app.domain.dto.aprendiz.AprendizAtualizarDTO;
import com.example.app.domain.dto.aprendiz.AprendizDTO;
import com.example.app.domain.model.Aprendiz;

import java.util.List;

public interface ApredizServiceInterface {

    void salvarAprediz (AprendizDTO apredizDTO);

    void atualizarAprendiz(AprendizAtualizarDTO atualizarDTO, String cpf);

    Aprendiz buscarAprendiz(Long id);

    AprendizDTO buscarAprendizCPF(String cpf);

    List<AprendizDTO> listarTodosAprendizDTO();

    void deletarAprendiz(Long id);

}
