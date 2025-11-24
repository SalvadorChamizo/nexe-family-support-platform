package com.example.demo.controller;

import com.example.demo.entity.KidMedicationEntity;
import com.example.demo.service.KidMedicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/NinoMedicamento")
public class KidMedicationController {

    private final KidMedicationService service;

    public KidMedicationController(KidMedicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<KidMedicationEntity> getAll() {
        return service.getAll();
    }

    @GetMapping("/nino/{idNino}")
    public ResponseEntity<KidMedicationEntity> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/medicamento/{idMedicamento}")
    public List<KidMedicationEntity> getByNino(@PathVariable Long idNino) {
        return service.getByNino(idNino);
    }

    @PostMapping
    public KidMedicationEntity create(@RequestBody KidMedicationEntity nM) {
        return service.create(nM);
    }

    @PutMapping("/{id}")
    public ResponseEntity<KidMedicationEntity> update (@PathVariable Long id, @RequestBody KidMedicationEntity nM) {
        KidMedicationEntity updated = service.update(id, nM);
        return updated != null ?
                ResponseEntity.ok(updated) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}
