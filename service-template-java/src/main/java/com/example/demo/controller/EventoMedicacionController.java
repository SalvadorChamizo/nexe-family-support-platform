package com.example.demo.controller;

import com.example.demo.entity.EventoMedicacionEntity;
import com.example.demo.service.EventoMedicacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eventos-medicacion")
public class EventoMedicacionController {

    private final EventoMedicacionService service;

    public EventoMedicacionController(EventoMedicacionService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventoMedicacionEntity> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoMedicacionEntity> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nino/{idNino}")
    public List<EventoMedicacionEntity> getByNino(@PathVariable Long idNino) {
        return service.getByNino(idNino);
    }

    @GetMapping("/medicamento/{idMedicamento}")
    public List<EventoMedicacionEntity> getByMedicamento(@PathVariable Long idMedicamento) {
        return service.getByMedicamento(idMedicamento);
    }

    @PostMapping
    public EventoMedicacionEntity create(@RequestBody EventoMedicacionEntity evento) {
        return service.create(evento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoMedicacionEntity> update(
            @PathVariable Long id,
            @RequestBody EventoMedicacionEntity evento) {

        EventoMedicacionEntity updated = service.update(id, evento);

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
    public ResponseEntity<EventoMedicacionEntity> marcarComoTomado(@PathVariable Long id) {
        EventoMedicacionEntity evento = service.marcarComoTomado(id);

        return evento != null
                ? ResponseEntity.ok(evento)
                : ResponseEntity.notFound().build();
    }
}
