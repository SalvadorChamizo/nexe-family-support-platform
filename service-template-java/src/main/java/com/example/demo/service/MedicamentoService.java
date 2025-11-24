package com.example.demo.service;

import com.example.demo.entity.MedicamentoEntity;
import com.example.demo.repository.MedicamentoRepository;

import java.util.List;
import java.util.Optional;

public class MedicamentoService {
    private  final MedicamentoRepository repository;

    public MedicamentoService(MedicamentoRepository repository) {
        this.repository = repository;
    }

    public List<MedicamentoEntity> getAll() {
        return repository.findAll();
    }

    public Optional<MedicamentoEntity> getById(Long id) {
        return repository.findById(id);
    }

    public MedicamentoEntity create(MedicamentoEntity medicamento) {
        return repository.save(medicamento);
    }

    public MedicamentoEntity update(Long id, MedicamentoEntity updateMedicamento) {
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
