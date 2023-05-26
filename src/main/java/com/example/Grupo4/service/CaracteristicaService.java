package com.example.Grupo4.service;
import java.util.Collection;

import org.springframework.stereotype.Service;

import com.example.Grupo4.model.Caracteristica;
import com.example.Grupo4.repository.ICaracteristicaRepository;


@Service
public class CaracteristicaService {

    private final ICaracteristicaRepository caracteristicaRepository;

    public CaracteristicaService(ICaracteristicaRepository caracteristicaRepository) {
        this.caracteristicaRepository = caracteristicaRepository;
    }

    public Collection<Caracteristica> consultarTodasLasCategorias(){
        return caracteristicaRepository.findAll();
    }
    
}
