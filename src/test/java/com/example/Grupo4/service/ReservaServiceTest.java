package com.example.Grupo4.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.example.Grupo4.model.Producto;
import com.example.Grupo4.model.Reserva;
import com.example.Grupo4.model.Usuario;
import com.example.Grupo4.repository.IReservaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

class ReservaServiceTest {
    
    private ObjectMapper mapper = new ObjectMapper();

    @Test
    void testConsultarReserva() {
    // Crea un mock del repository
    IReservaRepository repositoryMock = mock(IReservaRepository.class);

    // Crea un mock de Usuario para usar en las pruebas
    Producto producto = mock(Producto.class);

    // Crea un mock de Producto para usar en las pruebas
    Usuario usuario = mock(Usuario.class);

    // Crea una reserva para usar en las pruebas
    Reserva reserva = new Reserva(1, "test", LocalDate.parse("2022-12-28"), LocalDate.parse("2022-12-28"), producto, usuario);

    // Configurar el comportamiento del mock del repository cuando se llame al método findById
    when(repositoryMock.findById(1)).thenReturn(Optional.of(reserva));

    // Crea una instancia del service usando el mock del repository
    ReservaService service = new ReservaService(repositoryMock, mapper);

    // Llama al método a probar y guarda el resultado en una variable
    Optional<Reserva> resultado = service.consultarReserva(1);

    // Verifica que el resultado sea el esperado
    assertTrue(resultado.isPresent());
    assertEquals(reserva, resultado.get());
    }

}
