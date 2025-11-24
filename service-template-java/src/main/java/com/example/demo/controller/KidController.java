package com.example.demo.controller;

import com.example.demo.entity.KidEntity;
import com.example.demo.service.KidService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ninos")
public class KidController {

    private final KidService service;

    public KidController(KidService service) {
        this.service = service;
    }

    @GetMapping
    public List<KidEntity> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<KidEntity> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public KidEntity create(@RequestBody KidEntity n) {
        return service.save(n);
    }

    @PutMapping("/{id}")
    public ResponseEntity<KidEntity> update(@PathVariable Long id, @RequestBody KidEntity n) {
        return service.findById(id)
                .map(existing -> {
                    existing.setKidName(n.getKidName());
                    existing.setKidsLastName(n.getKidsLastName());
                    return ResponseEntity.ok(service.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.findById(id)
                .map(n -> {
                    service.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
