import './Calendar.scss';
import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";

const Calendar = (props) => { 
    const { pathname } = useLocation();
    let { id } = useParams();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [width, setWidth] = useState(window.innerWidth);
    
    registerLocale("es", es);
    setDefaultLocale("es");

    const changeSize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', changeSize);

        return () => {
            window.removeEventListener('resize', changeSize);
        }
    })

    const handleSelectDate = (date) => {
        if(pathname === `/product/${id}/reserva`){
            props.onSelectStartDate(date[0]);   
            props.onSelectEndDate(date[1]);   
        }
    }

    return(
        <div className='calendar'>
            <div className="pantalla">
            </div>
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                placeholderText="Check-in - Check out"
                onChange={(update) => {
                    setDateRange(update);
                    handleSelectDate(update);
                }}
                dateFormat="yyyy/M/d"
                monthsShown={width < 768 ? 1 : 2}
                locale="es"
                inline
                minDate={new Date()}
                selectsDisabledDaysInRange={false}
                shouldCloseOnSelect={false}
                useWeekdaysShort={true}
                excludeDateIntervals={props.disabledDates}
                formatWeekDay={nameOfDay => nameOfDay.substr(0,1).toUpperCase()}
            >
                <button className='button1 button-calendar' onClick={() => props.onSelectDate(dateRange)}>Aplicar</button>
            </DatePicker>
        </div>
    )
}

export default Calendar;