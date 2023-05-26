package com.example.Grupo4.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.Grupo4.dto.ReservaDTO;
import com.example.Grupo4.exception.ApiException;
import com.example.Grupo4.model.Caracteristica;
import com.example.Grupo4.model.Categoria;
import com.example.Grupo4.model.Ciudad;
import com.example.Grupo4.model.Imagen;
import com.example.Grupo4.model.Politica;
import com.example.Grupo4.model.Producto;
import com.example.Grupo4.model.Reserva;
import com.example.Grupo4.model.Rol;
import com.example.Grupo4.model.Usuario;
import com.example.Grupo4.service.ReservaService;
import com.fasterxml.jackson.databind.ObjectMapper;

class ReservaControllerTest {

    private ObjectMapper mapper = new ObjectMapper();

    @Test
    void testConsultarReserva() {
      //Crea un mock del servicio
      ReservaService serviceMock = mock(ReservaService.class);

      // Crea una Ciudad para usar en las pruebas
      Ciudad ciudad = new Ciudad();

      // Crea una Politica para usar en las pruebas
      Politica politica = new Politica();

      // Crea una Categoria para usar en las pruebas
      Categoria categoria = new Categoria();

      // Crea un Producto para las pruebas
      Producto producto = new Producto(1, "test", "test", List.of(new Imagen()), List.of(new Caracteristica()), politica, categoria, ciudad);

      // Crea un usuario para usar en las pruebas
      Usuario usuario = new Usuario(1, "test","test","test","test", "test", new Rol());
      
      //Configura el mock para que devuelva una Reserva cuando se llame al método consultarReserva()
      Optional<Reserva> reserva = Optional.of(new Reserva(1, "test", LocalDate.parse("2022-12-28"), LocalDate.parse("2022-12-28"), producto, usuario));
      when(serviceMock.consultarReserva(1)).thenReturn(reserva);
  
      //Crea una instancia del controlador asignandole el mock del servicio
      ReservaController controller = new ReservaController(serviceMock);
  
      //Ejecuta la prueba
      ResponseEntity<ReservaDTO> response = controller.consultar(1);

      ReservaDTO reservaDTO = mapper.convertValue(reserva, ReservaDTO.class);
  
      //Verifica que la respuesta del controlador sea correcta
      assertEquals(HttpStatus.OK, response.getStatusCode());      
      assertTrue(reservaDTO.getClass().equals(response.getBody().getClass()));
    }

    @Test
    void testConsultarReservaInexistente() {
        //Crea un mock del servicio
        ReservaService serviceMock = mock(ReservaService.class);

        //Configura el mock para que devuelva un Optional vacío cuando se llame al método consultarReserva()
        Optional<Reserva> Reserva = Optional.empty();
        when(serviceMock.consultarReserva(1)).thenReturn(Reserva);

        //Crea una instancia del controlador asignandole el mock del servicio
        ReservaController controller = new ReservaController(serviceMock);

        //Ejecuta la prueba
        try {
        controller.consultar(1);
        fail("Se esperaba una excepción");
        } catch (ApiException e) {
        // Verifica que la excepción se haya generado correctamente
        assertEquals("reservations_error", e.getCode());
        assertEquals("La reserva no existe", e.getDescription());
        assertEquals(404, e.getStatusCode());
        }
    }
}
