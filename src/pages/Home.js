import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'boxicons'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation } from 'swiper/modules';

import slide_image_1 from '../assets/images/img3.jpeg';
import slide_image_2 from '../assets/images/img3.jpeg';
import slide_image_3 from '../assets/images/img3.jpeg';
import slide_image_4 from '../assets/images/img3.jpeg';
import slide_image_5 from '../assets/images/img3.jpeg';
import slide_image_6 from '../assets/images/img3.jpeg';
import slide_image_7 from '../assets/images/img3.jpeg';

function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const country = params.get('country') || 'defaultCountry';
  const branch = params.get('branch') || 'defaultBranch';
  const bench = params.get('bench') || 'defaultBench';
  const type = params.get('type') || 'defaultType';
  const product = params.get('product') || 'defaultProduct';
  const lang = params.get('lang') || 'en';

  const [data, setData] = useState({ result: { product: '', subProduct: [] } });

  useEffect(() => {
    const apiEndpoint = `https://arabbank.azurewebsites.net/api/Api/GetDiscoveryContent?country=${country}&branch=${branch}&bench=${bench}&type=${type}&product=${product}&lang=${lang}`;
  
    console.log('API Endpoint:', apiEndpoint);
  
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        setData(data);
  
        // Adjust alignment and direction based on language
        const cardElement = document.querySelector('.card');
        const textListElement = document.querySelector('.text-list');
  
        if (lang === 'ar') {
          cardElement.style.textAlign = 'right';
          textListElement.style.direction = 'rtl';
        } else {
          cardElement.style.textAlign = 'left';
          textListElement.style.direction = 'ltr';
        }
      })
      .catch(error => {
        // Display error message
        console.error('Error fetching API:', error);
      });
  }, [country, branch, bench, type, product, lang]);

  const productTitle = data.result ? data.result.product : '';
  const subProducts = data.result ? data.result.subProduct : [];

  return (
    <div className="app-container">
      <div className="empty-card-container">
        <div className="card" id="emptyCard">
          <div className="card-title">{productTitle}</div>
          <ul className="text-list">
            {subProducts.map((subProduct, index) => (
              <li key={index}>
                <div className="hover-container"></div>
                {subProduct}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="swiper-container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          spaceBetween={0}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Navigation]}
          className="swiper_container"
        >
          <SwiperSlide>
            <img src={slide_image_1} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_2} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_3} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_4} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_5} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_6} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_7} alt="slide_image" />
          </SwiperSlide>

          <div className="slider-controler">
            <div className="swiper-button-next slider-arrow">
              <i className='bx bxs-chevron-right' style={{ color: '#ffffff' }} ></i>
            </div>
            <div className="center-content">
              <h3 className="slider-title">Tap to Select</h3>
            </div>
            <div className="swiper-button-prev slider-arrow">
              <i className='bx bxs-chevron-left' style={{ color: '#ffffff' }} ></i>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
