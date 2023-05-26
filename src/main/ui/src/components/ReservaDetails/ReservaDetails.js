import "./ReservaDetails.scss";

const ReservaDetails = (props) => {

    return(
        <div className="reserva-details">
            <div className="reserva-content">
                <div className="reserva-card">
                    <h2>Detalle de la reserva</h2>
                    <div>
                        <img src={props.details.imagenes[0].url} alt={props.details.imagenes[0].titulo}/>
                        <div className="content">
                            <p className="category">{props.details.categoria.titulo}</p>
                            <h3>{props.details.nombre}</h3>
                            <span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
                            <p className="location"><i class="fa-solid fa-location-dot"></i>{props.details.ciudad.nombre}, {props.details.ciudad.pais}</p>
                            <div className="check-in">
                                <p>Check in</p>
                                <span>{props.startDate !== "" ? props.startDate : "__/__/__"}</span>
                            </div>
                            <div>
                                <p>Check out</p>
                                <span>{props.endDate !== "" ? props.endDate : "__/__/__"}</span>
                            </div>
                            
                            <button onClick={() => props.onSubmitReserva()} className="button2">Confirmar reserva</button>
                            {props.errorDate && <p className="error">Por favor indica la fecha de reserva</p>}
                            {props.errorHour && <p className="error">Por favor indica tu hora estimada de llegada</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default ReservaDetails;