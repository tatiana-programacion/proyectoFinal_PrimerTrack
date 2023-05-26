package com.example.Grupo4.dto;

import com.example.Grupo4.model.Producto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaDTO {

  private Integer id;

  private String hora;

  private LocalDate fechaInicio;

  private LocalDate fechaFinal;

  private Producto producto;

  private UsuarioDTO usuario;
}
