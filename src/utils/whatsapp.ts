import toast from 'react-hot-toast';

/**
 * Opens WhatsApp with a pre-filled message
 * @param messageOrEvent - The message to send or a React event (optional, defaults to implant information request)
 */
export const handleWhatsAppClick = (messageOrEvent?: string | React.MouseEvent) => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_ROSHA;
    if (!phoneNumber) {
        toast.error('شماره تلفن همراه هنوز تعریف نشده است.');

        return;
    }

    const message = typeof messageOrEvent === 'string' ? messageOrEvent : undefined;
    const defaultMessage = 'با سلام، من می‌خواهم اطلاعات بیشتری در مورد ایمپلنت دریافت کنم.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
};

