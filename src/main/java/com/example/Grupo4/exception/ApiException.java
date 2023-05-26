package com.example.Grupo4.exception;

import java.io.Serial;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiException extends RuntimeException {

  @Serial
  private static final long serialVersionUID = -8185697551041795724L;

  private final String code;

  private final String description;

  private final Integer statusCode;
}
