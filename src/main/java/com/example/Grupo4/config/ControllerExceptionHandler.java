package com.example.Grupo4.config;

import com.example.Grupo4.dto.ApiErrorDTO;
import com.example.Grupo4.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler {

  //Handler para excepciones de la API
  @ExceptionHandler(ApiException.class)
  protected ResponseEntity<ApiErrorDTO> handleApiException(ApiException e) {
    Integer statusCode = e.getStatusCode();
    if (!(HttpStatus.INTERNAL_SERVER_ERROR.value() > statusCode)) {
      log.error("Error de la API. Código de status: " + statusCode, e);
    }
    ApiErrorDTO apiError = new ApiErrorDTO(e.getCode(), e.getDescription(), statusCode);
    return ResponseEntity.status(apiError.getStatus()).body(apiError);
  }

  //Handler para excepciones desconocidas / no esperadas
  @ExceptionHandler(Exception.class)
  protected ResponseEntity<ApiErrorDTO> handleUnknownException(Exception e) {
    log.error("Error interno", e);
    ApiErrorDTO apiError = new ApiErrorDTO("internal_error", e.getMessage(), 500);
    return ResponseEntity.status(apiError.getStatus()).body(apiError);
  }
}
