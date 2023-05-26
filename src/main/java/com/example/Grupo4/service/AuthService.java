package com.example.Grupo4.service;

import com.example.Grupo4.model.Usuario;
import com.example.Grupo4.repository.IUsuarioRepository;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

  private final IUsuarioRepository repository;

  public AuthService(IUsuarioRepository repository) {
    this.repository = repository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Usuario usuario = repository.getUserByEmail(email);
    GrantedAuthority autorizacion = new SimpleGrantedAuthority(usuario.getRol().getNombre());

    User userDetail = new User(
        usuario.getEmail(),
        usuario.getContrasenna(),
        true,
        true,
        true,
        true,
        List.of(autorizacion));

    return userDetail;
  }
}
