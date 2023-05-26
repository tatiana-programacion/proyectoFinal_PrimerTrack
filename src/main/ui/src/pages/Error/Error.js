import './Error.scss';
import { Link } from "react-router-dom";


const Error = () => { 

    return(
        <div className='error-404'>
            <h2>Oops! Página no encontrada.</h2>
            <h1>404</h1>
            <p>No hemos podido encontrar la página que desea visualizar</p>
            <Link to="/">Volver al home</Link>
        </div>
    )
}

export default Error;