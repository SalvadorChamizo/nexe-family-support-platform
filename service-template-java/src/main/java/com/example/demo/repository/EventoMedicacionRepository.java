package com.example.demo.repository;

import com.example.demo.entity.EventoMedicacionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoMedicacionRepository extends JpaRepository<EventoMedicacionEntity, Long> {

    List<EventoMedicacionEntity> findByNino_IdNinos(Long idNino);

    List<EventoMedicacionEntity> findByMedicamento_IdMedicamento(Long idMedicamento);
}
