package com.example.Grupo4.controller;

import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Grupo4.model.Caracteristica;
import com.example.Grupo4.service.CaracteristicaService;

@RestController
@RequestMapping("/caracteristicas")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class CaracteristicaController {

    private final CaracteristicaService caracteristicaService;

    public CaracteristicaController(CaracteristicaService caracteristicaService) {
         this.caracteristicaService = caracteristicaService;
    }
  
    @GetMapping
    public ResponseEntity<Collection<Caracteristica>> consultarTodas() {
        return ResponseEntity.ok(caracteristicaService.consultarTodasLasCategorias());
    }
    
}
