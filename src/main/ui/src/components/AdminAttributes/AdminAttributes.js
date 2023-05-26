import { useEffect, useState } from 'react';
import baseUrl from "../../helpers/api";
import './AdminAttributes.scss';

const AdminAttributes = (props) => {
    const [features, setFeatures] = useState([]);
    const [checkFeatures, setCheckFeatures] = useState([]);
    const [loadAttributes, setLoadAttributes] = useState(false);

    // Obtener caracteristicas
    useEffect(
        () => {
            try{
                fetch(`${baseUrl}/caracteristicas`)
                .then(response => response.json())
                .then(data => {
                    setFeatures(data);
                    setLoadAttributes(true);
                })
            }catch(e){
                console.log(e);
            }
        }, []
    )

    useEffect(
        () => {
            props.onLoadAttributes(loadAttributes);
        }, [props, loadAttributes]
    ) 

    const handleChange = (e) => {
        if(e.target.checked){
            setCheckFeatures([...checkFeatures, Number(e.target.name) ]);
            props.onSelectAtributos([...checkFeatures, Number(e.target.name) ])
        }else{
            setCheckFeatures(checkFeatures.filter(item => item !== Number(e.target.name)))
            props.onSelectAtributos(checkFeatures.filter(item => item !== Number(e.target.name)))
        }
    }   

    return(
        <div className="admin-attributes">
            <h2>Agregar atributos</h2>
            <div className='attributes'>
                {
                    features.map((feature, index) => {
                        return(
                        <div key={index}>
                            <input type="checkbox" name={feature.id} className='custom-checkbox' onChange={handleChange}></input>
                            <span><i className={feature.icono}></i></span>
                            <label>{feature.nombre}</label>
                        </div>
                        )
                    })
                }
            </div>
            {
                props.errorAtributos &&
                <div className="error">
                    <p>{props.errorAtributos}</p>
                </div>
            }
        </div>
    )
}

export default AdminAttributes;