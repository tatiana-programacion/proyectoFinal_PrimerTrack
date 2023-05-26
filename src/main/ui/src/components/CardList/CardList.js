import { Link } from "react-router-dom";
import './CardList.scss';

const CardList = ({details}) => { 
    return(                  
        <div className="card-list">
            <div className="card-image">
                <img  src={details.imagenes[0].url} alt={details.imagenes[0].titulo}/>
            </div>
            <div className="card-details">
                <div>
                    <div className="card-title">
                        <p>{details.categoria.titulo}<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
                        <h3>{details.nombre}</h3>
                    </div>
                    <div className="card-rank">
                        <span>8</span>
                        <p>Muy bueno</p>
                    </div>
                </div>
                <p className="card-distance"><i class="fa-solid fa-location-dot"></i> A 940 m del centro - <span>MOSTRAR EN EL MAPA</span></p>
                <p className="card-description">{details.descripcion}</p> 
                <Link to={`/product/${details.id}`}><button>Ver más</button></Link>
            </div>
        </div>
    )
}

export default CardList;