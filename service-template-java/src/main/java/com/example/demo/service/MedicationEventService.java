package com.example.demo.service;

import com.example.demo.entity.EventStatusEnum;
import com.example.demo.entity.MedicationEventEntity;
import com.example.demo.repository.MedicationEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class MedicationEventService {
    private final MedicationEventRepository repository;

    public MedicationEventService(MedicationEventRepository repository){
        this.repository = repository;
    }

    public List<MedicationEventEntity> getAll() {
        return repository.findAll();
    }

    public Optional<MedicationEventEntity> getById(Long id) {
        return repository.findById(id);
    }

    public List<MedicationEventEntity> getByNino(Long idNino) {
        return repository.findByNino_IdNinos(idNino);
    }

    public List<MedicationEventEntity> getByMedicamento(Long id) {
        return repository.findByMedicamento_IdMedicamento(id);
    }

    public MedicationEventEntity create(MedicationEventEntity relacion) {
        return repository.save(relacion);
    }

    public MedicationEventEntity update(Long id, MedicationEventEntity datos) {
        return repository.findById(id).map(e -> {
            e.setNino(datos.getNino());
            e.setMedicamento(datos.getMedicamento());
            e.setFechaProgramada(datos.getFechaProgramada());
            e.setHoraProgramada(datos.getHoraProgramada());
            e.setFechaTomada(datos.getFechaTomada());
            e.setHoraTomada(datos.getHoraTomada());
            e.setEstado(datos.getEstado());
            return repository.save(e);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public MedicationEventEntity marcarComoTomado(Long id) {
        return repository.findById(id).map(e -> {
            e.setFechaTomada(LocalDate.now());
            e.setHoraTomada(LocalTime.now());
            e.setEstado(EventStatusEnum.administrada);
            return repository.save(e);
        }).orElse(null);
    }
}
