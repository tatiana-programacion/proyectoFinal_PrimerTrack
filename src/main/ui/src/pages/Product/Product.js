import "./Product.scss";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import baseUrl from "../../helpers/api";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import ProductLocation from "../../components/ProductLocation/ProductLocation";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import ProductFeatures from "../../components/ProductFeatures/ProductFeatures";
import ProductReservation from "../../components/ProductReservation/ProductReservation";
import ProductMap from "../../components/ProductMap/ProductMap";
import ProductPolicies from "../../components/ProductPolicies/ProductPolicies";
import Footer from "../../components/Footer/Footer";
import Body from "../../components/Body/Body";

const Product = () => {
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showloader, setShowLoader] = useState(true);
    const [loadDisabledDates, setLoadDisabledDates] = useState(false);
    const [loadProduct, setLoadProduct] = useState(false);
    
    // Traer producto por id
    useEffect(
        () => {
            try{
                fetch(`${baseUrl}/productos/${id}`)
                .then(response => response.json())
                .then(data =>{
                    setProduct(data)
                    setLoadProduct(true);
                })
            }catch(e){
                console.log(e);
            }
        }, [id]
    )

    useEffect(
        () => {
            if(loadDisabledDates && loadProduct){
                setShowLoader(false);
            } else{
                setShowLoader(true);
            }
        }, [loadDisabledDates, loadProduct]
    )

    return(
        <section className="product">
            {
                showloader && <Loader/>
            }
            <Navbar/>
                {product ? 
                <Body>
                    <ProductTitle nombre={product.nombre} categoria={product.categoria}/>
                    <ProductLocation ciudad={product.ciudad} />
                    <ProductGallery imagenes={product.imagenes}/>
                    <ProductDescription descripcion={product.descripcion} ciudad={product.ciudad}/>
                    <ProductFeatures caracteristicas={product.caracteristicas}/>
                    <ProductReservation onLoadDisabledDates={(load) => setLoadDisabledDates(load)}/>
                    <ProductMap/>
                    <ProductPolicies politica={product.politica}/>
                </Body> : <></>
                }
            <Footer/>
        </section> 
    )
}

export default Product;