package com.example.Grupo4.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.example.Grupo4.model.Rol;
import com.example.Grupo4.model.Usuario;
import com.example.Grupo4.repository.IUsuarioRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class UsuarioServiceTest {

  @Autowired
  private BCryptPasswordEncoder encoder;

  @Test
  void testConsultarUsuario() {
    // Crea un mock del repository
    IUsuarioRepository repositoryMock = mock(IUsuarioRepository.class);

    // Crea un usuario para usar en las pruebas
    Usuario Usuario = new Usuario(
        1,
        "test",
        "test",
        "test",
        "test",
        "test",
        new Rol()
    );

    // Configurar el comportamiento del mock del repository cuando se llame al método findById
    when(repositoryMock.findById(1)).thenReturn(Optional.of(Usuario));

    // Crea una instancia del service usando el mock del repository
    UsuarioService service = new UsuarioService(encoder, repositoryMock);

    // Llama al método a probar y guarda el resultado en una variable
    Optional<Usuario> resultado = service.consultarUsuario(1);

    // Verifica que el resultado sea el esperado
    assertTrue(resultado.isPresent());
    assertEquals(Usuario, resultado.get());
  }
}
