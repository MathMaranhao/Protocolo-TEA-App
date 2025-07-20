package com.example.app.suport.converter.impl;

import com.example.app.domain.dto.aprendiz.AprendizAtualizarDTO;
import com.example.app.domain.dto.aprendiz.AprendizDTO;
import com.example.app.domain.model.Aprendiz;
import com.example.app.suport.converter.ApredizConverterinterface;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class AprendizConverterImpl implements ApredizConverterinterface {

    @Override
    public Aprendiz converterAprendiz(AprendizDTO dto) {
        return Aprendiz.builder()
                .id(dto.getId())
                .dataPreenchimento(dto.getDataPreenchimento())
                .nomeAprendiz(dto.getNomeAprendiz())
                .dataNascimento(dto.getDataNascimento())
                .cpf(dto.getCpf())
                .diagnosticoTea(dto.getDiagnosticoTea())
                .idadeDiagnostico(dto.getIdadeDiagnostico())
                .nomeAplicador(dto.getNomeAplicador())
                .nomeEntrevistado(dto.getNomeEntrevistado())
                .relacaoAprendiz(dto.getRelacaoAprendiz())
                .responsavelAprendiz(dto.getResponsavelAprendiz())
                .conviveDiariamente(dto.getConviveDiariamente())
                .irmaos(dto.getIrmaos())
                .contatoEndereco(dto.getContatoEndereco())
                .convenioMedico(dto.getConvenioMedico())
                .adaptacoesNecessarias(dto.getAdaptacoesNecessarias())
                .contatoTelefone(dto.getContatoTelefone())
                .desenvolvimentoComunicacao(dto.getDesenvolvimentoComunicacao())
                .desenvolvimentoIntelectual(dto.getDesenvolvimentoIntelectual())
                .desenvolvimentoMotor(dto.getDesenvolvimentoMotor())
                .desenvolvimentoSocial(dto.getDesenvolvimentoSocial())
                .doencasDisturbios(dto.getDoencasDisturbios())
                .duvidasSugestoes(dto.getDuvidasSugestoes())
                .estrategiasManejo(dto.getEstrategiasManejo())
                .frequenciaAlimentacao(dto.getFrequenciaAlimentacao())
                .frequenciaSono(dto.getFrequenciaSono())
                .gatilhosComportamentos(dto.getGatilhosComportamentos())
                .linhaTempoEsportes(dto.getLinhaTempoEsportes())
                .qualidadeAlimentacao(dto.getQualidadeAlimentacao())
                .participacaoEdFisica(dto.getParticipacaoEdFisica())
                .observacoes(dto.getObservacoes())
                .build();
    }

    @Override
    public List<Aprendiz> converterListaAprendiz(List<AprendizDTO> dtos) {
        return dtos
                .stream()
                .map(this::converterAprendiz)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public AprendizDTO converterAprendizDTO(Aprendiz aprendiz){
        return  AprendizDTO.builder()
                .id(aprendiz.getId())
                .dataPreenchimento(aprendiz.getDataPreenchimento())
                .nomeAprendiz(aprendiz.getNomeAprendiz())
                .dataNascimento(aprendiz.getDataNascimento())
                .cpf(aprendiz.getCpf())
                .diagnosticoTea(aprendiz.getDiagnosticoTea())
                .idadeDiagnostico(aprendiz.getIdadeDiagnostico())
                .nomeAplicador(aprendiz.getNomeAplicador())
                .nomeEntrevistado(aprendiz.getNomeEntrevistado())
                .relacaoAprendiz(aprendiz.getRelacaoAprendiz())
                .responsavelAprendiz(aprendiz.getResponsavelAprendiz())
                .conviveDiariamente(aprendiz.getConviveDiariamente())
                .irmaos(aprendiz.getIrmaos())
                .contatoEndereco(aprendiz.getContatoEndereco())
                .convenioMedico(aprendiz.getConvenioMedico())
                .adaptacoesNecessarias(aprendiz.getAdaptacoesNecessarias())
                .contatoTelefone(aprendiz.getContatoTelefone())
                .desenvolvimentoComunicacao(aprendiz.getDesenvolvimentoComunicacao())
                .desenvolvimentoIntelectual(aprendiz.getDesenvolvimentoIntelectual())
                .desenvolvimentoMotor(aprendiz.getDesenvolvimentoMotor())
                .desenvolvimentoSocial(aprendiz.getDesenvolvimentoSocial())
                .doencasDisturbios(aprendiz.getDoencasDisturbios())
                .duvidasSugestoes(aprendiz.getDuvidasSugestoes())
                .estrategiasManejo(aprendiz.getEstrategiasManejo())
                .frequenciaAlimentacao(aprendiz.getFrequenciaAlimentacao())
                .frequenciaSono(aprendiz.getFrequenciaSono())
                .gatilhosComportamentos(aprendiz.getGatilhosComportamentos())
                .linhaTempoEsportes(aprendiz.getLinhaTempoEsportes())
                .qualidadeAlimentacao(aprendiz.getQualidadeAlimentacao())
                .participacaoEdFisica(aprendiz.getParticipacaoEdFisica())
                .observacoes(aprendiz.getObservacoes())
                .build();
    }

    public List<AprendizDTO> converterListaAprendizDTO(List<Aprendiz> aprendizList){

        return aprendizList
                .stream()
                .map(this::converterAprendizDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public Aprendiz converterAprendizAtualizar(AprendizAtualizarDTO atualizarDTO, Aprendiz aprendiz) {

        aprendiz.setContatoTelefone(atualizarDTO.getContatoTelefone());
        aprendiz.setContatoEndereco(atualizarDTO.getContatoEndereco());
        aprendiz.setConvenioMedico(atualizarDTO.getConvenioMedico());
        aprendiz.setParticipacaoEdFisica(atualizarDTO.getParticipacaoEdFisica());
        aprendiz.setDoencasDisturbios(atualizarDTO.getDoencasDisturbios());
        aprendiz.setQualidadeSono(atualizarDTO.getQualidadeSono());
        aprendiz.setFrequenciaSono(atualizarDTO.getFrequenciaSono());
        aprendiz.setQualidadeAlimentacao(atualizarDTO.getQualidadeAlimentacao());
        aprendiz.setFrequenciaAlimentacao(atualizarDTO.getFrequenciaAlimentacao());
        aprendiz.setDesenvolvimentoComunicacao(atualizarDTO.getDesenvolvimentoComunicacao());
        aprendiz.setDesenvolvimentoSocial(atualizarDTO.getDesenvolvimentoSocial());
        aprendiz.setDesenvolvimentoIntelectual(atualizarDTO.getDesenvolvimentoIntelectual());
        aprendiz.setDesenvolvimentoMotor(atualizarDTO.getDesenvolvimentoMotor());
        aprendiz.setLinhaTempoEsportes(atualizarDTO.getLinhaTempoEsportes());
        aprendiz.setAdaptacoesNecessarias(atualizarDTO.getAdaptacoesNecessarias());
        aprendiz.setGatilhosComportamentos(atualizarDTO.getGatilhosComportamentos());
        aprendiz.setEstrategiasManejo(atualizarDTO.getEstrategiasManejo());
        aprendiz.setObservacoes(atualizarDTO.getObservacoes());

        return aprendiz;
    }
}
