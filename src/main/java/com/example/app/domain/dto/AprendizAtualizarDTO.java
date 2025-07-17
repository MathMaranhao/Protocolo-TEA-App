package com.example.app.domain.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AprendizAtualizarDTO {
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
}
