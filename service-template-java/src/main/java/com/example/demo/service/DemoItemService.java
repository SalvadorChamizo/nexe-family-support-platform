package com.example.demo.service;

import com.example.demo.entity.DemoItem;
import com.example.demo.repository.DemoItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DemoItemService {

    private final DemoItemRepository repository;

    public DemoItemService(DemoItemRepository repository) {
        this.repository = repository;
    }

    public List<DemoItem> getAllItems() {
        return repository.findAll();
    }

    public DemoItem saveItem(DemoItem item) {
        return repository.save(item);
    }
}
