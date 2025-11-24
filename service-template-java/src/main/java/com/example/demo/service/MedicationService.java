package com.example.demo.service;

import com.example.demo.entity.MedicationEntity;
import com.example.demo.repository.MedicationRepository;

import java.util.List;
import java.util.Optional;

public class MedicationService {
    private  final MedicationRepository repository;

    public MedicationService(MedicationRepository repository) {
        this.repository = repository;
    }

    public List<MedicationEntity> getAll() {
        return repository.findAll();
    }

    public Optional<MedicationEntity> getById(Long id) {
        return repository.findById(id);
    }

    public MedicationEntity create(MedicationEntity medicamento) {
        return repository.save(medicamento);
    }

    public MedicationEntity update(Long id, MedicationEntity updateMedicamento) {
        return (repository.findById(id).map(m -> {
            m.setNombre(updateMedicamento.getNombre());
            m.setDescripcion(updateMedicamento.getDescripcion());
            return repository.save(m);
        }).orElse(null));
    }

    public boolean delete(Long id) {
        if(repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
