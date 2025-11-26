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
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-80 mb-4 rounded-md"
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
        </Swiper>
    );
}

export default ImageCarousel;