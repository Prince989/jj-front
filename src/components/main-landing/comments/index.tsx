import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CommentBoxProps {
    text: string;
    position: {
        top?: string;
        left?: string;
        right?: string;
        bottom?: string;
    };
    direction?: 'top' | 'bottom';
    isMobile?: boolean;
}

const CommentBox: React.FC<CommentBoxProps> = ({ text, position, direction = 'bottom', isMobile }) => {
    const [currentPosition, setCurrentPosition] = useState(position);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>();
    const movementState = useRef({
        angle: Math.random() * Math.PI * 2,
        radius: 200 + Math.random() * 300,
        speed: 0.002,
        centerX: 0,
        centerY: 0,
        initialX: 0,
        initialY: 0,
        ovalRatio: 1.8 + Math.random() * 0.4
    });

    useEffect(() => {
        if (containerRef.current) {
            const galaxyBox = document.getElementById('galaxy-box');
            if (!galaxyBox) return;

            const galaxyRect = galaxyBox.getBoundingClientRect();

            movementState.current.centerX = galaxyRect.width / 2;
            movementState.current.centerY = galaxyRect.height / 2;

            const animate = () => {
                const { angle, radius, speed, centerX, centerY, ovalRatio } = movementState.current;

                movementState.current.angle = angle + speed;

                const newX = centerX + Math.cos(angle) * radius;
                const newY = centerY + Math.sin(angle) * (radius / ovalRatio);

                const margin = 150;
                const minX = margin;
                const maxX = galaxyRect.width - margin;
                const minY = margin;
                const maxY = galaxyRect.height - margin;

                const boundedX = Math.max(minX, Math.min(maxX, newX));
                const boundedY = Math.max(minY, Math.min(maxY, newY));

                setCurrentPosition({
                    top: `${boundedY}px`,
                    left: `${boundedX}px`,
                });

                animationFrameRef.current = requestAnimationFrame(animate);
            };

            animationFrameRef.current = requestAnimationFrame(animate);

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }
    }, [position]);

    return (
        <motion.div
            ref={containerRef}
            className={`absolute flex flex-col gap-2 z-10 ${direction === 'bottom' ? 'items-end' : 'items-start'}`}
            style={currentPosition}
        >
            <motion.div
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                whileHover={!isMobile ? { scale: 1.2 } : undefined}
                whileTap={isMobile ? { scale: 1.2 } : undefined}
                transition={{ duration: 0.2 }}
            >
                <Image
                    src="/images/main-landing/profile.jpeg"
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                {direction === 'top' && (
                    <div className="absolute bottom-[-6px] right-4 w-3 h-3 rotate-45 bg-[#EEF9FF]" />
                )}

                <div className="bg-[#EEF9FF] rounded-2xl p-4 max-w-[250px] shadow-[0px_4px_4px_0px_#00000040]">
                    <div className="text-gray-800 text-sm leading-relaxed">
                        <p>{text}</p>
                    </div>
                </div>

                {direction === 'bottom' && (
                    <div className="absolute top-[-6px] left-4 w-3 h-3 rotate-45 bg-[#EEF9FF]" />
                )}
            </motion.div>
        </motion.div>
    );
};

const Comments: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const comments = [
        {
            text: "برای مشاوره تخصصی شماره تماس خود را ثبت کنید تا ۵...",
            position: { top: '140px', left: '10px' },
            direction: 'bottom' as const
        },
        {
            text: "برای مشاوره تخصصی شماره تماس خود را ثبت کنید تا ۱...",
            position: { top: '140px', left: '10px' },
            direction: 'bottom' as const
        },
        {
            text: "برای مشاوره تخصصی شماره تماس خود را ثبت کنید تا ۲...",
            position: { top: '140px', left: '10px' },
            direction: 'bottom' as const
        },
        {
            text: "برای مشاوره تخصصی شماره تماس خود را ثبت کنید تا ۳...",
            position: { top: '140px', left: '10px' },
            direction: 'bottom' as const
        }
    ];

    // Filter comments for mobile view
    const visibleComments = isMobile ? comments.slice(0, 2) : comments;

    return (
        <section className="w-full h-[100vh] relative lg:p-2 lg:mb-32">
            <h2 className="text-primary-blue text-center text-xl mb-2 font-bold relative z-10 md:text-3xl">
                نظرات کاربران
            </h2>
            <p className="text-gray-800 font-light text-center text-lg relative z-10 mb-11">
                تجربه‌ای متفاوت در خرید اقساطی
            </p>

            <div className="relative w-full h-[60vh] lg:h-[85vh] z-20 overflow-hidden" id="galaxy-box">
                <Image
                    src="/images/main-landing/galaxy.svg"
                    alt="Galaxy background"
                    fill
                    className="object-cover lg:object-contain absolute"
                />
                {visibleComments.map((comment, index) => (
                    <CommentBox
                        key={index}
                        text={comment.text}
                        position={comment.position}
                        direction={comment.direction}
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </section>
    );
};

export default Comments;
