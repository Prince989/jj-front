import { Button, Typography } from '@mui/material';

const Banner = () => {
    return (
        <div className="bg-[#1a237e] min-h-[500px] w-full flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Column - Image */}
                <div className="text-right space-y-6">
                    <Typography variant="h2" component="h1" className="text-white font-bold">
                        کیف پول اعتباری برای تمام نیازهای شما
                    </Typography>

                    <Typography variant="subtitle1" className="text-gray-200">
                        با جی جی لاین، خدمات و کالای مورد نیاز خود را به صورت اقساطی و بدون بهره دریافت کنید. تا سقف ۲۰۰ میلیون تومان اعتبار، بدون نیاز به ضامن.
                    </Typography>

                    <div className="flex gap-4 justify-start mt-8">
                        <Button
                            variant="contained"
                            color="warning"
                            className="!rounded-lg !px-8 !py-2"
                        >
                            دریافت اعتبار
                        </Button>

                        <Button
                            variant="outlined"
                            className="!rounded-lg !px-8 !py-2 !text-white !border-white hover:!bg-white/10"
                        >
                            مشاهده فروشگاه ها
                        </Button>
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="relative">
                    <img
                        src="/images/credit-cards.png"
                        alt="Credit Cards"
                        className="w-full h-auto transform -rotate-12"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
