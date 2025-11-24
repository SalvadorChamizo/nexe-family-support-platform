package com.example.demo.repository;

import com.example.demo.entity.NinoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KidRepository extends JpaRepository<NinoEntity, Long> {
}
