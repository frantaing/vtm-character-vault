import React from 'react';
// import swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

function ImageCarousel({ images, type, clan, characterName }) {
    if (!images || images.length === 0) {
        return null; // don't render anything if there are no images
    }
    
    // build the image path based on type
    const getImagePath = (imageFile) => {
      if (type === 'character' && clan) {
          return `${import.meta.env.BASE_URL}assets/character-imgs/${clan}/${imageFile}`;
      } else if (type === 'clan') {
          return `${import.meta.env.BASE_URL}assets/clan-imgs/${imageFile}`;
      }
      return imageFile; // fallback
    };
    
    // for handling single images:
    if (images.length === 1) {
        return (
            <div className="w-full mb-4 rounded-md">
                <img
                    src={getImagePath(images[0])}
                    alt={characterName || 'Image'}
                    className="w-full object-contain"
                />
            </div>
        );
    }
    
    // if there is more than one image:
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
            className="custom-carousel w-full mb-4 rounded-md"
        >
            {images.map((imageFile, index) => (
              <SwiperSlide key={index}>
                <img
                    src={getImagePath(imageFile)}
                    alt={`${characterName || 'Image'} - ${index + 1}`}
                    className="w-full object-contain"
                />
              </SwiperSlide>
            ))}
            
            {/* pagination buttons */}
            <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-black/50 rounded-full cursor-pointer sm:w-8 sm:h-8">
                <img 
                    src={`${import.meta.env.BASE_URL}/assets/icons/arrow-left-stroke.png`} 
                    alt="Previous" 
                    className="w-full h-full"
                />
            </button>
            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-black/50 rounded-full cursor-pointer sm:w-8 sm:h-8">
                <img 
                    src={`${import.meta.env.BASE_URL}/assets/icons/arrow-right-stroke.png`} 
                    alt="Next" 
                    className="w-full h-full"
                />
            </button>
        </Swiper>
    );
}

export default ImageCarousel;