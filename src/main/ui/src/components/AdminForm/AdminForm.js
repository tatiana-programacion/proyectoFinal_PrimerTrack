import './AdminForm.scss';
import React, { useState, useEffect} from 'react';
import baseUrl from "../../helpers/api";

const AdminForm = (props) => {
    const [categories, setCategories] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [selectCity, setSelectCity] = useState({});
    const [selectCategory, setSelectCategory] = useState({});
    const [openCity, setOpenCity] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [loadCities, setLoadCities] = useState(false);
    const [loadCategories, setLoadCategories] = useState(false);

    // Obtener categorias
    useEffect(
        () => {
            try{
                fetch(`${baseUrl}/categorias`)
                .then(response => response.json())
                .then(data => {
                    setCategories(data);
                    setLoadCategories(true);
                })
            }catch(e){
                console.log(e);
            }
        }, []
    )
    // Obtener ciudades
    useEffect(
        () => {
            try{
                fetch(`${baseUrl}/ciudades`)
                .then(response => response.json())
                .then(data => {
                    setCiudades(data);
                    setLoadCities(true);
                })
            }catch(e){
                console.log(e);
            }
        }, []
    )

    useEffect(
        () => {
            props.onLoadCities(loadCities);
            props.onLoadCategories(loadCategories);
        }, [props, loadCities, loadCategories]
    ) 

    const handleSelectNombre = (e) => {
        props.onSelectNombre(e.target.value);
    }

    const handleSelectCategoria = (category) => {
        setSelectCategory(category);
        setOpenCategory(false); 
        props.onSelectCategoria(category.id);
    }

    const handleSelectDireccion = (e) => {
        props.onSelectDireccion(e.target.value);
    }

    const handleSelectCiudad = (ciudad) => {
        setSelectCity(ciudad); 
        setOpenCity(false)
        props.onSelectCiudad(ciudad.id);
    }

    const handleSelectDescripcion = (e) => {
        props.onSelectDescripcion(e.target.value);
    }
 
    return(
        <div className='admin-form'>
            <div className="info">
                <div>
                    <label>Nombre de la propiedad</label>
                    <input type="text" placeholder="Nombre" onChange={handleSelectNombre}/>
                </div>
                <div>
                    <label>Categoría</label>
                    <select onClick={() => setOpenCategory(!openCategory)}>
                        {
                            Object.keys(selectCategory).length === 0 ? 
                            <option selected disabled>Categoría</option> :
                            <option selected disabled>{selectCategory.titulo}</option>  
                            
                        }
                    </select>
                    {
                        openCategory && 
                        <div className='custom-select'>
                        { categories.map((category, index) => {
                            return(
                            <div className='custom-option' key={index} onClick={() => {handleSelectCategoria(category)}}>
                                <p>{category.titulo}</p>
                            </div>)
                        })}
                    </div>

                    }
                    
                </div>
                <div>
                    <label>Dirección</label>
                    <input type="text" placeholder="Dirección" onChange={handleSelectDireccion}/>
                </div>
                    
                <div>
                    <label>Ciudad</label>
                    <select onClick={() => setOpenCity(!openCity)}>
                        {
                            Object.keys(selectCity).length === 0 ? 
                            <option selected disabled>Ciudad</option> : 
                            <option selected disabled>{selectCity.nombre}, {selectCity.pais}</option>
                        }
                    </select>
                    {
                        openCity && 
                        <div className='custom-select'>
                        { ciudades.map((ciudad, index) => {
                            return(
                            <div className='custom-option' key={index} onClick={() => handleSelectCiudad(ciudad)}>
                                <p>{ciudad.nombre}, {ciudad.pais}</p>
                            </div>)
                        })}
                    </div>
                    }
                    
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea placeholder="Escribe aquí" onChange={handleSelectDescripcion}></textarea>
                </div>
            </div>
            {
                
                <div className="error">
                    <p>{props.errorInfo}</p>
                </div>
            }
        </div>
    )
}

export default AdminForm;