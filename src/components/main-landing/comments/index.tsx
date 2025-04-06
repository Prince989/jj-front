import React from 'react';
import Image from 'next/image';

interface CommentBoxProps {
    text: string;
    position: {
        top?: string;
        left?: string;
        right?: string;
        bottom?: string;
    };
    direction?: 'top' | 'bottom';
}

const CommentBox: React.FC<CommentBoxProps> = ({ text, position, direction = 'bottom' }) => {
    return (
        <div
            className={`absolute flex flex-col gap-2 z-10 ${direction === 'bottom' ? 'items-end' : 'items-start'}`}
            style={position}
        >
            {direction === 'bottom' && (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src="/images/main-landing/profile.jpeg"
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="relative">
                {/* Arrow for top direction */}
                {direction === 'top' && (
                    <div className="absolute bottom-[-6px] right-4 w-3 h-3 rotate-45 bg-[#EEF9FF]" />
                )}

                <div className="bg-[#EEF9FF] rounded-2xl p-4 max-w-[250px] shadow-[0px_4px_4px_0px_#00000040] transition-all duration-300 hover:scale-105">
                    <div className="text-gray-800 text-sm leading-relaxed">
                        <p>{text}</p>
                    </div>
                </div>

                {/* Arrow for bottom direction */}
                {direction === 'bottom' && (
                    <div className="absolute top-[-6px] left-4 w-3 h-3 rotate-45 bg-[#EEF9FF]" />
                )}
            </div>

            {direction === 'top' && (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                        src="/images/main-landing/profile.jpeg"
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </div>
    );
};

const Comments: React.FC = () => {
    const comments = [
        {
            text: "برای مشاوره تخصصی شماره تماس خود را ثبت کنید تا ۵...",
            position: { top: '140px', left: '10px' },
            direction: 'bottom' as const
        },
        {
            text: "برای مشاوره تخصصی شماره تماس خود را ثبت کنید تا ۱...",
            position: { top: '0px', right: '10px' },
            direction: 'top' as const
        },
        {
            text: "برای مشاوره تخصصی شماره تماس خود را ثبت کنید تا ۲...",
            position: { top: '420px', left: '11px' },
            direction: 'bottom' as const
        },
        {
            text: "برای مشاوره تخصصی شماره تماس خود را ثبت کنید تا ۳...",
            position: { top: '570px', right: '30px' },
            direction: 'top' as const
        }
    ];

    return (
        <section className="w-full h-[100vh] relative lg:p-2 mb-32">
            <h2 className="text-primary-blue text-center text-xl mb-2 font-bold relative z-10 md:text-3xl">
                نظرات کاربران
            </h2>
            <p className="text-gray-800 font-light text-center text-lg relative z-10 mb-11">
                تجربه‌ای متفاوت در خرید اقساطی
            </p>

            <div className="relative w-full h-[100vh] z-20">
                <Image
                    src="/images/main-landing/galaxy.svg"
                    alt="Galaxy background"
                    fill
                    className="object-cover absolute"
                />
                {comments.map((comment, index) => (
                    <CommentBox
                        key={index}
                        text={comment.text}
                        position={comment.position}
                        direction={comment.direction}
                    />
                ))}
            </div>
        </section>
    );
};

export default Comments;
