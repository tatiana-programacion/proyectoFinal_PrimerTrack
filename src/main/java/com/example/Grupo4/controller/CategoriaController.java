package com.example.Grupo4.controller;

import com.example.Grupo4.exception.ApiException;
import com.example.Grupo4.model.Categoria;
import com.example.Grupo4.service.CategoriaService;
import java.util.Collection;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class CategoriaController {

  private final CategoriaService service;

  public CategoriaController(CategoriaService categoriaService) {
    this.service = categoriaService;
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Categoria> crear(@RequestBody Categoria categoria) {
    return new ResponseEntity<>(service.crearCategoria(categoria), HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<Categoria>> consultar(@PathVariable Integer id) {
    if (service.consultarCategoria(id).isEmpty()) {
      throw new ApiException("categories_error", "La categoría no existe", 404);
    } else {
      return ResponseEntity.ok(service.consultarCategoria(id));
    }
  }

  @GetMapping
  public ResponseEntity<Collection<Categoria>> consultarTodas() {
    return ResponseEntity.ok(service.consultarTodasLasCategorias());
  }

  @PutMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Categoria> modificar(@RequestBody Categoria categoria) {
    if (service.consultarCategoria(categoria.getId()).isEmpty()) {
      throw new ApiException("categories_error", "La categoría no existe", 404);
    } else {
      return ResponseEntity.ok(service.modificarCategoria(categoria));
    }
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> eliminar(@PathVariable Integer id) {
    if (service.consultarCategoria(id).isEmpty()) {
      throw new ApiException("categories_error", "La categoría no existe", 404);
    } else {
      service.eliminarCategoria(id);
      return new ResponseEntity<>("Categoría eliminada correctamente", HttpStatus.NO_CONTENT);
    }
  }
}
