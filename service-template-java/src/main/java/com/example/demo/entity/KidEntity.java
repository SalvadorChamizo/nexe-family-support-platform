package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "nino")
public class KidEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Niño", nullable = false)
    private long id_kid;

    @Column(name = "nombre", nullable = false)
    private String kidName;

    @Column(name = "apellidos", nullable = false)
    private String kidsLastName;
}