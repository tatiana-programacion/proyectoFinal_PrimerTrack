import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Body from "../../components/Body/Body";
import "./Home.scss";
import React, { useState, useEffect } from 'react';
import Search from "../../components/Search/Search";
import CardListContainer from "../../components/CardListContainer/CardListContainer";
import CardCategoryContainer from "../../components/CardCategoryContainer/CardCategoryContainer";
import Loader from "../../components/Loader/Loader";

const Home = () => {
    const [categoryId, setCategoryId] = useState(0);
    const [cityId, setCityId] = useState(0);
    const [dates, setDates] = useState([]);
    const [showloader, setShowLoader] = useState(true);
    const [loadCards, setLoadCards] = useState(false);
    const [loadCities, setLoadCities] = useState(false);
    const [loadCategories, setLoadCategories] = useState(false);

    useEffect(
        () => {
            if(loadCards && loadCities && loadCategories){
                setShowLoader(false);
            }else{
                setShowLoader(true);
            }
        }, [loadCards, loadCities, loadCategories]
    )

    const handleSelectCity = (cityId) => {
        setCityId(cityId);
    }

    const handleSelectCategory = (categoryId) => {
        setCategoryId(categoryId);
    }

    const handleSelectDates = (dates) => {
        setDates(dates);
    }

    return(
        <>
            {
                showloader && <Loader/>
            }
            <Navbar/>
            <Body>
                <Search onLoadCities={(load) => setLoadCities(load)} onSelectCity={handleSelectCity} onSelectDates={handleSelectDates}/>
                <CardCategoryContainer onLoadCategories={(load) => setLoadCategories(load)} onSelectCategory={handleSelectCategory}/>
                <CardListContainer onLoadCards={(load) => setLoadCards(load)} filterCity={cityId} filterCategory={categoryId} filterDates={dates}/>
            </Body>
            <Footer/>
        </>
            
    )
}
export default Home;

