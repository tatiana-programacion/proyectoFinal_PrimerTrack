package com.example.Grupo4.controller;

import com.example.Grupo4.dto.AuthRequestDTO;
import com.example.Grupo4.dto.AuthResponseDTO;
import com.example.Grupo4.dto.UsuarioDTO;
import com.example.Grupo4.exception.ApiException;
import com.example.Grupo4.model.Usuario;
import com.example.Grupo4.service.UsuarioService;
import com.example.Grupo4.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class UsuarioController {

  private final UserDetailsService userDetailsService;

  private final UsuarioService service;

  private final AuthenticationManager authenticationManager;

  private final JwtUtil jwtUtil;

  public UsuarioController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService,
                           JwtUtil jwtUtil, UsuarioService service) {
    this.authenticationManager = authenticationManager;
    this.userDetailsService = userDetailsService;
    this.jwtUtil = jwtUtil;
    this.service = service;
  }

  @PostMapping
  public ResponseEntity<?> crear(@RequestBody Usuario usuario) {
    try {
      return new ResponseEntity<>(service.crearUsuario(usuario), HttpStatus.CREATED);
    } catch (Exception e) {
      throw new ApiException("sign_up_error", "El email ya se encuentra registrado o el rol no existe", 400);
    }
  }

  @PostMapping("/auth")
  public ResponseEntity<?> generarToken(@RequestBody AuthRequestDTO authRequest) throws Exception {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getContrasenna()));
    } catch (BadCredentialsException e) {
      throw new ApiException("login_error", "Credenciales inválidas", 400);
    }
    final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
    final String token = jwtUtil.generateToken(userDetails);

    ObjectMapper mapper = new ObjectMapper();
    Usuario usuario = service.consultarUsuarioPorEmail(authRequest.getEmail());

    return ResponseEntity.ok(new AuthResponseDTO(mapper.convertValue(usuario, UsuarioDTO.class), token));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Optional<Usuario>> consultar(@PathVariable Integer id) {
    if (service.consultarUsuario(id).isEmpty()) {
      throw new ApiException("users_error", "El usuario no existe", 404);
    } else {
      return ResponseEntity.ok(service.consultarUsuario(id));
    }
  }

  @PutMapping
  @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
  public ResponseEntity<Usuario> modificar(@RequestBody Usuario usuario) {
    if (service.consultarUsuario(usuario.getId()).isEmpty()) {
      throw new ApiException("users_error", "El usuario no existe", 404);
    } else {
      return ResponseEntity.ok(service.modificarUsuario(usuario));
    }
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> eliminar(@PathVariable Integer id) {
    if (service.consultarUsuario(id).isEmpty()) {
      throw new ApiException("users_error", "El usuario no existe", 404);
    } else {
      service.eliminarUsuario(id);
      return new ResponseEntity<>("Usuario eliminado correctamente.", HttpStatus.NO_CONTENT);
    }
  }
}
