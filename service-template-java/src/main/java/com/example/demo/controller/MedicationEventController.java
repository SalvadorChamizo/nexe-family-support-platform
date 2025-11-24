package com.example.demo.controller;

import com.example.demo.entity.MedicationEventEntity;
import com.example.demo.service.MedicationEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medication-event")
public class MedicationEventController {

    private final MedicationEventService service;

    public MedicationEventController(MedicationEventService service) {
        this.service = service;
    }

    @GetMapping
    public List<MedicationEventEntity> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicationEventEntity> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nino/{idNino}")
    public List<MedicationEventEntity> getByNino(@PathVariable Long idNino) {
        return service.getByNino(idNino);
    }

    @GetMapping("/medicamento/{idMedicamento}")
    public List<MedicationEventEntity> getByMedicamento(@PathVariable Long idMedicamento) {
        return service.getByMedicamento(idMedicamento);
    }

    @PostMapping
    public MedicationEventEntity create(@RequestBody MedicationEventEntity evento) {
        return service.create(evento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicationEventEntity> update(
            @PathVariable Long id,
            @RequestBody MedicationEventEntity evento) {

        MedicationEventEntity updated = service.update(id, evento);

        return updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.delete(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/tomado")
    public ResponseEntity<MedicationEventEntity> marcarComoTomado(@PathVariable Long id) {
        MedicationEventEntity evento = service.marcarComoTomado(id);

        return evento != null
                ? ResponseEntity.ok(evento)
                : ResponseEntity.notFound().build();
    }
}
