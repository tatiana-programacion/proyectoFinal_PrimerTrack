package com.example.Grupo4.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Grupo4.dto.ReservaDTO;
import com.example.Grupo4.model.Reserva;
import com.example.Grupo4.repository.IReservaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Service
public class ReservaService {

    private final IReservaRepository reservaRepository;
    private final ObjectMapper mapper;

    public ReservaService(IReservaRepository reservaRepository, ObjectMapper mapper) {
      this.reservaRepository = reservaRepository;
      this.mapper = mapper;
      mapper.registerModule(new Jdk8Module());
      mapper.registerModule(new JavaTimeModule());
    }

    public Collection<Reserva> filtrarReservasPorFechas(LocalDate fechaInicio, LocalDate fechaFinal){
      return reservaRepository.entreFechas(fechaInicio, fechaFinal);
    }

  
    public Reserva crearReserva(Reserva reserva){
      return reservaRepository.save(reserva);
    }
  
    public Optional<Reserva> consultarReserva(Integer id){      
      return reservaRepository.findById(id);
    }
  
    public ReservaDTO[] consultarTodasLasReservaes(){
      return mapper.convertValue(reservaRepository.findAll(), ReservaDTO[].class);
    }
  
    public Reserva modificarReserva(Reserva o){
      return reservaRepository.save(o);
    }
  
    public void eliminarReserva(Integer id){
      reservaRepository.deleteById(id);
    }

    public ReservaDTO[] filtrarReservaPorProducto(Integer id){
      Collection<Reserva> todasLasReservas = reservaRepository.findAll();
      Collection<Reserva> reservasFiltradas = new ArrayList<>();
    
      for (Reserva reserva : todasLasReservas){
        if(reserva.getProducto().getId().equals(id)){
          reservasFiltradas.add(reserva);
        };
      }    
      return mapper.convertValue(reservasFiltradas, ReservaDTO[].class);
    }

    public ReservaDTO[] filtrarReservasPorUsuario(Integer id){
      Collection<Reserva> reservas = reservaRepository.findAll();
      Collection<Reserva> reservasFiltradas = new ArrayList<>();
  
      for (Reserva Reserva : reservas){
        if(Reserva.getUsuario().getId().equals(id)){
          reservasFiltradas.add(Reserva);
        };
      }          
      return mapper.convertValue(reservasFiltradas, ReservaDTO[].class);
    }
    
}
