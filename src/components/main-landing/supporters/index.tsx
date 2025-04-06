import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface SupporterProps {
    imageUrl: string;
    name: string;
    alt: string;
}

const supporters: SupporterProps[] = [
    {
        imageUrl: '/images/main-landing/post.svg',
        name: 'Post',
        alt: 'Post Company Logo'
    },
    {
        imageUrl: '/images/main-landing/snap.svg',
        name: 'Snapp Box',
        alt: 'Snapp Box Logo'
    },
    {
        imageUrl: '/images/main-landing/miyare.svg',
        name: 'Miare',
        alt: 'Miare Logo'
    },
    {
        imageUrl: '/images/main-landing/tipax.svg',
        name: 'Tipax',
        alt: 'Tipax Courier Service Logo'
    },


];

const Supporters = () => {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: 'center' },
        [Autoplay({ delay: 1500, stopOnInteraction: false })]
    );

    return (
        <section className="w-full py-8 bg-gray-50">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {supporters.map((supporter) => (
                        <div
                            key={supporter.name}
                            className="flex-[0_0_25%] min-w-0 pl-4"
                        >
                            <div className="w-full max-w-[200px] h-[80px] flex items-center justify-center mx-auto">
                                <img
                                    src={supporter.imageUrl}
                                    alt={supporter.alt}
                                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Supporters;
