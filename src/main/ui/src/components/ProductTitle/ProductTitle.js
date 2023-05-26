import "./ProductTitle.scss";
import {Link, useLocation} from 'react-router-dom';
import { useParams } from "react-router";

const ProductTitle = ({nombre, categoria}) => {
    let { id } = useParams();
    let location = useLocation();
    return(
        <div className="product-title">
            <div className="product-content">
                <div>
                    <h4>{categoria.titulo}</h4>
                    <h1>{nombre}</h1>
                </div>
                { location.pathname.includes('reserva') ?
                    <Link to={`/product/${id}`}><i class="fa-solid fa-chevron-left"></i></Link> : 
                    <Link to="/"><i class="fa-solid fa-chevron-left"></i></Link>
                }
                
            </div>
        </div> 
    )
}

export default ProductTitle;