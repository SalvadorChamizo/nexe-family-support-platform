package com.example.demo.service;

import com.example.demo.entity.Kids;
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

    public List<Kids> findAll() {
        return repository.findAll();
    }

    public Optional<Kids> findByID(Long id) {
        return repository.findById(id);
    }

    public Kids save(Kids kid) {
        return repository.save(kid);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
