import "./Reserva.scss";
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import baseUrl from "../../helpers/api";
import Loader from "../../components/Loader/Loader";
import Body from "../../components/Body/Body";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import ReservaForm from "../../components/ReservaForm/ReservaForm"
import ReservaCalendar from "../../components/ReservaCalendar/ReservaCalendar";
import ReservaSchedule from "../../components/ReservaSchedule/ReservaSchedule";
import ReservaDetails from "../../components/ReservaDetails/ReservaDetails";
import ProductPolicies from "../../components/ProductPolicies/ProductPolicies";
import Swal from 'sweetalert2';

const Reserva = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hour, setHour] = useState("");
    const [errorDate, setErrorDate] = useState(false);
    const [errorHour, setErrorHour] = useState(false);

    // Loader
    const [showloader, setShowLoader] = useState(true);
    const [loadProduct, setLoadProduct] = useState(false);
    const [loadDisabledDates, setLoadDisabledDates] = useState(false);

    const handleStartDate = (startDate) => {
        setStartDate(startDate);
    }

    const handleEndDate = (endDate) => {
        setEndDate(endDate);
    }

    const handleHour = (hour) => {
        setHour(hour);
    }

    // Formato AAAA-MM-DD
    const formatDate = (date) => {
        date = date.split('/').reverse().join("-");
        return date;
    }

    const handleSubmitReserva = () => {
        if(user.auth){
            validateFields();
            if(hour && startDate && endDate){
                setShowLoader(true);
                const reservaData = {
                    hora: hour,
                    fechaInicio: formatDate(startDate),
                    fechaFinal: formatDate(endDate),
                    producto : {
                        id: parseInt(id)
                    },
                    usuario: {
                        id: user.id
                    }
                }
                fetch(`${baseUrl}/reservas`, {
                    method: "POST",
                    body: JSON.stringify(reservaData),
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        setShowLoader(false);
                        Swal.fire({
                            title: 'Error',
                            text: 'No ha sido posible realizar su reserva',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#F0572D',
                        })
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    setShowLoader(false);
                    navigate("/reserva-exitosa");
                })
            }
        } else {
            navigate(`/login?reserva=${id}`);
        }
    }

    // Validar que los campos esten completos
    const validateFields = () => {
        startDate || endDate ? setErrorDate(false) : setErrorDate(true);
        hour ? setErrorHour(false) : setErrorHour(true);
    }

    // Traer producto por id
    useEffect(
        () => {
            try{
                fetch(`${baseUrl}/productos/${id}`)
                .then(response => response.json())
                .then(data =>{
                    setProduct(data)
                    setLoadProduct(true);
                })
            }catch(e){
                console.log(e);
            }
        }, [id]
    )

    useEffect(
        () => {
            if(loadDisabledDates && loadProduct){
                setShowLoader(false);
            } else{
                setShowLoader(true);
            }
        }, [loadDisabledDates, loadProduct]
    )

    return(
        <section className="reserva">
            {
                showloader && <Loader/>
            }
            <Navbar/>
                { product &&
                    <Body>
                        <ProductTitle nombre={product.nombre} categoria={product.categoria}/>
                            <section className="reserva-contents">
                                <div className="reserva-content-data">
                                    <ReservaForm user={user}/>
                                    <ReservaCalendar onLoadDisabledDates={(load) => setLoadDisabledDates(load)} onSelectStartDate={handleStartDate} onSelectEndDate={handleEndDate}/>
                                    <ReservaSchedule hour={hour} onSelectHour={handleHour}/>
                                </div>
                                <div className="reserva-content-details">
                                    <ReservaDetails details={product} startDate={startDate} endDate={endDate} errorHour={errorHour}  errorDate={errorDate} onSubmitReserva={handleSubmitReserva}/>
                                </div>
                            </section>
                        <ProductPolicies politica={product.politica}/>
                    </Body>
                }
            <Footer/>
        </section> 
    )
}

export default Reserva;