package com.example.demo.controller;

import com.example.demo.entity.DemoItem;
import com.example.demo.service.DemoItemService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DemoItemController {

    private final DemoItemService service;

    public DemoItemController(DemoItemService service) {
        this.service = service;
    }

    @GetMapping("/demo-items")
    public List<DemoItem> getDemoItems() {
        return service.getAllItems();
    }
}
