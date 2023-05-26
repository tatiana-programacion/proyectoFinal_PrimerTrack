import "./ProductPolicies.scss";

const ProductPolicies = ({politica}) => {
    return(
        <div className="product-policies">
            <div className="product-content">
                <h1>Qué tenes que saber</h1>
                <div className="policies-options">
                    <div>
                        <h2>Normas de la casa</h2>
                        {
                            politica.normas.split(";").map((norma, index) => <p key={index}>{norma}</p>)
                        }
                    </div>
                    <div>
                        <h2>Salud y seguridad</h2>
                        {
                            politica.saludSeguridad.split(";").map((norma, index) => <p key={index}>{norma}</p>)
                        }
                    </div>
                    <div>
                        <h2>Política de cancelación</h2>
                        {
                            politica.cancelacion.split(";").map((norma, index) => <p key={index}>{norma}</p>)
                        }
                    </div>
                </div>
                
            </div>
        </div> 
    )
}

export default ProductPolicies;