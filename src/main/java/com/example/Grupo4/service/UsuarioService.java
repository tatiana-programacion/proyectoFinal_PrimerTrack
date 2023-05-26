package com.example.Grupo4.service;

import com.example.Grupo4.model.Usuario;
import com.example.Grupo4.repository.IUsuarioRepository;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {


  private final IUsuarioRepository repository;

  private final BCryptPasswordEncoder encoder;

  public UsuarioService(BCryptPasswordEncoder encoder, IUsuarioRepository repository) {
    this.encoder = encoder;
    this.repository = repository;
  }

  public Usuario crearUsuario(Usuario u) {
    u.setContrasenna(encoder.encode(u.getContrasenna()));
    return repository.save(u);
  }

  public Optional<Usuario> consultarUsuario(Integer id) {
    return repository.findById(id);
  }

  public Usuario consultarUsuarioPorEmail(String email) {
    return repository.getUserByEmail(email);
  }

  public Usuario modificarUsuario(Usuario u) {
    u.setContrasenna(encoder.encode(u.getContrasenna()));
    return repository.save(u);
  }

  public void eliminarUsuario(Integer id) {
    repository.deleteById(id);
  }
}
