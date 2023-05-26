package com.example.Grupo4.dto;

import com.example.Grupo4.model.Rol;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UsuarioDTO {

  private Integer id;

  private String nombre;

  private String apellido;

  private String email;

  private String ciudad;

  private Rol rol;
}
