package com.example.app.domain.dto;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AprendizDTO {

    private Long id;

    private LocalDate dataPreenchimento;

    private String nomeAprendiz;

    private String cpf;

    private LocalDate dataNascimento;

    private Boolean diagnosticoTea;

    private Integer idadeDiagnostico;

    private String nomeAplicador;

    private String nomeEntrevistado;

    private String relacaoAprendiz;

    private String responsavelAprendiz;

    private String conviveDiariamente;

    private String irmaos;

    private String contatoEndereco;

    private String contatoTelefone;

    private String convenioMedico;

    private String participacaoEdFisica;

    private String doencasDisturbios;

    private String qualidadeSono;

    private String frequenciaSono;

    private String qualidadeAlimentacao;

    private String frequenciaAlimentacao;

    private String desenvolvimentoComunicacao;

    private String desenvolvimentoSocial;

    private String desenvolvimentoIntelectual;

    private String desenvolvimentoMotor;

    private String linhaTempoEsportes;

    private String adaptacoesNecessarias;

    private String gatilhosComportamentos;

    private String estrategiasManejo;

    private String observacoes;

    private String duvidasSugestoes;
}
