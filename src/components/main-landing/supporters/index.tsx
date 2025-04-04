
interface SupporterProps {
    imageUrl: string;
    name: string;
    alt: string;
}

const supporters: SupporterProps[] = [
    {
        imageUrl: '/images/supporters/tipax.png',
        name: 'Tipax',
        alt: 'Tipax Courier Service Logo'
    },
    {
        imageUrl: '/images/supporters/miare.png',
        name: 'Miare',
        alt: 'Miare Logo'
    },
    {
        imageUrl: '/images/supporters/snapp-box.png',
        name: 'Snapp Box',
        alt: 'Snapp Box Logo'
    },
    {
        imageUrl: '/images/supporters/post.png',
        name: 'Post',
        alt: 'Post Company Logo'
    }
];

const Supporters = () => {
    return (
        <section className="w-full py-8 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                {supporters.map((supporter) => (
                    <div
                        key={supporter.name}
                        className="w-full max-w-[200px] h-[80px] flex items-center justify-center"
                    >
                        <img
                            src={supporter.imageUrl}
                            alt={supporter.alt}
                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Supporters;
