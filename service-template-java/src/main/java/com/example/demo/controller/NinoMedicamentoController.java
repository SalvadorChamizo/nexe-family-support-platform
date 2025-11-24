package com.example.demo.controller;

import com.example.demo.entity.MedicamentoEntity;
import com.example.demo.entity.NinoMedicamentoEntity;
import com.example.demo.service.NinoMedicamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/NinoMedicamento")
public class NinoMedicamentoController {

    private final NinoMedicamentoService service;

    public NinoMedicamentoController(NinoMedicamentoService service) {
        this.service = service;
    }

    @GetMapping
    public List<NinoMedicamentoEntity> getAll() {
        return service.getAll();
    }

    @GetMapping("/nino/{idNino}")
    public ResponseEntity<NinoMedicamentoEntity> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/medicamento/{idMedicamento}")
    public List<NinoMedicamentoEntity> getByNino(@PathVariable Long idNino) {
        return service.getByNino(idNino);
    }

    @PostMapping
    public NinoMedicamentoEntity create(@RequestBody NinoMedicamentoEntity nM) {
        return service.create(nM);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NinoMedicamentoEntity> update ( @PathVariable Long id, @RequestBody NinoMedicamentoEntity nM) {
        NinoMedicamentoEntity updated = service.update(id, nM);
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
