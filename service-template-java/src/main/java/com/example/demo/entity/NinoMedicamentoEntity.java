package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "nino_medicamento")
public class NinoMedicamentoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNinoMedicamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idNino")
    @JoinColumn(name = "id_nino", nullable = false)
    private NinoEntity nino;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idMedicamento")
    @JoinColumn(name = "id_medicamento", nullable = false)
    private MedicamentoEntity medicamento;

    @Column(name = "dosis")
    private String dosis;

    @Column(name = "frecuencia")
    private String frecuencia;

    @Column(name = "nota")
    private String nota;

    @Column(name = "periodo")
    private String periodo;

}
