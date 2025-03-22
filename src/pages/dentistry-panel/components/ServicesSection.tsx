import React from 'react'
import { Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { useMediaQuery } from '@mui/material'

interface ServiceItemProps {
    title: string
    description: string
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, description }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center px-4 py-10 w-full">
            <Typography
                variant="h5"
                component="h3"
                className="font-bold text-primary-blue mb-6 text-center"
            >
                {title}
            </Typography>
            <Typography
                variant="body1"
                className="text-primary-blue text-center text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    )
}

const ServiceSlide: React.FC<{ services: Array<{ title: string, description: string }> }> = ({ services }) => {
    return (
        <div className="flex flex-row w-full justify-center h-full">
            {services.map((service, index) => (
                <ServiceItem
                    key={index}
                    title={service.title}
                    description={service.description}
                />
            ))}
        </div>
    );
};

const ServicesSection = () => {
    const isXs = useMediaQuery('(max-width: 600px)');
    const isSm = useMediaQuery('(min-width: 601px) and (max-width: 960px)');
    const isMd = useMediaQuery('(min-width: 961px) and (max-width: 1280px)');
    const isLg = useMediaQuery('(min-width: 1281px)');

    // Service items
    const services = [
        {
            title: 'عصب کشی',
            description: 'لورم ایپسوم متن ساختگی با تولید<br />سادگی نامفهوم از صنعت چاپ.'
        },
        {
            title: 'ایمپلت',
            description: 'لورم ایپسوم متن ساختگی با تولید<br />سادگی نامفهوم از صنعت چاپ.'
        },
        {
            title: 'کامپوزیت',
            description: 'لورم ایپسوم متن ساختگی با تولید<br />سادگی نامفهوم از صنعت چاپ.'
        },
        {
            title: 'لمینیت',
            description: 'لورم ایپسوم متن ساختگی با تولید<br />سادگی نامفهوم از صنعت چاپ.'
        },
        {
            title: 'جراحی',
            description: 'لورم ایپسوم متن ساختگی با تولید<br />سادگی نامفهوم.'
        },
        {
            title: 'ارتودنسی',
            description: 'لورم ایپسوم متن ساختگی با تولید<br />سادگی نامفهوم از صنعت چاپ.'
        },
        {
            title: 'بلیچینگ',
            description: 'لورم ایپسوم متن ساختگی با تولید<br />سادگی نامفهوم از صنعت چاپ.'
        },
        {
            title: 'پروتز',
            description: 'لورم ایپسوم متن ساختگی با تولید<br />سادگی نامفهوم از صنعت چاپ.'
        }
    ]

    // Determine how many items to show per slide based on screen size
    const getItemsPerSlide = () => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMd) return 4;
        if (isLg) return 5;

        return 1; // Default fallback
    };

    // Group services into slides based on screen size
    const createServiceSlides = () => {
        const itemsPerSlide = getItemsPerSlide();
        const slides = [];

        for (let i = 0; i < services.length; i += itemsPerSlide) {
            slides.push(services.slice(i, i + itemsPerSlide));
        }

        return slides;
    };

    // Create slides based on screen size
    const serviceSlides = createServiceSlides();

    return (
        <section className="py-16 w-full relative bg-white">
            <div className="bg-primary-blue-2 py-3">
                <Carousel
                    className="bg-transparent"
                    autoPlay={true}
                    animation="slide"
                    indicators={false}
                    navButtonsAlwaysVisible={true}
                    navButtonsAlwaysInvisible={false}
                    cycleNavigation={true}
                    interval={6000}
                    duration={1000}
                    fullHeightHover={false}
                    swipe={true}
                >
                    {serviceSlides.map((slideServices, index) => (
                        <ServiceSlide key={index} services={slideServices} />
                    ))}
                </Carousel>
            </div>


        </section>
    )
}

export default ServicesSection 