package com.example.Grupo4.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.example.Grupo4.model.Ciudad;
import com.example.Grupo4.repository.ICiudadRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class CiudadServiceTest {

  @Test
  void testConsultarCiudad() {
    // Crea un mock del repository
    ICiudadRepository repositoryMock = mock(ICiudadRepository.class);

    // Crea una ciudad para usar en las pruebas
    Ciudad Ciudad = new Ciudad(1, "test", "test");

    // Configurar el comportamiento del mock del repository cuando se llame al método findById
    when(repositoryMock.findById(1)).thenReturn(Optional.of(Ciudad));

    // Crea una instancia del service usando el mock del repository
    CiudadService service = new CiudadService(repositoryMock);

    // Llama al método a probar y guarda el resultado en una variable
    Optional<Ciudad> resultado = service.consultarCiudad(1);

    // Verifica que el resultado sea el esperado
    assertTrue(resultado.isPresent());
    assertEquals(Ciudad, resultado.get());
  }
}
