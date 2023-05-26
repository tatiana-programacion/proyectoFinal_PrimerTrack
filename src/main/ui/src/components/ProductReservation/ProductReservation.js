import React, { useState, useEffect, useContext } from 'react';
import "./ProductReservation.scss";
import Calendar from "../Calendar/Calendar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import baseUrl from "../../helpers/api";
import { UserContext } from "../../context/UserContext";

const ProductReservation = (props) => {
    const { user } = useContext(UserContext);
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
    
    return(
        <div className="product-reservation">
            <div className="product-content">
                <h1>Fechas disponibles</h1>
                <div>
                    <div className="reservation-calendar">
                        <Calendar disabledDates={disabledDates}/>
                    </div>
                    <div className="reservation">
                        <h3>Agregá tus fechas de viaje para obtener precios exactos</h3>
                        { user.auth ? 
                        <Link to={`/product/${id}/reserva`}><button className="button1" >Iniciar reserva</button></Link> : 
                        <Link to={`/login?reserva=${id}`}><button className="button1" >Iniciar reserva</button></Link>
                        }
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default ProductReservation;