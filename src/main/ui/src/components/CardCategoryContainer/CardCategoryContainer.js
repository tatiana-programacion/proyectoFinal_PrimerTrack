import './CardCategoryContainer.scss';
import { useEffect, useState } from 'react';
import CardCategory from "../CardCategory/CardCategory";
import baseUrl from '../../helpers/api';

const CardCategoryContainer = (props) => { 
    const [categorias, setCategorias] = useState([]);
    const [loadCategories, setLoadCategories] = useState(false);

    // Traer categorias
    useEffect(
        () => {
            try{
                fetch(`${baseUrl}/categorias`)
                .then(response => response.json())
                .then(data =>{
                    setCategorias(data);
                    setLoadCategories(true);
                } )
            }catch(e){
                console.log(e);
            }
        }, [props]
    )

    useEffect(
        () => {
            props.onLoadCategories(loadCategories);
        }, [props, loadCategories]
    ) 

    const handleSelectCategory = (categoryId) => {
        props.onSelectCategory(categoryId);
    }
    
    return(
        <div className="card-category-container">
            <h2>Buscar por tipo de alojamiento</h2>
            <div>
            { categorias.map((item, index) => <CardCategory onSelectCategory={handleSelectCategory} details={item} key={index}/>)}
            </div>
        </div>
    )
}

export default CardCategoryContainer;