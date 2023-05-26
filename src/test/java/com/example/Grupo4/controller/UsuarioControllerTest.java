package com.example.Grupo4.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.example.Grupo4.exception.ApiException;
import com.example.Grupo4.model.Rol;
import com.example.Grupo4.model.Usuario;
import com.example.Grupo4.service.UsuarioService;
import com.example.Grupo4.util.JwtUtil;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;

class UsuarioControllerTest {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private JwtUtil jwtUtil;

  @Test
  void testConsultar() {
    //Crea un mock del servicio
    UsuarioService serviceMock = mock(UsuarioService.class);

    //Configura el mock para que devuelva un usuario cuando se llame al método consultarUsuario()
    Optional<Usuario> Usuario = Optional.of(
        new Usuario(
            1,
            "test",
            "test",
            "test",
            "test",
            "test",
            new Rol()
        )
    );
    when(serviceMock.consultarUsuario(1)).thenReturn(Usuario);

    //Crea una instancia del controlador asignandole el mock del servicio
    UsuarioController controller = new UsuarioController(authenticationManager, userDetailsService, jwtUtil, serviceMock);

    //Ejecuta la prueba
    ResponseEntity<Optional<Usuario>> response = controller.consultar(1);

    //Verifica que la respuesta del controlador sea correcta
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(Usuario, response.getBody());
  }

  @Test
  void testConsultarUsuarioInexistente() {
    //Crea un mock del servicio
    UsuarioService serviceMock = mock(UsuarioService.class);

    //Configura el mock para que devuelva un Optional vacío cuando se llame al método consultarUsuario()
    Optional<Usuario> Usuario = Optional.empty();
    when(serviceMock.consultarUsuario(1)).thenReturn(Usuario);

    //Crea una instancia del controlador asignandole el mock del servicio
    UsuarioController controller = new UsuarioController(authenticationManager, userDetailsService, jwtUtil, serviceMock);

    //Ejecuta la prueba
    try {
      controller.consultar(1);
      fail("Se esperaba una excepción");
    } catch (ApiException e) {
      // Verifica que la excepción se haya generado correctamente
      assertEquals("users_error", e.getCode());
      assertEquals("El usuario no existe", e.getDescription());
      assertEquals(404, e.getStatusCode());
    }
  }
}
