package com.example.demo.service;

import com.example.demo.entity.KidEntity;
import com.example.demo.repository.KidRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class KidService {

    private final KidRepository repository;

    public KidService(KidRepository repository) {
        this.repository = repository;
    }

    public List<KidEntity> findAll() {
        return repository.findAll();
    }

    public Optional<KidEntity> findById(Long id) {
        return repository.findById(id);
    }

    public KidEntity save(KidEntity n) {
        return repository.save(n);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
