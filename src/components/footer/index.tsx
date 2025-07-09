import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ColoredText from 'src/components/dentistry-panel/ColoredText'
import Link from 'next/link'

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

    const generalIcons = [
        {
            children: <Link href='https://trustseal.enamad.ir/?id=623943&Code=snidtK5uQgyZQ2pXRM3yqmz2P8JYGNgS' target='_blank' referrerPolicy='origin'>
                <img src='https://trustseal.enamad.ir/logo.aspx?id=623943&Code=snidtK5uQgyZQ2pXRM3yqmz2P8JYGNgS' style={{ cursor: 'pointer' }} alt='eNamad' width={70} height={70} />
            </Link>
        },
        { children: null },
        { children: null },
        { children: null }
    ]

    return (
        <footer className="w-full bg-gray-100 pt-12">

            <div className="w-full flex flex-col lg:flex-row gap-8 justify-between p-4 lg:px-24">
                <div className="flex flex-col gap-3 items-center lg:items-start mb-5 lg:mb-0">

                    <ColoredText
                        firstText="Line"
                        middleText="Jey"
                        lastText="Jey"
                        className="mb-2"
                        textClassName="lg:text-4xl text-2xl font-[900]"
                    />

                    <div className="flex items-center">
                        <p className="text-sm m-0 text-primary-gray direction-ltr">
                            پشتیبانی: ۷۳۶۵۱۸۲-۰۲۱
                        </p>
                    </div>

                    <div className="flex items-center">
                        <AccessTimeIcon className="text-primary-orange ml-2 text-base" />
                        <p className="text-sm m-0 text-primary-gray">
                            ساعت پاسخگویی از ۹ تا ۱۳ میباشد
                        </p>
                    </div>
                </div>

                <div className="flex w-full lg:w-1/3 gap-1 lg:gap-8 justify-between">

                    <div className="w-full lg:w-1/2">
                        <h3 className="text-base lg:text-xl font-bold m-0 mb-4 text-primary-gray">
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

                    <div className="w-full lg:w-1/2">
                        <h3 className="text-base lg:text-xl font-bold m-0 mb-4 text-primary-gray">
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
                    <ColoredText
                        firstText="چرا جی"
                        middleText="جی"
                        lastText="لاین"
                        className="mb-3 justify-center lg:justify-start"
                        textClassName="text-xl font-[700]"
                    />

                    <div className="flex justify-start items-center gap-4">
                        {generalIcons.map((icon, index) => (
                            <div key={index} className="w-[70px] h-[70px] rounded-lg bg-white overflow-hidden">
                                {icon.children}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <p className="text-sm text-primary-gray mb-4 lg:text-start text-center">
                            ما را در شبکه های اجتماعی دنبال کنید
                        </p>

                        <div className="flex justify-center lg:justify-start">
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
                    کلیه حقوق این وبسایت به جی جی لاین تعلق دارد
                </p>
            </div>
        </footer>
    )
}

export default Footer 