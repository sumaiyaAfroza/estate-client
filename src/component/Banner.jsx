import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing


const banners = [
  {
    id: 1,
    image: 'https://i.postimg.cc/hvLYNkgz/1.jpg',
    alt: 'Luxury Apartment',
    title: 'Find Your Dream Home',
    subtitle: 'Explore thousands of verified properties from trusted agents across the country.',
    buttonText: 'Browse Properties',
    buttonLink: '/allProperties',
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/g2XVJvX4/pexels-binyaminmellish-1396122.jpg',
    alt: 'Modern Living',
    title: 'Live Where You Love',
    subtitle: 'From city apartments to countryside villas, find your perfect match today.',
    buttonText: 'Start Searching',
    buttonLink: '/allProperties', // Added buttonLink
  },
//   {
//     id: 3,
//     image: 'https://i.postimg.cc/vmK6WvZV/images-1.jpg',
//     alt: 'Secure Investment',
//     title: 'Invest in Your Future',
//     subtitle: 'Buy or sell properties with confidence and ease through Nestoria.',
//     buttonText: 'Explore Listings',
//     buttonLink: '/listings', // Added buttonLink
//   },
  {
    id: 3,
    image: 'https://i.postimg.cc/RFVq3Bp9/pexels-nextvoyage-1481105.jpg',
    alt: 'Verified Listings',
    title: 'Only Verified Properties',
    subtitle: 'We ensure every listing is real, secure, and verified by our team.',
    buttonText: 'Check Now',
    buttonLink: '/advertiseSection', // Added buttonLink
  },
];


export default function Banner() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused]);

    // const prevSlide = () => setCurrent(current === 0 ? banners.length - 1 : current - 1);
    // const nextSlide = () => setCurrent(current === banners.length - 1 ? 0 : current + 1);

    return (
        <div
            className="relative w-full h-[700px] aspect-video overflow-hidden rounded-xl shadow-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out
                         ${ index === current ? ' scale-100 z-10' : ' scale-105 z-0' }
                       
                   `}
                >
                    <img
                        src={banner.image}
                        alt={banner.alt}
                        className="w-full h-full object-cover brightness-75"
                        draggable={false}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                        <div className="relative max-w-3xl px-4">
                            <h2
                                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-2xl ${
                                    index === current ? 'animate-slideIn' : ''
                                }`}
                            >
                                {banner.title}
                            </h2>
                            <p
                                className={`text-lg sm:text-xl md:text-2xl font-medium mb-8 drop-shadow-lg ${
                                    index === current ? 'animate-slideIn' : ''
                                }`}
                            > 
                                {banner.subtitle}
                            </p>
                            <div className="text-center">
                                <Link
                                    to={banner.buttonLink}
                                    className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-full text-lg font-semibold shadow-lg"
                                >
                                    {banner.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

      {/* Slide Controls */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-10 transition-all duration-300 hover:scale-110 shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-10 transition-all duration-300 hover:scale-110 shadow-md"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-8 h-8" />
      </button> */}

      {/* Indicator Dots */}
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${
                            index === current
                                ? 'bg-blue-500 scale-150'
                                : 'bg-gray-300/60 hover:bg-gray-200/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

      {/* Animation Styles */}
      <style>
                {`
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes bounceIn {
                        from {
                            opacity: 0;
                            transform: scale(0.8);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .animate-slideIn {
                        animation: slideIn 0.8s ease-out;
                    }
                    .animate-bounceIn {
                        animation: bounceIn 0.6s ease-out;
                    }
                `}
            </style>
    </div>
  );
}



// import React, { useState, useEffect } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';


// const banners = [
//     {
//         id: 1,
//         image: 'https://i.postimg.cc/bvZf7YYn/images-2.jpg',
//         alt: 'Luxury Apartment',
//         title: 'Find Your Dream Home',
//         subtitle: 'Explore thousands of verified properties from trusted agents across the country.',
//         buttonText: 'Browse Properties',
//         buttonLink: '/allProperties'
      
