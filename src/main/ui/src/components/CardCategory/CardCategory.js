import './CardCategory.scss';

const CardCategory = (props) => { 

    return(
        <div className='card-category' onClick={() => props.onSelectCategory(props.details.id)}>
            <img src={props.details.imagenUrl} alt="category"/>
            <div>
                <h3>{props.details.titulo}</h3>
                <h4>{props.details.descripcion}</h4>
            </div>
        </div>
    )
}

export default CardCategory;