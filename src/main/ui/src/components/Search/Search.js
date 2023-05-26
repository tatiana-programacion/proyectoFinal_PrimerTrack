import './Search.scss';
import React, { useState, useEffect } from 'react';
import Calendar from '../Calendar/Calendar';
import baseUrl from '../../helpers/api';

const Search = (props) => {
    const [openCity, setOpenCity] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [cityName, setCityName] = useState("");
    const [cityId, setCityId] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [ciudades, setCiudades] = useState([]);
    const [loadCities, setLoadCities] = useState(false);

    const handleSelectDate = (dateRange) => {
        props.onSelectDates(dateRange);
        setOpenCalendar(false);
        setStartDate(`${dateRange[0].getDate()} de ${dateRange[0].toLocaleString('default', { month: 'short' })}.`);
        setEndDate(`${dateRange[1].getDate()} de ${dateRange[1].toLocaleString('default', { month: 'short' })}.`);
    }

    // Traer ciudades
    useEffect(
        () => {
            fetch(`${baseUrl}/ciudades`)
            .then(response => response.json())
            .then(data => {
                setCiudades(data);
                setLoadCities(true);
            })
        }, [props]
    )

    useEffect(
        () => {
            props.onLoadCities(loadCities);
        }, [props, loadCities]
    )
    
    return(
        <div className="search">
            <h1>Busca ofertas en hoteles, casas y mucho más</h1>
            <form onSubmit={e => e.preventDefault()}>
                <div className="location">
                    <select onClick={() => setOpenCity(!openCity)}>
                        { cityName ?  
                        <option selected disabled>{cityName}</option> :
                        <option selected disabled>¿A dónde vamos?</option>
                        }
                    </select>
                    {
                        openCity
                        ? 
                        <div className='select-city'>
                            { ciudades.map((ciudad, index) => {
                                return(
                                <div className='option-city' key={index} onClick={() => {setCityName(ciudad.nombre); setOpenCity(false); setCityId(ciudad.id)}}>
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>{ciudad.nombre}</p>
                                    <p>{ciudad.pais}</p>
                                </div>)
                            })}
                        </div>
                        : <></>
                    }
                </div>
                <div className='field-calendar'>
                    <select onClick={() => setOpenCalendar(!openCalendar)}>
                        { startDate && endDate ?  
                        <option selected disabled>{startDate} - {endDate}</option> :
                        <option selected disabled>Check in - Check out</option>
                        }
                    </select>
                    {openCalendar ? <Calendar onSelectDate={handleSelectDate}/> : <></>}
                </div>
                <button onClick={() => props.onSelectCity(cityId)} className="button1 search-button">Buscar</button>
            </form>
        </div>
    )
}

export default Search;