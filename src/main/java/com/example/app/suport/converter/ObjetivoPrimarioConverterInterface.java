package com.example.app.suport.converter;

import com.example.app.domain.dto.objetivo.ObjetivoPrimarioDTO;
import com.example.app.domain.model.ObjetivoPrimario;
import java.util.List;

public interface ObjetivoPrimarioConverterInterface {

    ObjetivoPrimario converterObjetivoPrimario(ObjetivoPrimarioDTO dto);

    ObjetivoPrimarioDTO converterObjetivoPrimarioDTO(ObjetivoPrimario entity);

    List<ObjetivoPrimario> converterObjetivosPrimarios(List<ObjetivoPrimarioDTO> dtos);

    List<ObjetivoPrimarioDTO> converterObjetivosPrimariosDTO(List<ObjetivoPrimario> entitys);
}
