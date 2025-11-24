package com.example.demo.repository;

import com.example.demo.entity.NinoMedicamentoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NinoMedicamentoRepository extends JpaRepository<NinoMedicamentoEntity, Long> {

    List<NinoMedicamentoEntity> findByNino_IdNinos(Long idNino);

    List<NinoMedicamentoEntity> findByMedicamento_IdMedicamento(Long idMedicamento);
}
