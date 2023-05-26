package com.example.Grupo4.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.example.Grupo4.exception.ApiException;
import com.example.Grupo4.model.Categoria;
import com.example.Grupo4.model.Producto;
import com.example.Grupo4.service.CategoriaService;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class CategoriaControllerTest {

  @Test
  void testConsultar() {
    //Crea un mock del servicio
    CategoriaService serviceMock = mock(CategoriaService.class);

    //Configura el mock para que devuelva una categoría cuando se llame al método consultarCategoria()
    Optional<Categoria> categoria = Optional.of(
        new Categoria(
            1,
            "test",
            "test",
            "test",
            List.of(new Producto())));
    when(serviceMock.consultarCategoria(1)).thenReturn(categoria);

    //Crea una instancia del controlador asignandole el mock del servicio
    CategoriaController controller = new CategoriaController(serviceMock);

    //Ejecuta la prueba
    ResponseEntity<Optional<Categoria>> response = controller.consultar(1);

    //Verifica que la respuesta del controlador sea correcta
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(categoria, response.getBody());
  }

  @Test
  void testConsultarCategoriaInexistente() {
    //Crea un mock del servicio
    CategoriaService serviceMock = mock(CategoriaService.class);

    //Configura el mock para que devuelva un Optional vacío cuando se llame al método consultarCategoria()
    Optional<Categoria> categoria = Optional.empty();
    when(serviceMock.consultarCategoria(1)).thenReturn(categoria);

    //Crea una instancia del controlador asignandole el mock del servicio
    CategoriaController controller = new CategoriaController(serviceMock);

    //Ejecuta la prueba
    try {
      controller.consultar(1);
      fail("Se esperaba una excepción");
    } catch (ApiException e) {
      // Verifica que la excepción se haya generado correctamente
      assertEquals("categories_error", e.getCode());
      assertEquals("La categoría no existe", e.getDescription());
      assertEquals(404, e.getStatusCode());
    }
  }

}
