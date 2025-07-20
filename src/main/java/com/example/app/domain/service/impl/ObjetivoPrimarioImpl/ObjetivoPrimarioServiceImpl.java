package com.example.app.domain.service.impl.ObjetivoPrimarioImpl;

import com.example.app.domain.dto.objetivo.ObjetivoPrimarioAtualizarDTO;
import com.example.app.domain.dto.objetivo.ObjetivoPrimarioDTO;
import com.example.app.domain.model.ObjetivoPrimario;
import com.example.app.domain.repository.ObjetivoPrimarioRepository;
import com.example.app.domain.service.ObjetivoPrimarioServiceInterface;
import com.example.app.suport.converter.ObjetivoPrimarioConverterInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ObjetivoPrimarioServiceImpl implements ObjetivoPrimarioServiceInterface {

    private final ObjetivoPrimarioConverterInterface converter;
    private final ObjetivoPrimarioRepository repository;


    @Override
    public void salvarObjetivoPrimario(ObjetivoPrimarioDTO objetivoDto) {
        ObjetivoPrimario objetivoPrimario = converter.converterObjetivoPrimario(objetivoDto);
        repository.save(objetivoPrimario);
    }

    @Override
    public void atualizarObjetivoPrimarioAtualizar(ObjetivoPrimarioAtualizarDTO objetivoPrimarioAtualizarDTO, Integer codigo) {
        Optional<ObjetivoPrimario> objetivoPrimario = repository.findByCodObjetivo(codigo);
        objetivoPrimario.get().setCodObjetivo(objetivoPrimarioAtualizarDTO.getCodObjetivo());
        objetivoPrimario.get().setDescricao(objetivoPrimarioAtualizarDTO.getDescricao());

        repository.save(objetivoPrimario.get());
    }

    @Override
    public ObjetivoPrimario bucarObjetivoPrimario(Long id) {
        return repository.getReferenceById(id);
    }

    @Override
    public ObjetivoPrimarioDTO bucarObjetivoPrimarioCodigo(Integer codigo) {

        Optional<ObjetivoPrimario> optionalObjetivoPrimario = repository.findByCodObjetivo(codigo);
        return converter.converterObjetivoPrimarioDTO(optionalObjetivoPrimario.get());
    }

    @Override
    public List<ObjetivoPrimarioDTO> buscarTodosObjetivos() {
        List<ObjetivoPrimario> objetivoPrimarioList = repository.findAll();
        return converter.converterObjetivosPrimariosDTO(objetivoPrimarioList);
    }

    @Override
    public void deletarObjetivo(Integer codigo) {

       Optional<ObjetivoPrimario> objetivoPrimario = repository.findByCodObjetivo(codigo);
        repository.delete(objetivoPrimario.get());
    }
}
