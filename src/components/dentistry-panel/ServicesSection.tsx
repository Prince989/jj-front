import React from 'react'
import { Typography, IconButton } from '@mui/material'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface ServiceItemProps {
    title: string
    description: string
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, description }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center py-10 w-full">
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

const ServicesSection = () => {
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

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            direction: 'rtl',
            dragFree: true,
            slidesToScroll: 1,
        },
        [Autoplay({ delay: 6000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = React.useState(0)

    React.useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', () => {
                setSelectedIndex(emblaApi.selectedScrollSnap())
            })
        }
    }, [emblaApi])

    const scrollTo = React.useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index)
    }, [emblaApi])

    return (
        <section className="w-full relative bg-white">
            <div className="bg-primary-blue-2 p-3 relative">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="flex-[0_0_100%] lg:flex-[0_0_calc(20%-6px)]"
                            >
                                <ServiceItem
                                    title={service.title}
                                    description={service.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    {services.map((_, index) => (
                        <IconButton
                            key={index}
                            onClick={() => scrollTo(index)}
                            className="p-1"
                            size="small"
                        >
                            <FiberManualRecordIcon
                                className={`text-sm ${selectedIndex === index ? 'text-primary-blue' : 'text-gray-400'}`}
                            />
                        </IconButton>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesSection 