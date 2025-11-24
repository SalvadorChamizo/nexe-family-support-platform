package com.example.demo.controller;

import com.example.demo.entity.MedicationEntity;
import com.example.demo.service.MedicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medication")
public class MedicationController {

    private final MedicationService service;

    public MedicationController(MedicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<MedicationEntity> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicationEntity> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MedicationEntity create(@RequestBody MedicationEntity m) {
        return service.create(m);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicationEntity> update(@PathVariable Long id, @RequestBody MedicationEntity m) {

        MedicationEntity updated = service.update(id, m);
        return (updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.getById(id)
                .map(n -> {
                    service.delete(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
