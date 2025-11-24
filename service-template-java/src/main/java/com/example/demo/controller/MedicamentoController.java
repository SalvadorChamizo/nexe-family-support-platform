package com.example.demo.controller;

import com.example.demo.entity.MedicamentoEntity;
import com.example.demo.service.MedicamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicamentos")
public class MedicamentoController {

    private final MedicamentoService service;

    public MedicamentoController(MedicamentoService service) {
        this.service = service;
    }

    @GetMapping
    public List<MedicamentoEntity> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicamentoEntity> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MedicamentoEntity create(@RequestBody MedicamentoEntity m) {
        return service.create(m);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicamentoEntity> update(@PathVariable Long id, @RequestBody MedicamentoEntity m) {

        MedicamentoEntity updated = service.update(id, m);
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
