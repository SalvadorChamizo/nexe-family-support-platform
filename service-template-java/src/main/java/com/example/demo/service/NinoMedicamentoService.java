package com.example.demo.service;

import com.example.demo.entity.NinoMedicamentoEntity;
import com.example.demo.repository.NinoMedicamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NinoMedicamentoService {

    private final NinoMedicamentoRepository repository;

    public NinoMedicamentoService(NinoMedicamentoRepository repository) {
        this.repository = repository;
    }

    public List<NinoMedicamentoEntity> getAll() {
        return repository.findAll();
    }

    public Optional<NinoMedicamentoEntity> getById(Long id) {
        return repository.findById(id);
    }

    public List<NinoMedicamentoEntity> getByNino(Long idNino) {
        return repository.findByNino_IdNinos(idNino);
    }

    public List<NinoMedicamentoEntity> getByMedicamento(Long idMedicamento) {
        return repository.findByMedicamento_IdMedicamento(idMedicamento);
    }

    public NinoMedicamentoEntity create(NinoMedicamentoEntity relacion) {
        return repository.save(relacion);
    }

    public NinoMedicamentoEntity update(Long id, NinoMedicamentoEntity datos) {
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
