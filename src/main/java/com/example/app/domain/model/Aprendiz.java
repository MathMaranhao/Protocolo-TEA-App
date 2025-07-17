package com.example.app.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Table(name = "aprendiz", schema = "aba-projeto")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Aprendiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_preenchimento", nullable = false)
    private LocalDate dataPreenchimento;

    @Column(name = "nome_aprendiz", nullable = false)
    private String nomeAprendiz;

    @Column(name = "cpf", nullable = false)
    private String cpf;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(name = "diagnostico_tea")
    private Boolean diagnosticoTea;

    @Column(name = "idade_diagnostico")
    private Integer idadeDiagnostico;

    @Column(name = "nome_aplicador", nullable = false)
    private String nomeAplicador;

    @Column(name = "nome_entrevistado", nullable = false)
    private String nomeEntrevistado;

    @Column(name = "relacao_aprendiz", nullable = false)
    private String relacaoAprendiz;

    @Column(name = "responsavel_aprendiz", nullable = false)
    private String responsavelAprendiz;

    @Column(name = "convive_diariamente")
    private String conviveDiariamente;

    @Column(name = "irmaos")
    private String irmaos;

    @Column(name = "contato_endereco")
    private String contatoEndereco;

    @Column(name = "contato_telefone")
    private String contatoTelefone;

    @Column(name = "convenio_medico")
    private String convenioMedico;

    @Column(name = "participacao_ed_fisica")
    private String participacaoEdFisica;

    @Column(name = "doencas_disturbios")
    private String doencasDisturbios;

    @Column(name = "qualidade_sono")
    private String qualidadeSono;

    @Column(name = "frequencia_sono")
    private String frequenciaSono;

    @Column(name = "qualidade_alimentacao")
    private String qualidadeAlimentacao;

    @Column(name = "frequencia_alimentacao")
    private String frequenciaAlimentacao;

    @Column(name = "desenvolvimento_comunicacao")
    private String desenvolvimentoComunicacao;

    @Column(name = "desenvolvimento_social")
    private String desenvolvimentoSocial;

    @Column(name = "desenvolvimento_intelectual")
    private String desenvolvimentoIntelectual;

    @Column(name = "desenvolvimento_motor")
    private String desenvolvimentoMotor;

    @Column(name = "linha_tempo_esportes")
    private String linhaTempoEsportes;

    @Column(name = "adaptacoes_necessarias")
    private String adaptacoesNecessarias;

    @Column(name = "gatilhos_comportamentos")
    private String gatilhosComportamentos;

    @Column(name = "estrategias_manejo")
    private String estrategiasManejo;

    @Column(name = "observacoes")
    private String observacoes;

    @Column(name = "duvidas_sugestoes")
    private String duvidasSugestoes;
}
