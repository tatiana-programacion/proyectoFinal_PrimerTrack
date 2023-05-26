import './CardListContainer.scss';
import React, { useState, useEffect, useContext } from 'react';
import baseUrl from "../../helpers/api";
import CardList from '../CardList/CardList';
import { UserContext } from "../../context/UserContext";


const CardListContainer = (props) => { 
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [loadCards, setLoadCards] = useState(false);
    const [withoutResults, setWithoutResults] = useState(false);
    const { user } = useContext(UserContext);

    // Traer todos los productos 
    useEffect(
        () => {
            try{
                fetch(`${baseUrl}/productos`)
                .then(response => response.json())
                .then(elements => {
                    if(!user.auth){
                        elements = elements.sort(() => Math.random() - 0.5); // Aleatorio
                    }else {
                        elements = elements.sort((a, b) => a.id - b.id);
                    }
                    setProducts(elements);
                    setFilterProducts(elements);
                    setLoadCards(true);
                    setWithoutResults(true);
                })
            } catch(e){
                console.log(e);
            }
        }, [user.auth]
    )

    useEffect(() => {
        props.onLoadCards(loadCards);
    }, [props, loadCards])

    useEffect(
        () => {
            const filterCategory = (filterProd) => {
                let filter = filterProd.filter(product => product.categoria.id === props.filterCategory)
                setFilterProducts(filter);
            }

            const filterCity = () => {
                try{
                    fetch(`${baseUrl}/productos/ciudad?&id=${props.filterCity}`)
                    .then(response => response.json())
                    .then(data => {
                        if(props.filterCategory > 0){
                            filterCategory(data);
                        } else {
                            setFilterProducts(data);
                        }
                        setLoadCards(true);
                    })
                } catch(e){
                    console.log(e);
                }
            }

            const filterDates = (startDate, endDate) => {
                fetch(`${baseUrl}/productos/fechas?fechaInicial=${startDate}&fechaFinal=${endDate}`)
                .then(response => response.json())
                .then(data => {
                    if(props.filterCategory > 0){
                        filterCategory(data);
                    } else {
                        setFilterProducts(data);
                    }
                    setLoadCards(true);
                })
            }

            const filterCityAndDates = (idCiudad, startDate, endDate) => {
                fetch(`${baseUrl}/productos/ciudadyfechas?idCiudad=${idCiudad}&fechaInicial=${startDate}&fechaFinal=${endDate}`)
                .then(response => response.json())
                .then(data => {
                    if(props.filterCategory > 0){
                        filterCategory(data);
                    } else {
                        setFilterProducts(data);
                    }
                    setLoadCards(true);
                })
            }
            
            // Si solo se selecciona categoria
            if(props.filterCategory > 0 && props.filterCity === 0 && props.filterDates.length === 0){
                filterCategory(products);
            }

            // Al seleccionar solo ciudad
            if(props.filterCity > 0 && props.filterDates.length === 0){
                setLoadCards(false);
                filterCity();
            }

            // Al seleccionar solo fecha
            if(props.filterDates.length > 0 && props.filterCity === 0){
                setLoadCards(false);
                filterDates(formatDate(props.filterDates[0]), formatDate(props.filterDates[1]))
            }

            // Al seleccionar fecha & ciudad
            if(props.filterDates.length > 0 && props.filterCity > 0){
                setLoadCards(false);
                filterCityAndDates(props.filterCity, formatDate(props.filterDates[0]), formatDate(props.filterDates[1]))
            }
        }, [props.filterCity, props.filterCategory, props.filterDates, products]
    )

    const formatDate = (date) => {
        return [
            date.getFullYear(),
            ((date.getMonth() + 1).toString().padStart(2, '0')),
            (date.getDate().toString().padStart(2, '0')),          
        ].join('-'); 
    }

    return(
        <div className="card-list-container">
            <div className='content'>
                <h2>Recomendaciones</h2>
                {filterProducts.length > 0 ? 
                <div>
                { filterProducts.map((product, index) => <CardList details={product} key={index}/>) }
                </div>
                : <div className='without-results'> 
                    {
                        withoutResults &&  <p>No hay resultados para su búsqueda.</p>
                    }
                    </div>
                }
            </div>
        </div>
    )
}

export default CardListContainer;