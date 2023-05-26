import './AdminPolicies.scss';

const AdminPolicies = (props) => {
    const handleSelectNormas = (e) => {
        props.onSelectNormas((e.target.value).replace(/(\r\n|\n|\r)/gm, ";"));
    }

    const handleSelectSaludSeguridad = (e) => {
        props.onSelectSaludSeguridad((e.target.value).replace(/(\r\n|\n|\r)/gm, ";"))
    }

    const handleSelectCancelacion = (e) => {
        props.onSelectCancelacion((e.target.value).replace(/(\r\n|\n|\r)/gm, ";"))
    }

    return(
        <div className="admin-policies">
            <h2>Políticas del producto</h2>
            <div class="policies">
                <div>
                    <h3>Normas de la casa</h3>
                    <p>Descripción</p>
                    <textarea placeholder='Escriba aquí' onChange={handleSelectNormas}></textarea>
                </div>
                <div>
                    <h3>Salud y seguridad</h3>
                    <p>Descripción</p>
                    <textarea placeholder='Escriba aquí' onChange={handleSelectSaludSeguridad}></textarea>
                </div>
                <div>
                    <h3>Política de cancelación</h3>
                    <p>Descripción</p>
                    <textarea placeholder='Escriba aquí' onChange={handleSelectCancelacion}></textarea>
                </div>
            </div>
            {
                props.errorPoliticas &&
                <div className="error">
                    <p>{props.errorPoliticas}</p>
                </div>
            }
            
        </div>
    )
}

export default AdminPolicies;