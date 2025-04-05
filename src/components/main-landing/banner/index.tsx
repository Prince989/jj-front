import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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

                    <div className="flex gap-3 mt-6">
                        <Button
                            variant="contained"
                            endIcon={<ArrowBackIcon />}
                            className="bg-primary-orange hover:bg-primary-orange-1 text-white rounded-md py-3 lg:px-6 px-3 text-sm"
                        >
                            دریافت اعتبار
                        </Button>

                        <Button
                            variant="outlined"
                            className="text-white border-white hover:border-white  rounded-md py-3 lg:px-6 px-3 text-sm"
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
