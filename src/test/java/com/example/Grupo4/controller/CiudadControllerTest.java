package com.example.Grupo4.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.example.Grupo4.exception.ApiException;
import com.example.Grupo4.model.Ciudad;
import com.example.Grupo4.service.CiudadService;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class CiudadControllerTest {

  @Test
  void testConsultar() {
    //Crea un mock del servicio
    CiudadService serviceMock = mock(CiudadService.class);

    //Configura el mock para que devuelva una ciudad cuando se llame al método consultarCiudad()
    Optional<Ciudad> Ciudad = Optional.of(new Ciudad(1, "test", "test"));
    when(serviceMock.consultarCiudad(1)).thenReturn(Ciudad);

    //Crea una instancia del controlador asignandole el mock del servicio
    CiudadController controller = new CiudadController(serviceMock);

    //Ejecuta la prueba
    ResponseEntity<Optional<Ciudad>> response = controller.consultar(1);

    //Verifica que la respuesta del controlador sea correcta
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(Ciudad, response.getBody());
  }

  @Test
  void testConsultarCiudadInexistente() {
    //Crea un mock del servicio
    CiudadService serviceMock = mock(CiudadService.class);

    //Configura el mock para que devuelva un Optional vacío cuando se llame al método consultarCiudad()
    Optional<Ciudad> Ciudad = Optional.empty();
    when(serviceMock.consultarCiudad(1)).thenReturn(Ciudad);

    //Crea una instancia del controlador asignandole el mock del servicio
    CiudadController controller = new CiudadController(serviceMock);

    //Ejecuta la prueba
    try {
      controller.consultar(1);
      fail("Se esperaba una excepción");
    } catch (ApiException e) {
      // Verifica que la excepción se haya generado correctamente
      assertEquals("cities_error", e.getCode());
      assertEquals("La ciudad no existe", e.getDescription());
      assertEquals(404, e.getStatusCode());
    }
  }
}
