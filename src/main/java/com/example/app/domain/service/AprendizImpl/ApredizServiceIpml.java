package com.example.app.domain.service.AprendizImpl;

import com.example.app.domain.dto.AprendizAtualizarDTO;
import com.example.app.domain.dto.AprendizDTO;
import com.example.app.domain.model.Aprendiz;
import com.example.app.domain.repository.ApredizRepository;
import com.example.app.domain.service.ApredizServiceInterface;
import com.example.app.domain.service.converter.ApredizConverterinterface;
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
    public void atualizarAprendiz(AprendizAtualizarDTO atualizarDTO, Long id) {
        Aprendiz buscarAprendiz = this.buscarAprendiz(id);
        buscarAprendiz.setContatoTelefone(atualizarDTO.getContatoTelefone());
        buscarAprendiz.setContatoEndereco(atualizarDTO.getContatoEndereco());
        buscarAprendiz.setConvenioMedico(atualizarDTO.getConvenioMedico());
        buscarAprendiz.setParticipacaoEdFisica(atualizarDTO.getParticipacaoEdFisica());
        buscarAprendiz.setDoencasDisturbios(atualizarDTO.getDoencasDisturbios());
        buscarAprendiz.setQualidadeSono(atualizarDTO.getQualidadeSono());
        buscarAprendiz.setFrequenciaSono(atualizarDTO.getFrequenciaSono());
        buscarAprendiz.setQualidadeAlimentacao(atualizarDTO.getQualidadeAlimentacao());
        buscarAprendiz.setFrequenciaAlimentacao(atualizarDTO.getFrequenciaAlimentacao());
        buscarAprendiz.setDesenvolvimentoComunicacao(atualizarDTO.getDesenvolvimentoComunicacao());
        buscarAprendiz.setDesenvolvimentoSocial(atualizarDTO.getDesenvolvimentoSocial());
        buscarAprendiz.setDesenvolvimentoIntelectual(atualizarDTO.getDesenvolvimentoIntelectual());
        buscarAprendiz.setDesenvolvimentoMotor(atualizarDTO.getDesenvolvimentoMotor());
        buscarAprendiz.setLinhaTempoEsportes(atualizarDTO.getLinhaTempoEsportes());
        buscarAprendiz.setAdaptacoesNecessarias(atualizarDTO.getAdaptacoesNecessarias());
        buscarAprendiz.setGatilhosComportamentos(atualizarDTO.getGatilhosComportamentos());
        buscarAprendiz.setEstrategiasManejo(atualizarDTO.getEstrategiasManejo());
        buscarAprendiz.setObservacoes(atualizarDTO.getObservacoes());

         this.repository.save(buscarAprendiz);
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
