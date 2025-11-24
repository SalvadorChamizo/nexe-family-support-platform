package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "evento_medicacion")
public class MedicationEventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Long idEvento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_nino", nullable = false)
    private KidEntity nino;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_medicamento", nullable = false)
    private MedicationEntity medicamento;

    @Column(name = "fecha_programada", nullable = false)
    private LocalDate fechaProgramada;

    @Column(name = "hora_programada", nullable = false)
    private LocalTime horaProgramada;

    @Column(name = "fecha_tomada", nullable = true)
    private LocalDate fechaTomada;

    @Column(name = "hora_tomada", nullable = true)
    private LocalTime horaTomada;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EventStatusEnum estado;

}

