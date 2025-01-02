import { EffectCoverflow, Pagination } from 'swiper/modules';


export const sliderOptions = {
    effect: 'coverflow' as const,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto' as const,
    spaceBetween: 30,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: true,
    modules: [EffectCoverflow, Pagination],
    className: "h-32",
    style: { maxWidth: '100%', height: '550px' }
};

export const slideImages: string[] = [
    "https://i.ibb.co/bLN0b0F/OIP.jpg",
    "https://i.ibb.co/WkqnW7R/OIP-1.jpg",
    "https://i.ibb.co/YQygr9V/OIP-2.jpg"
];