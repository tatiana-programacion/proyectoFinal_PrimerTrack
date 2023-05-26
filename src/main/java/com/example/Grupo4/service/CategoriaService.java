package com.example.Grupo4.service;

import com.example.Grupo4.model.Categoria;
import com.example.Grupo4.repository.ICategoriaRepository;
import java.util.Collection;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

  private final ICategoriaRepository repository;

  public CategoriaService(ICategoriaRepository categoriaRepository) {
    this.repository = categoriaRepository;
  }

  public Categoria crearCategoria(Categoria c){
    return repository.save(c);
  }

  public Optional<Categoria> consultarCategoria(Integer id){
    return repository.findById(id);
  }

  public Collection<Categoria> consultarTodasLasCategorias(){
    return repository.findAll();
  }

  public Categoria modificarCategoria(Categoria o){
    return repository.save(o);
  }

  public void eliminarCategoria(Integer id){
    repository.deleteById(id);
  }
}
