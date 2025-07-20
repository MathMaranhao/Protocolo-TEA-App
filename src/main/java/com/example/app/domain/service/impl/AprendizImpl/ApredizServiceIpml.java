package com.example.app.domain.service.impl.AprendizImpl;

import com.example.app.domain.dto.aprendiz.AprendizAtualizarDTO;
import com.example.app.domain.dto.aprendiz.AprendizDTO;
import com.example.app.domain.model.Aprendiz;
import com.example.app.domain.repository.ApredizRepository;
import com.example.app.domain.service.ApredizServiceInterface;
import com.example.app.suport.converter.ApredizConverterinterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApredizServiceIpml implements ApredizServiceInterface {

    private final ApredizConverterinterface converter;
    private final ApredizRepository repository;

    @Override
    public void salvarAprediz(AprendizDTO apredizDTO) {
        Aprendiz aprendiz = converter.converterAprendiz(apredizDTO);
        repository.save(aprendiz);

    }

    @Override
    public void atualizarAprendiz(AprendizAtualizarDTO atualizarDTO, String cpf) {
        Optional<Aprendiz> buscarAprendiz = repository.findByCpfIgnoreCase(cpf);
         this.repository.save(converter.converterAprendizAtualizar(atualizarDTO, buscarAprendiz.get()));
    }

    @Override
    public Aprendiz buscarAprendiz(Long id) {
        return repository.getReferenceById(id);
    }

    @Override
    public AprendizDTO buscarAprendizCPF(String cpf) {

        Optional<Aprendiz> aprendiz = repository.findByCpfIgnoreCase(cpf);

        return converter.converterAprendizDTO(aprendiz.get());
    }

    @Override
    public List<AprendizDTO> listarTodosAprendizDTO() {

        List<Aprendiz> listaAprendiz = repository.findAll();

        return converter.converterListaAprendizDTO(listaAprendiz);
    }

    @Override
    public void deletarAprendiz(Long id) {
        this.repository.deleteById(id);
    }


}
