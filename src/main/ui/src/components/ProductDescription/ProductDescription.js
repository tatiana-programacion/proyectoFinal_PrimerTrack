import "./ProductDescription.scss";


const ProductDescription = ({descripcion, ciudad}) => {
    return(
        <div className="product-description">
            <div className="product-content">
                <h1>Alójate en el corazón de {ciudad.nombre}</h1>
                <p className="text1">{descripcion}</p>
            </div>
        </div> 
    )
}

export default ProductDescription;