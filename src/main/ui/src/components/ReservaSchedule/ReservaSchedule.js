import "./ReservaSchedule.scss";
import React, { useState } from 'react';

const ReservaSchedule = (props) => {
    const [openHour, setOpenHour] = useState(false);
    return(
        <div className="reserva-schedule">
            <div className="reserva-content">
                <h2>Tu horario de llegada</h2>
                <div>
                    <div className="reserva-text">
                        <i class="fa-regular fa-circle-check"></i>
                        <p>Tu habitación va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM</p>
                    </div>
                    <div className="reserva-select">
                        <p>Indicá tu horario estimado de llegada</p>
                        <select onClick={() => setOpenHour(!openHour)}>
                            <option selected></option>
                            { props.hour ?  
                            <option selected disabled>{props.hour}</option> :
                            <option selected disabled>Indicá tu hora estimada de llegada</option>
                            }
                        </select>
                        {
                            openHour ?
                            <div className="select-hour">
                                <p onClick={() => { props.onSelectHour("00:00 AM"); setOpenHour(false)}}>0:00 AM</p>
                                <p onClick={() => { props.onSelectHour("01:00 AM"); setOpenHour(false)}}>1:00 AM</p>
                                <p onClick={() => { props.onSelectHour("02:00 AM"); setOpenHour(false)}}>2:00 AM</p>
                                <p onClick={() => { props.onSelectHour("03:00 AM"); setOpenHour(false)}}>3:00 AM</p>
                                <p onClick={() => { props.onSelectHour("04:00 AM"); setOpenHour(false)}}>4:00 AM</p>
                                <p onClick={() => { props.onSelectHour("05:00 AM"); setOpenHour(false)}}>5:00 AM</p>
                                <p onClick={() => { props.onSelectHour("06:00 AM"); setOpenHour(false)}}>6:00 AM</p>
                                <p onClick={() => { props.onSelectHour("07:00 AM"); setOpenHour(false)}}>7:00 AM</p>
                                <p onClick={() => { props.onSelectHour("08:00 AM"); setOpenHour(false)}}>8:00 AM</p>
                                <p onClick={() => { props.onSelectHour("09:00 AM"); setOpenHour(false)}}>9:00 AM</p>
                                <p onClick={() => { props.onSelectHour("10:00 AM"); setOpenHour(false)}}>10:00 AM</p>
                                <p onClick={() => { props.onSelectHour("11:00 AM"); setOpenHour(false)}}>11:00 AM</p>
                                <p onClick={() => { props.onSelectHour("12:00 M"); setOpenHour(false)}}>12:00 M</p>
                                <p onClick={() => { props.onSelectHour("01:00 PM"); setOpenHour(false)}}>1:00 PM</p>
                                <p onClick={() => { props.onSelectHour("02:00 PM"); setOpenHour(false)}}>2:00 PM</p>
                                <p onClick={() => { props.onSelectHour("03:00 PM"); setOpenHour(false)}}>3:00 PM</p>
                                <p onClick={() => { props.onSelectHour("04:00 PM"); setOpenHour(false)}}>4:00 PM</p>
                                <p onClick={() => { props.onSelectHour("05:00 PM"); setOpenHour(false)}}>5:00 PM</p>
                                <p onClick={() => { props.onSelectHour("06:00 PM"); setOpenHour(false)}}>6:00 PM</p>
                                <p onClick={() => { props.onSelectHour("07:00 PM"); setOpenHour(false)}}>7:00 PM</p>
                                <p onClick={() => { props.onSelectHour("08:00 PM"); setOpenHour(false)}}>8:00 PM</p>
                                <p onClick={() => { props.onSelectHour("09:00 PM"); setOpenHour(false)}}>9:00 PM</p>
                                <p onClick={() => { props.onSelectHour("10:00 PM"); setOpenHour(false)}}>10:00 PM</p>
                                <p onClick={() => { props.onSelectHour("11:00 PM"); setOpenHour(false)}}>11:00 PM</p>
                            </div> : 
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default ReservaSchedule;