import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ColoredText from './ColoredText'

const Footer = () => {
    const customerServices = [
        { title: 'راهنمای خرید', href: '#' },
        { title: 'سوالات متداول', href: '#' },
        { title: 'انتقادات و پیشنهادات', href: '#' },
        { title: 'انتقادات و پیشنهادات', href: '#' }
    ]

    const socialLinks = [
        { icon: <YouTubeIcon />, href: '#' },
        { icon: <TwitterIcon />, href: '#' },
        { icon: <TelegramIcon />, href: '#' },
        { icon: <InstagramIcon />, href: '#' }
    ]

    return (
        <footer className="w-full bg-gray-100 pt-12">

            <div className="w-full flex flex-col lg:flex-row gap-8 justify-between p-4 lg:px-24">
                <div className="flex flex-col gap-3">

                    <ColoredText
                        firstText="Jey"
                        middleText="Jey"
                        lastText="Line"
                        className="mb-2"
                        textClassName="lg:text-4xl text-2xl font-[900]"
                    />

                    <div className="flex items-center">
                        <p className="text-sm m-0 text-primary-gray direction-ltr">
                            پشتیبانی: 021-12345678
                        </p>
                    </div>

                    <div className="flex items-center">
                        <AccessTimeIcon className="text-primary-orange ml-2 text-base" />
                        <p className="text-sm m-0 text-primary-gray">
                            ساعت پاسخگویی از 9 تا 13 میباشد
                        </p>
                    </div>
                </div>

                <div className="flex lg:w-1/3 gap-8 justify-between">

                    <div>
                        <h3 className="text-xl font-bold m-0 mb-4 text-primary-gray">
                            خدمات مشتریان
                        </h3>

                        <nav>
                            {customerServices.map((service, index) => (
                                <div key={index} className="mb-4">
                                    <a
                                        href={service.href}
                                        className="text-sm text-primary-gray hover:text-primary-orange no-underline"
                                    >
                                        {service.title}
                                    </a>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold m-0 mb-4 text-primary-gray">
                            خدمات مشتریان
                        </h3>

                        <nav>
                            {customerServices.map((service, index) => (
                                <div key={index} className="mb-4">
                                    <a
                                        href={service.href}
                                        className="text-sm text-primary-gray hover:text-primary-orange no-underline"
                                    >
                                        {service.title}
                                    </a>
                                </div>
                            ))}
                        </nav>
                    </div>

                </div>

                <div className="flex flex-col">
                    <h3 className="text-xl font-bold m-0 mb-4 text-primary-gray">
                        چرا جی جی لاین؟
                    </h3>

                    <div className="flex justify-start items-center gap-4">
                        {customerServices.map((service, index) => (
                            <div key={index} className="w-[70px] h-[70px] rounded-lg bg-white"></div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <p className="text-sm text-primary-gray mb-4">
                            ما را در شبکه های اجتماعی دنبال کنید
                        </p>

                        <div className="flex justify-start">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="p-2 mr-2 rounded-full bg-blue-50 text-primary-blue hover:bg-blue-100"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center items-center bg-primary-blue py-4">
                <p className="text-sm text-white">
                    کلیه حقوق این وبسایت به جی جی لاین میباشد
                </p>
            </div>
        </footer>
    )
}

export default Footer 