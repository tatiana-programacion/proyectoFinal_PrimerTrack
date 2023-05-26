import "./ReservaSuccess.scss";
import {Link} from 'react-router-dom';

import image from "../../img/success.svg"

const ReservaSuccess = () => {
    return(
        <section className="reserva-success">
            <div className="sucess-container">
                <img src={image} alt="success"/>
                <h2>¡Muchas gracias!</h2>
                <h3>Su reserva se ha realizado con éxito</h3>
                <Link to="/"><button>OK</button></Link>
            </div>
        </section>
    )
}


export default ReservaSuccess;