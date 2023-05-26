package com.example.Grupo4.repository;

import java.time.LocalDate;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.Grupo4.model.Reserva;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Integer> {

    @Query(
        "SELECT r FROM Reserva r " +
        "WHERE (?1 BETWEEN r.fechaInicio AND r.fechaFinal) " +
        "OR (?2 BETWEEN r.fechaInicio AND r.fechaFinal) " +
        "OR (?1 < fechaInicio AND ?2 > r.fechaFinal)"
    )
    Collection<Reserva> entreFechas(LocalDate fechaInicio, LocalDate fechaFinal);


}
