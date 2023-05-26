import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import baseUrl from '../../helpers/api';
import './FormRegister.scss';
import Swal from 'sweetalert2';

const FormRegister = (props) => { 
    const [errorForm, setErrorForm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const navigate = useNavigate();
    const contrasenna = useRef({});
    contrasenna.current = watch("contrasenna", "");

    const onSubmit = evento => {
        props.onSendRegister(true);
        const {contrasenna_repeat, ...dataUser} = evento;
        dataUser.rol = {id: 2};

        // Enviar datos
        fetch(`${baseUrl}/usuarios`, {
            method: "POST",
            body: JSON.stringify(dataUser),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
            if (!response.ok) {
                props.onSendRegister(false);
                setErrorForm("Lamentablemente no ha podido registrarse. Por favor intente más tarde");
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(data => {
            props.onSendRegister(false);
            Swal.fire({
                title: 'Usuario creado',
                text: 'Su usuario ha sido creado, ya puede iniciar sesión.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#F0572D',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            })
        })
    } 

    return(
        <div onSubmit={handleSubmit(onSubmit)} className='formRegister'> 
            <div className="container">
            {
                errorForm !== "" ?
                <div className='reserva-alert'>
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p>{errorForm}</p>
                </div> :
                <></>
            }
             <h1>Crear Cuenta</h1>  
                <form noValidate>
                    <div className="name-lastname">
                        <div>
                            <label>Nombre</label>   
                            <input type="text" name="nombre" autoComplete="off"{...register("nombre", { 
                            required: "Este campo es requerido."
                            })}/>
                            <ErrorMessage errors={errors} name="nombre" render={({ message }) => <p className="error-message">{message}</p>}/>
                        </div>
                        <div>
                            <label>Apellido</label>
                            <input type="text" name="apellido" required formNoValidate autoComplete="off" {...register("apellido", { 
                        required: "Este campo es requerido."})}/>   
                            <ErrorMessage errors={errors} name="apellido" render={({ message }) => <p className="error-message">{message}</p>}/>
                        </div>
                    </div>
                    <div>
                        <label>Correo electrónico</label>   
                        <input type="email" name="email" required autoComplete="off"{...register("email", { 
                            required: "Este campo es requerido.", 
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: "Formato de email inválido."
                            }
                        })}/>  
                    </div>
                     
                    <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="error-message">{message}</p>}/>
                    
                    <div>
                        <label>Contraseña</label> 
                        <span onClick={() => { setShowPassword(!showPassword) }}>
                        {
                            showPassword ? 
                            <i class="fa-solid fa-eye-slash"></i> :
                            <i class="fa-solid fa-eye"></i> 
                        }
                        </span>
                        <input type={showPassword ? "text" : "password"} name="contrasenna" required autoComplete="off"{...register("contrasenna", { 
                            required: "Este campo es requerido.", 
                            minLength: {
                                value: 7,
                                message: "La contraseña debe contener más de 6 caracteres"
                            }
                            })}
                            />   
                    </div>
                    <ErrorMessage errors={errors} name="contrasenna" render={({ message }) => <p className="error-message">{message}</p>}/>
                    
                    <div>
                        <label>Confirmar contraseña</label>   
                        <input type="password" name="contrasenna_repeat" required autoComplete="off"{...register("contrasenna_repeat", { 
                            required: "Este campo es requerido.", 
                            validate: value =>
                                value === contrasenna.current || "Las contraseñas no coinciden"
                            })}
                        />  
                    </div>
                    <ErrorMessage errors={errors} name="contrasenna_repeat" render={({ message }) => <p className="error-message">{message}</p>}/> 

                    <button type="submit">Crear cuenta</button>   
                    <p>¿Ya tienes cuenta? <Link to="/login"><span>Iniciar sesión</span></Link></p>
                </form>
            </div>
        </div> 
    )
}

export default FormRegister;