//     },
//     {
//         id: 2,
//         image: 'https://i.postimg.cc/qqS3Gv7G/images-3.jpg',
//         alt: 'Modern Living',
//         title: 'Live Where You Love',
//         subtitle: 'From city apartments to countryside villas, find your perfect match today.',
//         buttonText: 'Start Searching',
//     },
//     {
//         id: 3,
//         image: 'https://i.postimg.cc/vmK6WvZV/images-1.jpg',
//         alt: 'Secure Investment',
//         title: 'Invest in Your Future',
//         subtitle: 'Buy or sell properties with confidence and ease through Nestoria.',
//         buttonText: 'Explore Listings'
//     },
//     {
//         id: 4,
//         image: 'https://i.postimg.cc/kXy6jC59/images-4.jpg',
//         alt: 'Verified Listings',
//         title: 'Only Verified Properties',
//         subtitle: 'We ensure every listing is real, secure, and verified by our team.',
//         buttonText: 'Check Now'
//     },
// ];

// export default function Banner() {
//     const [current, setCurrent] = useState(0);
//     const [isPaused, setIsPaused] = useState(false);

//     useEffect(() => {
//         if (isPaused) return;
//         const interval = setInterval(() => {
//             setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
//         }, 4000);
//         return () => clearInterval(interval);
//     }, [isPaused]);

//     const prevSlide = () => setCurrent(current === 0 ? banners.length - 1 : current - 1);
//     const nextSlide = () => setCurrent(current === banners.length - 1 ? 0 : current + 1);

//     return (
//         <div
//             className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] overflow-hidden rounded-3xl shadow-2xl"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//         >
//             {banners.map((banner, index) => (
//                 <div
//                     key={banner.id}
//                     className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
//                         index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
//                     }`}
//                 >
//                     <img
//                         src={banner.image}
//                         alt={banner.alt}
//                         className="w-full h-full object-cover brightness-75"
//                     />
//                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
//                         <div className="relative max-w-3xl px-4">
//                             <h2
//                                 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-2xl ${
//                                     index === current ? 'animate-slideIn' : ''
//                                 }`}
//                             >
//                                 {banner.title}
//                             </h2>
//                             <p
//                                 className={`text-lg sm:text-xl md:text-2xl font-medium mb-8 drop-shadow-lg ${
//                                     index === current ? 'animate-slideIn' : ''
//                                 }`}
//                             > 
//                                 {banner.subtitle}
//                             </p>
//                             <div className="text-center">
//                                     <button
//                                         className={`px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
//                                             index === current ? 'animate-bounceIn' : ''
//                                         }`}
//                                     >
//                                         {banner.buttonText || 'Find Now'}
//                                     </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//             {/* Slide Controls */}
//             <button
//                 onClick={prevSlide}
//                 className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-10 transition-all duration-300 hover:scale-110 shadow-md"
//                 aria-label="Previous slide"
//             >
//                 <ChevronLeftIcon className="w-8 h-8" />
//             </button>
//             <button
//                 onClick={nextSlide}
//                 className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-10 transition-all duration-300 hover:scale-110 shadow-md"
//                 aria-label="Next slide"
//             >
//                 <ChevronRightIcon className="w-8 h-8" />
//             </button>

//             {/* Indicator Dots */}
//             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
//                 {banners.map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setCurrent(index)}
//                         className={`w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${
//                             index === current
//                                 ? 'bg-blue-500 scale-150'
//                                 : 'bg-gray-300/60 hover:bg-gray-200/80'
//                         }`}
//                         aria-label={`Go to slide ${index + 1}`}
//                     />
//                 ))}
//             </div>

//             {/* Animation Styles */}
//             <style>
//                 {`
//                     @keyframes slideIn {
//                         from {
//                             opacity: 0;
//                             transform: translateY(20px);
//                         }
//                         to {
//                             opacity: 1;
//                             transform: translateY(0);
//                         }
//                     }
//                     @keyframes bounceIn {
//                         from {
//                             opacity: 0;
//                             transform: scale(0.8);
//                         }
//                         to {
//                             opacity: 1;
//                             transform: scale(1);
//                         }
//                     }
//                     .animate-slideIn {
//                         animation: slideIn 0.8s ease-out;
//                     }
//                     .animate-bounceIn {
//                         animation: bounceIn 0.6s ease-out;
//                     }
//                 `}
//             </style>
//         </div>
//     );
// }