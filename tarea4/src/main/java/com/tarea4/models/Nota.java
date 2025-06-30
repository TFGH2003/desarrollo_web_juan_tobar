package com.tarea4.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    private Integer nota;
    
    public Nota(){}
    public Nota(Actividad actividad, Integer nota) {
        this.actividad=actividad;
        this.nota=nota;
    }

    public Long getId(){
        return id;
    }
    public Actividad getActividad(){
        return actividad;
    }
    public Integer getNota(){
        return nota;
    }
}
