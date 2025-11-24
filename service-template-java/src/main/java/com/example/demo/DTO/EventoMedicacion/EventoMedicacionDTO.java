package com.example.demo.DTO.EventoMedicacion;

import com.example.demo.entity.EventStatusEnum;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventoMedicacionDTO {

    private Long idEvento;

    private Long idNino;
    private Long idMedicamento;

    private LocalDate fechaProgramada;
    private LocalTime horaProgramada;
    private LocalDate fechaTomada;
    private LocalTime horaTomada;

    private EventStatusEnum estado;
}
