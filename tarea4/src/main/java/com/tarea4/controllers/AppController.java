package com.tarea4.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.tarea4.models.Actividad;
import com.tarea4.models.ActividadRepository;
import com.tarea4.models.Nota;
import com.tarea4.models.NotaRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/actividades")
public class AppController {
    private ActividadRepository actividadRepository;
    private NotaRepository notaRepository;
    public AppController(ActividadRepository actividadRepository, NotaRepository notaRepository) {
        this.actividadRepository = actividadRepository;
        this.notaRepository = notaRepository;
    }
    public Double calcularPromedio(Long actividadId) {
        List<Nota> notas = notaRepository.findByActividadId(actividadId);
        if (notas.isEmpty()) return null;
        double suma = notas.stream().mapToDouble(Nota::getNota).sum();
        return suma / notas.size();
    }
    @GetMapping
    public String mostrarActividades(Model model) {
        List<Actividad> actividades = actividadRepository.findAll();
        Map<Long, Double> promediosNotas = new HashMap<>();
        actividades.forEach(actividad -> {
            Double promedio = calcularPromedio(actividad.getId());
            if (promedio != null) {
                promediosNotas.put(actividad.getId(), promedio);
            }
        });     
        model.addAttribute("actividades", actividades);
        model.addAttribute("promediosNotas", promediosNotas);
        model.addAttribute("nuevaActividad", new Actividad());
        return "actividades";
    }
    
    @PostMapping("/{id}/agregar-nota")
    @ResponseBody
    public Map<String, Object> agregarNota(@PathVariable Long id, @RequestParam Integer nota) {
        Map<String, Object> response = new HashMap<>();
        try {
            Nota nuevaNota = new Nota(actividadRepository.findById(id).orElseThrow(), nota);
            notaRepository.save(nuevaNota);
            Double promedio = calcularPromedio(id);
            response.put("success", true);
            response.put("promedio", promedio);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
        }        
        return response;
    }
    
    @PostMapping("/rellenar")
    public String rellenarDatos() {
        Actividad actividad = new Actividad(LocalDate.now(), "awa", "awa", "awa");
        actividadRepository.save(actividad);
        return "redirect:/actividades";
    }
}
