import "./ProductoExitoso.scss";
import Body from "../../components/Body/Body";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductSuccess from "../../components/ProductSuccess/ProductSuccess";

const ReservaExitosa = () => {
    return(
        <section className="reserva-exitosa">
            <Navbar/>
                <Body>
                    <ProductSuccess/>
                </Body>
            <Footer/>
        </section> 
    )
}


export default ReservaExitosa;