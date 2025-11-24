package com.example.demo.service;

import com.example.demo.entity.EstadoEventoEnum;
import com.example.demo.entity.EventoMedicacionEntity;
import com.example.demo.entity.NinoMedicamentoEntity;
import com.example.demo.repository.EventoMedicacionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventoMedicacionService {
    private final EventoMedicacionRepository repository;

    public EventoMedicacionService(EventoMedicacionRepository repository){
        this.repository = repository;
    }

    public List<EventoMedicacionEntity> getAll() {
        return repository.findAll();
    }

    public Optional<EventoMedicacionEntity> getById(Long id) {
        return repository.findById(id);
    }

    public List<EventoMedicacionEntity> getByNino(Long idNino) {
        return repository.findByNino_IdNinos(idNino);
    }

    public List<EventoMedicacionEntity> getByMedicamento(Long id) {
        return repository.findByMedicamento_IdMedicamento(id);
    }

    public EventoMedicacionEntity create(EventoMedicacionEntity relacion) {
        return repository.save(relacion);
    }

    public EventoMedicacionEntity update(Long id, EventoMedicacionEntity datos) {
        return repository.findById(id).map(e -> {
            e.setNino(datos.getNino());
            e.setMedicamento(datos.getMedicamento());
            e.setFechaProgramada(datos.getFechaProgramada());
            e.setHoraProgramada(datos.getHoraProgramada());
            e.setFechaTomada(datos.getFechaTomada());
            e.setHoraTomada(datos.getHoraTomada());
            e.setEstado(datos.getEstado());
            return repository.save(e);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public EventoMedicacionEntity marcarComoTomado(Long id) {
        return repository.findById(id).map(e -> {
            e.setFechaTomada(LocalDate.now());
            e.setHoraTomada(LocalTime.now());
            e.setEstado(EstadoEventoEnum.administrada);
            return repository.save(e);
        }).orElse(null);
    }
}
