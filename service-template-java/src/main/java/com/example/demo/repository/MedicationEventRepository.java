package com.example.demo.repository;

import com.example.demo.entity.MedicationEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicationEventRepository extends JpaRepository<MedicationEventEntity, Long> {

    List<MedicationEventEntity> findByNino_IdNinos(Long idNino);

    List<MedicationEventEntity> findByMedicamento_IdMedicamento(Long idMedicamento);
}
