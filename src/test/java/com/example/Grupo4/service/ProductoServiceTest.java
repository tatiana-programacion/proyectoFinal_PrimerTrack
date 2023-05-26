package com.example.Grupo4.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.example.Grupo4.model.Caracteristica;
import com.example.Grupo4.model.Categoria;
import com.example.Grupo4.model.Ciudad;
import com.example.Grupo4.model.Imagen;
import com.example.Grupo4.model.Politica;
import com.example.Grupo4.model.Producto;
import com.example.Grupo4.repository.IProductoRepository;

class ProductoServiceTest {    

    @Test
    void testConsultarProducto() {
    // Crea un mock del repository
    IProductoRepository repositoryMock = mock(IProductoRepository.class);

    // Crea un mock de service de reserva
    ReservaService reservaServiceMock = mock(ReservaService.class);

    // Crea un mock de Ciudad para usar en las pruebas
    Ciudad ciudad = mock(Ciudad.class);

    // Crea un mock de Producto para usar en las pruebas
    Politica politica = mock(Politica.class);

    // Crea un mock de Producto para usar en las pruebas
    Categoria categoria = mock(Categoria.class);

    // Crea una Producto para usar en las pruebas
    Producto producto = new Producto(1, "test", "test", List.of(new Imagen()), List.of(new Caracteristica()), politica, categoria, ciudad);

    // Configurar el comportamiento del mock del repository cuando se llame al método findById
    when(repositoryMock.findById(1)).thenReturn(Optional.of(producto));

    // Crea una instancia del service usando el mock del repository
    ProductoService service = new ProductoService(repositoryMock, reservaServiceMock);

    // Llama al método a probar y guarda el resultado en una variable
    Optional<Producto> resultado = service.consultarProducto(1);

    // Verifica que el resultado sea el esperado
    assertTrue(resultado.isPresent());
    assertEquals(producto, resultado.get());
    }
}
