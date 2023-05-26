package com.example.Grupo4.controller;

import com.example.Grupo4.exception.ApiException;
import com.example.Grupo4.model.Producto;
import com.example.Grupo4.service.ProductoService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class ProductoController {

  private final ProductoService service;

  public ProductoController(ProductoService service) {
    this.service = service;
  }

  @Transactional
  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
    return new ResponseEntity<>(service.crearProducto(producto), HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<Collection<Producto>> consultarTodos() {
    return ResponseEntity.ok(service.consultarTodosLosProductos());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<Producto>> consultar(@PathVariable Integer id) {
    if (service.consultarProducto(id).isEmpty()) {
      throw new ApiException("products_error", "El producto no existe", 404);
    } else {
      return ResponseEntity.ok(service.consultarProducto(id));
    }
  }

  @GetMapping("/ciudad")
  public ResponseEntity<Collection<Producto>> filtrarPorCiudad(@RequestParam Integer id) {
    return ResponseEntity.ok(service.filtrarProductosPorCiudad(id));
  }

  @PutMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Producto> modificar(@RequestBody Producto producto) {
    if (service.consultarProducto(producto.getId()).isEmpty()) {
      throw new ApiException("products_error", "El producto no existe", 404);
    } else {
      return ResponseEntity.ok(service.modificarProducto(producto));
    }
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> eliminar(@PathVariable Integer id) {
    if (service.consultarProducto(id).isEmpty()) {
      throw new ApiException("products_error", "El producto no existe", 404);
    } else {
      service.eliminarProducto(id);
      return new ResponseEntity<>("Producto eliminado correctamente", HttpStatus.NO_CONTENT);
    }
  }

  @GetMapping("/ciudadyfechas")
    public ResponseEntity<Object> buscarPorCiudadYFechas(@RequestParam Integer idCiudad, 
                                                         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicial, 
                                                         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFinal) throws IOException {
    
    return ResponseEntity.ok(service.filtrarPorFechasYCiudad(idCiudad, fechaInicial, fechaFinal));
  
    
  }

  @GetMapping("/fechas")
    public ResponseEntity<Object> buscarPorFechas(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicial, 
                                                  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFinal) throws IOException {
    
    return ResponseEntity.ok(service.filtrarPorFechas(fechaInicial, fechaFinal));
  }


}
