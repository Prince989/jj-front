import React from 'react';

interface ColoredTextProps {
    firstText: string;
    middleText: string;
    lastText: string;
    className?: string;
    textClassName?: string;
}

const ColoredText: React.FC<ColoredTextProps> = ({
    firstText,
    middleText,
    lastText,
    className = '',
    textClassName = 'text-4xl font-[900]'
}) => {
    return (
        <div className={`flex items-center ${className}`}>
            <span className={`text-primary-blue ${textClassName}`}>{firstText}</span>
            <span className={`text-primary-orange mx-1 ${textClassName}`}>{middleText}</span>
            <span className={`text-primary-blue ${textClassName}`}>{lastText}</span>
        </div>
    );
};

export default ColoredText; 