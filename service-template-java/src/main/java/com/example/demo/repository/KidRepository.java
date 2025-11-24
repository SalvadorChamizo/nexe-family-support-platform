package com.example.demo.repository;

import com.example.demo.entity.Kids;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KidRepository extends JpaRepository<Kids, Long> {
}
