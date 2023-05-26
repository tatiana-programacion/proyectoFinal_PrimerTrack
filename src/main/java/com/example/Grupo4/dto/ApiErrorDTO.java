package com.example.Grupo4.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ApiErrorDTO {

  private String error;

  private String message;

  private Integer status;
}
