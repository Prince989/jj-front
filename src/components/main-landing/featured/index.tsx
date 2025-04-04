import { Typography } from "@mui/material";

const FeaturedBox = () => {
    const features = [
        {
            title: "بدون چک و ضامن",
            subtitle: "فقط با احراز هویت و اعتبارسنجی، بدون نیاز به مراجعه حضوری",
            items: ["فرآیند کاملا آنلاین", "تایید سریع درخواست"],
        },
        {
            title: "بدون بهره و سود",
            subtitle: "پرداخت اقساطی بدون هیچ هزینه اضافی، فقط اصل مبلغ",
            items: ["اقساط ۶ تا ۱۲ ماهه", "بدون پیش پرداخت"],
        },
        {
            title: "تنوع خدمات",
            subtitle: "قابل استفاده در انواع فروشگاه‌ها و مراکز خدماتی",
            items: ["خدمات درمانی و پزشکی", "کالای دیجیتال و لوازم خانگی"],
        },
    ];

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <Typography
                    variant="h2"
                    component="h2"
                    className="mb-4 text-3xl font-bold text-[#1E4FD9]"
                    sx={{
                        "& span": { color: "#FF6B00" },
                    }}
                >
                    ویژگی های اعتبار <span>جی جی</span> لاین
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    تجربه‌ای متفاوت در خرید اقساطی
                </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="bg-[#1E4FD9] rounded-2xl p-6 h-full text-white flex flex-col gap-4">
                        <Typography variant="h6" className="font-bold mb-1">
                            {feature.title}
                        </Typography>
                        <Typography variant="body2" className="mb-6">
                            {feature.subtitle}
                        </Typography>
                        {feature.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#1E4FD9]">
                                    ✓
                                </div>
                                <Typography variant="body2">{item}</Typography>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

        </section>
    );
};

export default FeaturedBox;

