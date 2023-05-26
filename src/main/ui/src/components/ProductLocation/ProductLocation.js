import "./ProductLocation.scss";


const ProductLocation = ({ciudad}) => {
    
    return(
        <div className="product-location">
            <div className="product-content">
                <div className="location">
                    <i class="fa-solid fa-location-dot"></i>
                    <div>
                        <p>{ciudad.nombre}, {ciudad.pais}</p>
                        <p>A 940m del centro</p>
                    </div>
                </div>
                <div className="ranking"></div>
            </div>
        </div> 
    )
}

export default ProductLocation;