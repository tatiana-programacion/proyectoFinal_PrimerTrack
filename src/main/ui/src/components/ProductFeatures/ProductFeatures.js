import "./ProductFeatures.scss";


const ProductFeatures = ({caracteristicas}) => {
    return(
        <div className="product-features">
            <div className="product-content">
                <h1>¿Qué ofrece este lugar?</h1>
                <div>
                    { caracteristicas.map((caracteristica, index) => <div className="feature" key={index}><i className={caracteristica.icono}></i><p>{caracteristica.nombre}</p></div>)}
                </div>
            </div>
        </div> 
    )
}

export default ProductFeatures;