// import: react stuff
import React from 'react';
import ReactMarkdown from 'react-markdown';
// import: swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import: swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import: swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules';
// import: components
import { customRenderers } from '../utils/MarkdownComponents';

// full style control over ReactMarkdown
// so that styling remains consistent
const captionRenderers = {
  p: ({ children }) => <>{children}</>, // render children directly without a <p> wrapper
  ...customRenderers // keep the smart link renderer
};

function ImageCarousel({ images, type, clan, characterName }) {
    if (!images || images.length === 0) {
        return null; // don't render anything if there are no images
    }
    
    // build the image path based on type
    const getImagePath = (imageFile) => {
      if (type === 'character' && clan) {
          return `/assets/character-imgs/${clan}/${imageFile}`;
      } else if (type === 'clan') {
          return `/assets/clan-imgs/${imageFile}`;
      }
      return imageFile; // fallback
    };
    
    // for single vs. multiple images
    if (images.length === 1) {
        const image = images[0];
        return (
            <div className="group relative w-full h-fit mb-4 rounded-md">
                <img
                    src={getImagePath(image.file)} // <-- use image.file
                    alt={characterName || 'Image'}
                    className="w-full h-full object-contain"
                />
                {/* conditionally render the caption */}
                {image.artist && (
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-2 text-center text-xs italic text-white bg-black/50 opacity-100 rounded-b-md transition sm:opacity-0 sm:group-hover:opacity-100">
                    <ReactMarkdown components={captionRenderers}>
                        {`Art by ${image.artist}`}
                    </ReactMarkdown>
                  </div>
                )}
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
            className="custom-carousel group relative w-full h-fit mb-4 rounded-md"
        >
            {images.map((image, index) => ( // <-- `image` is now an object
                <SwiperSlide key={index}>
                    <img
                      src={getImagePath(image.file)} // <-- Use image.file
                      alt={`${characterName || 'Image'} - ${index + 1}`}
                      className="w-full h-full object-contain rounded-md"
                    />
                    {/* conditionally render the caption inside the slide */}
                    {image.artist && (
                      <div className="absolute bottom-0 left-0 right-0 z-10 p-2 text-center text-xs italic text-white bg-black/50 opacity-100 rounded-b-md transition sm:opacity-0 sm:group-hover:opacity-100">
                        <ReactMarkdown components={captionRenderers}>
                            {`Art by ${image.artist}`}
                        </ReactMarkdown>
                      </div>
                    )}
                </SwiperSlide>
            ))}
            
            {/* pagination buttons */}
            <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-black/50 rounded-full cursor-pointer opacity-100 transition md:w-8 md:h-8 sm:opacity-0 sm:group-hover:opacity-100">
                <img 
                    src={`/assets/icons/arrow-left-stroke.png`} 
                    alt="Previous" 
                    className="w-full h-full"
                />
            </button>
            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-black/50 rounded-full cursor-pointer opacity-100 transition md:w-8 md:h-8 sm:opacity-0 sm:group-hover:opacity-100">
                <img 
                    src={`/assets/icons/arrow-right-stroke.png`} 
                    alt="Next" 
                    className="w-full h-full"
                />
            </button>
        </Swiper>
    );
}

export default ImageCarousel;