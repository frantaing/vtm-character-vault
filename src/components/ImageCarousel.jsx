import React from 'react';
// import swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

function ImageCarousel({ images, clan, characterName }) {
    if (!images || images.length === 0) {
        return null; // don't render anything if there are no images
    }

    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
            pagination={{ clickable: true }}
            loop={true}
            className="custom-carousel w-full h-80 mb-4 rounded-md"
        >
            {images.map((imageFile, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={`${import.meta.env.BASE_URL}/assets/character-imgs/${clan}/${imageFile}`}
                        alt={`${characterName} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
            ))}
            
            {/* pagination buttons */}
            <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full cursor-pointer">
                <img 
                    src={`${import.meta.env.BASE_URL}/assets/icons/arrow-left-stroke.png`} 
                    alt="Previous" 
                    className="w-full h-full"
                />
            </button>
            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 rounded-full cursor-pointer rotate-180">
                <img 
                    src={`${import.meta.env.BASE_URL}/assets/icons/arrow-left-stroke.png`} 
                    alt="Next" 
                    className="w-full h-full"
                />
            </button>
        </Swiper>
    );
}

export default ImageCarousel;