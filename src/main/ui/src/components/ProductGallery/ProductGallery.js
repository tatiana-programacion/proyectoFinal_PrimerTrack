
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import "./ProductGallery.scss";
import { Autoplay, Pagination, FreeMode, Navigation, Thumbs } from "swiper";


const ProductGallery = ({imagenes}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [modal, setModal] = useState(false);
    // const [thumbsSwiper, setThumbsSwiper] = useState(null);


    const changeSize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', changeSize);
        return () => {
            window.removeEventListener('resize', changeSize);
        }
    })
     if(width < 1024){
        return(
            <div className="product-gallery">
                <div className="product-content">
                <Swiper
                    pagination={{
                        type: "fraction",
                    }}
                    spaceBetween={50}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    className="mySwiper"
                >
                    {imagenes.map((image, index) => <SwiperSlide key={index}><img src={image.url} alt={image.titulo}/></SwiperSlide>)}
                </Swiper>
                </div>
            </div> 
        )
     } else {
        return(
            <div className="product-gallery">
                <div className="product-content">
                    <div className='gallery-desktop'>
                        <div className='gallery-1'>
                            <img src={imagenes[0].url} alt="slide-images"/>
                        </div>
                        <div className="gallery-4">
                            <img src={imagenes[1].url} alt="slide-images"/>
                            <img src={imagenes[2].url} alt="slide-images"/>
                            <img src={imagenes[3].url} alt="slide-images"/>
                            <img src={imagenes[4].url} alt="slide-images"/>
                        </div>
                        <button onClick={() => { setModal(true)}}>Ver más</button>
                    </div>
                </div>
                {
                    modal ? <div class="gallery-modal">
                    <div>
                        <i onClick={() => { setModal(false)}} class="fa-solid fa-xmark"></i>
                    <Swiper
                        style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                        }}
                        pagination={{
                            type: "fraction",
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        // thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Pagination, Navigation, Thumbs]}
                        className="mySwiper2"
                    >
                        {imagenes.map((image, index) => <SwiperSlide key={index}><img src={image.url} alt={image.titulo}/></SwiperSlide>)}
                    </Swiper>
                    <Swiper
                        // onSwiper={(swiper) => setThumbsSwiper(swiper)}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {imagenes.map((image, index) => <SwiperSlide key={index}><img src={image.url} alt={image.titulo}/></SwiperSlide>)}
                        
                    </Swiper>
                    </div>
                </div> : <></>
                }
                
            </div> 
        )
     }
}

export default ProductGallery;