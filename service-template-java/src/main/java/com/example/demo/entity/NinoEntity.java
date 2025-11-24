package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "nino")
public class NinoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Niño")
    private long id_kid;

    @Column(name = "Nombre", nullable = false)
    private String kidName;

    @Column(name = "Apellidos", nullable = false)
    private String kidsLastName;
}