package com.example.Grupo4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDTO {

  private UsuarioDTO usuario;

  private String jwt;
}
