package com.example.demo.repository;

import com.example.demo.entity.KidMedicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KidMedicationRepository extends JpaRepository<KidMedicationEntity, Long> {

    List<KidMedicationEntity> findByNino_IdNinos(Long idNino);

    List<KidMedicationEntity> findByMedicamento_IdMedicamento(Long idMedicamento);
}
