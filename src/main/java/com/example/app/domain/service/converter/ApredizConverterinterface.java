package com.example.app.domain.service.converter;

import com.example.app.domain.dto.AprendizDTO;
import com.example.app.domain.model.Aprendiz;

import java.util.List;

public interface ApredizConverterinterface {

    Aprendiz converterAprendiz (AprendizDTO dto);

    List<Aprendiz> converterListaAprendiz (List<AprendizDTO> dtos);

    AprendizDTO converterAprendizDTO(Aprendiz aprendiz);

    List<AprendizDTO> converterListaAprendizDTO(List<Aprendiz> aprendizList);
}
