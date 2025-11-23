package com.example.demo.repository;

import com.example.demo.entity.DemoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemoItemRepository extends JpaRepository<DemoItem, Long> {
}
