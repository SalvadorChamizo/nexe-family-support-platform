package com.example.demo.service;

import com.example.demo.entity.NinoEntity;
import com.example.demo.repository.NinoRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class NinoService {

    private final NinoRepository repository;

    public NinoService(NinoRepository repository) {
        this.repository = repository;
    }

    public List<NinoEntity> findAll() {
        return repository.findAll();
    }

    public Optional<NinoEntity> findById(Long id) {
        return repository.findById(id);
    }

    public NinoEntity save(NinoEntity n) {
        return repository.save(n);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
