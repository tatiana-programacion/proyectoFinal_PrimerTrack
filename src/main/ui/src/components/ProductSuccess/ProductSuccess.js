import "./ProductSuccess.scss";
import {Link} from 'react-router-dom';

import image from "../../img/success.svg"

const ReservaSuccess = () => {
    return(
        <section className="product-success">
            <div className="sucess-container">
                <img src={image} alt="success"/>
                <h3>Tu propiedad se ha creado con con éxito</h3>
                <Link to="/"><button>VOLVER</button></Link>
            </div>
        </section>
    )
}


export default ReservaSuccess;