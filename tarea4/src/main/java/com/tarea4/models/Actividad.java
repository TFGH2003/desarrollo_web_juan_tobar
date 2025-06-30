package com.tarea4.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    private LocalDate fechaInicio;
    
    @NotBlank
    private String sector;
    
    @NotBlank
    private String nombre;
    
    @NotBlank
    private String tema;

    public Actividad(){}
    public Actividad(LocalDate fechaInicio, String sector, String nombre, String tema) {
        this.fechaInicio=fechaInicio;
        this.sector=sector;
        this.nombre=nombre;
        this.tema=tema;
    }

    public Long getId(){
        return id;
    }
    public LocalDate getFechaInicio(){
        return fechaInicio;
    }
    public String getSector(){
        return sector;
    }
    public String getNombre(){
        return nombre;
    }
    public String getTema(){
        return tema;
    }
}