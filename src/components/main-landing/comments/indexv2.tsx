import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Testimonial {
    id: number;
    name: string;
    image: string;
    comment: string;
    position: {
        top: string;
        left: string;
    };
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "رضا حسینی",
        image: "/images/main-landing/profile.jpeg",
        comment: "این یک متن تستی می باشد. نظر بنده درباره این سامانه بسیار خوب می باشد. امیدوارم که این سامانه بتواند به شما هم کمک کند.",
        position: { top: "10%", left: "20%" }
    },
    {
        id: 2,
        name: "محمد حسینی",
        image: "/images/main-landing/profile.jpeg",
        comment: "این یک متن تستی می باشد. نظر بنده درباره این سامانه بسیار خوب می باشد. امیدوارم که این سامانه بتواند به شما هم کمک کند.",
        position: { top: "30%", left: "60%" }
    },
    {
        id: 3,
        name: "کاظم حسینی",
        image: "/images/main-landing/profile.jpeg",
        comment: "این یک متن تستی می باشد. نظر بنده درباره این سامانه بسیار خوب می باشد. امیدوارم که این سامانه بتواند به شما هم کمک کند.",
        position: { top: "50%", left: "25%" }
    },
    {
        id: 4,
        name: "علی حسینی",
        image: "/images/main-landing/profile.jpeg",
        comment: "این یک متن تستی می باشد. نظر بنده درباره این سامانه بسیار خوب می باشد. امیدوارم که این سامانه بتواند به شما هم کمک کند.",
        position: { top: "70%", left: "55%" }
    },
    {
        id: 5,
        name: "علی حسینی",
        image: "/images/main-landing/profile.jpeg",
        comment: "این یک متن تستی می باشد. نظر بنده درباره این سامانه بسیار خوب می باشد. امیدوارم که این سامانه بتواند به شما هم کمک کند.",
        position: { top: "55%", left: "75%" }
    },
    {
        id: 6,
        name: "علی حسینی",
        image: "/images/main-landing/profile.jpeg",
        comment: "این یک متن تستی می باشد. نظر بنده درباره این سامانه بسیار خوب می باشد. امیدوارم که این سامانه بتواند به شما هم کمک کند.",
        position: { top: "55%", left: "5%" }
    },
];

interface MobileSliderViewProps {
    testimonials: Testimonial[];
}

const MobileSliderView: React.FC<MobileSliderViewProps> = React.memo(({ testimonials }) => {
    const autoplayOptions = {
        delay: 5000,
        stopOnInteraction: false,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            direction: 'rtl',
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
            skipSnaps: false,
        },
        [Autoplay(autoplayOptions)]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        setScrollSnaps(emblaApi.scrollSnapList());
        onSelect();
        emblaApi.on('select', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    return (
        <div className="w-full">
            <div ref={emblaRef}>
                <div className="flex">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className={`flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-4`}
                        >
                            <div className="bg-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-600">{testimonial.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bullets */}
            <div className="flex justify-center gap-2 mt-4">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex
                            ? 'bg-orange-500 w-4'
                            : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
});

const DesktopFloatingView: React.FC<{
    testimonials: Testimonial[];
    activeTestimonial: number | null;
    setActiveTestimonial: (id: number | null) => void;
}> = React.memo(({ testimonials, activeTestimonial, setActiveTestimonial }) => (
    <div className="relative h-[600px] w-full overflow-hidden bg-white rounded-xl">

        {/* Floating Profile Images */}
        {testimonials.map((testimonial) => (
            <div
                key={testimonial.id}
                className="absolute transition-all duration-300 animate-shake"
                style={{
                    top: testimonial.position.top,
                    left: testimonial.position.left,
                    animationDelay: `${testimonial.id * 0.5}s`,
                }}
            >
                <div
                    className={`relative group cursor-pointer`}
                    onMouseEnter={() => setActiveTestimonial(testimonial.id)}
                    onMouseLeave={() => setActiveTestimonial(null)}
                >
                    {/* Profile Image */}
                    <div className={`
                        w-16 h-16 rounded-full overflow-hidden
                        transition-all duration-300 transform
                        ${activeTestimonial === testimonial.id ? 'scale-110' : 'hover:scale-105'}
                        relative z-10
                    `}>
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Wave Border Animation */}
                        <div className={`
                            absolute inset-0 rounded-full
                            transition-all duration-300
                            ${activeTestimonial === testimonial.id ? 'opacity-100' : 'opacity-0'}
                            border-4 border-orange-300 animate-wave-border
                        `}></div>
                    </div>

                    {/* Glow Effect */}
                    <div className={`
                        absolute inset-0 rounded-full
                        transition-opacity duration-300
                        ${activeTestimonial === testimonial.id ? 'opacity-100' : 'opacity-0'}
                        bg-orange-300 blur-xl -z-10
                    `}></div>

                    {/* Comment Box */}
                    <div className={`
                        absolute top-0 left-20
                        w-64 bg-white rounded-lg shadow-xl p-4
                        transition-all duration-300 transform origin-left
                        ${activeTestimonial === testimonial.id ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
                    `}>
                        <div className="flex items-center mb-3">
                            <span className="font-semibold text-gray-800">{testimonial.name}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{testimonial.comment}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
));

const TestimonialsV2: React.FC = () => {
    const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
    const isTablet = useMediaQuery('(max-width: 1024px)');

    return (
        <div className="w-full">
            <h2 className="text-primary-blue text-center text-xl mb-2 font-bold relative z-10 md:text-3xl">
                نظرات کاربران
            </h2>
            <p className="text-gray-800 font-light text-center text-lg relative z-10 mb-11">
                تجربه‌ای متفاوت در خرید اقساطی
            </p>

            {isTablet ? (
                <MobileSliderView testimonials={testimonials} />
            ) : (
                <DesktopFloatingView
                    testimonials={testimonials}
                    activeTestimonial={activeTestimonial}
                    setActiveTestimonial={setActiveTestimonial}
                />
            )}
        </div>
    );
};

export default TestimonialsV2;
