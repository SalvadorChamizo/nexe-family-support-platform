package com.example.demo.DTO.NinoMedicamento;

import lombok.Data;

@Data
public class NinoMedicamentoDTO {

    private Long idNinoMedicamento;

    private Long idNino;
    private Long idMedicamento;

    private String dosis;
    private String frecuencia;
    private String nota;
    private String periodo;
}
