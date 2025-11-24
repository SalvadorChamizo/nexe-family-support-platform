package com.example.demo.service;

import com.example.demo.entity.Kids;
import com.example.demo.repository.KidRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/kids")
public class KidService {
    private KidService service;

    public void KidRepository(KidService service) {
        this.service = service;
    }

    public List<Kids> getAllKids() {
        return .findAll();
    }
}
