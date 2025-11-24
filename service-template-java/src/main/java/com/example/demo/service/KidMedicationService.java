package com.example.demo.service;

import com.example.demo.entity.KidMedicationEntity;
import com.example.demo.repository.KidMedicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KidMedicationService {

    private final KidMedicationRepository repository;

    public KidMedicationService(KidMedicationRepository repository) {
        this.repository = repository;
    }

    public List<KidMedicationEntity> getAll() {
        return repository.findAll();
    }

    public Optional<KidMedicationEntity> getById(Long id) {
        return repository.findById(id);
    }

    public List<KidMedicationEntity> getByNino(Long idNino) {
        return repository.findByNino_IdNinos(idNino);
    }

    public List<KidMedicationEntity> getByMedicamento(Long idMedicamento) {
        return repository.findByMedicamento_IdMedicamento(idMedicamento);
    }

    public KidMedicationEntity create(KidMedicationEntity relacion) {
        return repository.save(relacion);
    }

    public KidMedicationEntity update(Long id, KidMedicationEntity datos) {
        return repository.findById(id).map(r -> {
            r.setNino(datos.getNino());
            r.setMedicamento(datos.getMedicamento());
            r.setDosis(datos.getDosis());
            r.setFrecuencia(datos.getFrecuencia());
            r.setNota(datos.getNota());
            r.setPeriodo(datos.getPeriodo());
            return repository.save(r);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
