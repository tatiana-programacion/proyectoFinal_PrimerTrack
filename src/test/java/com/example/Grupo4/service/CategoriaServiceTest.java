package com.example.Grupo4.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.example.Grupo4.model.Categoria;
import com.example.Grupo4.model.Producto;
import com.example.Grupo4.repository.ICategoriaRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class CategoriaServiceTest {

  @Test
  void testConsultarCategoria() {
    // Crea un mock del repository
    ICategoriaRepository repositoryMock = mock(ICategoriaRepository.class);

    // Crea una categoría para usar en las pruebas
    Categoria categoria = new Categoria(1, "test", "test", "test", List.of(new Producto()));

    // Configurar el comportamiento del mock del repository cuando se llame al método findById
    when(repositoryMock.findById(1)).thenReturn(Optional.of(categoria));

    // Crea una instancia del service usando el mock del repository
    CategoriaService service = new CategoriaService(repositoryMock);

    // Llama al método a probar y guarda el resultado en una variable
    Optional<Categoria> resultado = service.consultarCategoria(1);

    // Verifica que el resultado sea el esperado
    assertTrue(resultado.isPresent());
    assertEquals(categoria, resultado.get());
  }
}
