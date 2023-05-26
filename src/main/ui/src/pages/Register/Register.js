import "./Register.scss";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FormRegister from "../../components/FormRegister/FormRegister";
import Loader from "../../components/Loader/Loader";


const Register = () => {
    const [showloader, setShowLoader] = useState(false);

    return(
        <>
            {
                showloader && <Loader/>
            }
            <Navbar/>
            <FormRegister onSendRegister={(load) => setShowLoader(load)}/>
            <Footer/>
        </>
            
    )
}
export default Register;

