import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Banner = () => {

    return (
        <div className="min-h-[500px] w-full flex items-center">
            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0.3; }
                    50% { opacity: 1; }
                    100% { opacity: 0.3; }
                }
                .twinkle-4 {
                    animation: twinkle 2s ease-in-out infinite;
                    animation-delay: 1s;
                }
            `}</style>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-10 lg:pt-0">
                {/* Left Column - Image */}
                <div className="space-y-6">
                    <Typography variant="h2" component="h1" className="text-white font-[900] text-center lg:text-right">
                        کیف پول اعتباری برای تمام نیازهای شما
                    </Typography>

                    <Typography variant="subtitle1" className="text-gray-200 text-center lg:text-right">
                        با جی <span className="text-primary-orange">جی</span> لاین، خدمات و کالای مورد نیاز خود را به صورت اقساطی و بدون بهره دریافت کنید. تا سقف ۲۰۰ میلیون تومان اعتبار، بدون نیاز به ضامن.
                    </Typography>


                    <div className="flex flex-wrap gap-3 mt-6">
                        <Button
                            variant="contained"
                            endIcon={<ArrowBackIcon />}
                            className="bg-primary-orange hover:bg-primary-orange-1 text-white rounded-md py-2 lg:px-6 px-3 text-sm w-full lg:w-auto"
                        >
                            دریافت اعتبار
                        </Button>

                        <Button
                            variant="outlined"
                            className="text-white border-white hover:border-white  rounded-md py-2 lg:px-6 px-3 text-sm w-full lg:w-auto"
                        >
                            مشاهده فروشگاه ها
                        </Button>
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="relative">
                    <img
                        src="/images/main-landing/cards.png"
                        alt="Credit Cards"
                        className="transform -rotate-12 -z-10"
                        width={490}
                        height={460}
                    />
                    <img src="/images/main-landing/stars.svg" alt="blue-stars" className="absolute top-[5%] lg:top-[27%] left-0 lg:-left-[100px] object-cover twinkle-4" />
                </div>
            </div>
        </div>
    );
};

export default Banner;
