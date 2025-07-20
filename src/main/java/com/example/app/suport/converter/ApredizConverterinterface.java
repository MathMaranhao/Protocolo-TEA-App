package com.example.app.suport.converter;

import com.example.app.domain.dto.aprendiz.AprendizAtualizarDTO;
import com.example.app.domain.dto.aprendiz.AprendizDTO;
import com.example.app.domain.model.Aprendiz;

import java.util.List;

public interface ApredizConverterinterface {

    Aprendiz converterAprendiz (AprendizDTO dto);

    List<Aprendiz> converterListaAprendiz (List<AprendizDTO> dtos);

    AprendizDTO converterAprendizDTO(Aprendiz aprendiz);

    List<AprendizDTO> converterListaAprendizDTO(List<Aprendiz> aprendizList);

    Aprendiz converterAprendizAtualizar(AprendizAtualizarDTO atualizarDTO, Aprendiz aprendiz);
}
