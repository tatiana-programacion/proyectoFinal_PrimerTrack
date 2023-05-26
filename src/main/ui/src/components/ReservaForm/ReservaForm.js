import "./ReservaForm.scss";

const ReservaForm = ({user}) => {
    return(
        <div className="reserva-form">
            <div className="reserva-content">
            <h2>Completá tus datos</h2>
                <form>
                    <div>
                        <label className="text2">Nombre</label>   
                        <input className="text2" type="text" name="name" autoComplete="off" value={user.nombre} disabled/>
                    </div>
                    <div>
                        <label className="text2">Apellido</label>   
                        <input className="text2" type="text" name="name" autoComplete="off" value={user.apellido} disabled/>
                    </div>
                    <div>
                        <label className="text2">Correo electrónico</label>   
                        <input className="text2" type="email" name="name" autoComplete="off" value={user.email} disabled/>
                    </div>
                    <div>
                        <label className="text2">Ciudad</label>   
                        <input className="text2" type="text" name="name" autoComplete="off" value={user.ciudad}/>
                    </div>
                </form>
            </div>
        </div> 
    )
}

export default ReservaForm;