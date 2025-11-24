package com.example.demo.controller;

import com.example.demo.entity.NinoEntity;
import com.example.demo.service.NinoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ninos")
public class NinoController {

    private final NinoService service;

    public NinoController(NinoService service) {
        this.service = service;
    }

    @GetMapping
    public List<NinoEntity> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NinoEntity> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public NinoEntity create(@RequestBody NinoEntity n) {
        return service.save(n);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NinoEntity> update(@PathVariable Long id, @RequestBody NinoEntity n) {
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
