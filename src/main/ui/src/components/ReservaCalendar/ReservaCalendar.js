import React, { useState, useEffect } from 'react';
import "./ReservaCalendar.scss";
import Calendar from "../Calendar/Calendar";
import baseUrl from "../../helpers/api";
import { useParams } from "react-router";

const ReservaCalendar = (props) => {
    let { id } = useParams();
    const [disabledDates, setDisabledDates] = useState([]);
    const [loadDisabledDates, setLoadDisabledDates] = useState(false);

    useEffect(
        () => {
            try{
                fetch(`${baseUrl}/reservas/producto?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    let datesToDisabled = [];
                    data.forEach(reserva => {
                        let fechaInicio = createDate(reserva.fechaInicio);
                        let fechaFin = createDate(reserva.fechaFinal);
                        datesToDisabled.push({
                            "start": fechaInicio,
                            "end": fechaFin
                        })
                    })
                    setDisabledDates(datesToDisabled);
                    setLoadDisabledDates(true);
                })
            } catch(e){
                console.log(e);
            }
        }, [id]
    )

    useEffect(
        () => {
            props.onLoadDisabledDates(loadDisabledDates);
        }, [props, loadDisabledDates]
    ) 

    const createDate = (strDate) => {
        let date = strDate.split('-');
        return new Date(date[0], date[1] - 1, date[2]);
    }
    const handleStartDate = (startDate) => {
        if(startDate !== null){
            props.onSelectStartDate(formatDate(startDate));
        }
    }

    const handleEndDate = (endDate) => {
        if(endDate !== null){
            props.onSelectEndDate(formatDate(endDate));
        } else{
            props.onSelectEndDate("");
        }
    }
    

    const formatDate = (date) => {
        return [
            (date.getDate().toString().padStart(2, '0')),
            ((date.getMonth() + 1).toString().padStart(2, '0')),
            date.getFullYear(),
        ].join('/'); 
    }

    return(
        <div className="reserva-calendar">
            <div className="reserva-content">
                <h2>Seleccioná tu fecha de reserva</h2>
                <div>
                    <Calendar disabledDates={disabledDates} onSelectStartDate={handleStartDate} onSelectEndDate={handleEndDate}/>
                </div>
            </div>
            
        </div> 
    )
}

export default ReservaCalendar;