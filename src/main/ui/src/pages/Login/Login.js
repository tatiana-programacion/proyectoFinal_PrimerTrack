import "./Login.scss";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FormLogin from "../../components/FormLogin/FormLogin";
import Loader from "../../components/Loader/Loader";


const Home = () => {
    const [showloader, setShowLoader] = useState(false);

    return(
        <>
            {
                showloader && <Loader/>
            }
            <Navbar/>
            <FormLogin onSendLogin={(load) => setShowLoader(load)}/>
            <Footer/>
        </>
            
    )
}
export default Home;

