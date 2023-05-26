package com.example.Grupo4.service;

import java.util.Collection;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.example.Grupo4.model.Ciudad;
import com.example.Grupo4.repository.ICiudadRepository;

@Service
public class CiudadService {

    private final ICiudadRepository ciudadRepository;

  public CiudadService(ICiudadRepository ciudadRepository) {
    this.ciudadRepository = ciudadRepository;
  }

  public Ciudad crearCiudad(Ciudad ciudad){
    return ciudadRepository.save(ciudad);
  }

  public Optional<Ciudad> consultarCiudad(Integer id){
    return ciudadRepository.findById(id);
  }

  public Collection<Ciudad> consultarTodasLasCiudades(){
    return ciudadRepository.findAll();
  }

  public Ciudad modificarCiudad(Ciudad o){
    return ciudadRepository.save(o);
  }

  public void eliminarCiudad(Integer id){
    ciudadRepository.deleteById(id);
  }
    
}
