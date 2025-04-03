import React, { CSSProperties, MouseEvent, useState } from 'react';

export interface IconProps {
  name: string;
  width?: number;
  height?: number;
  color?: string;
  hoverColor?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const Icon: React.FC<IconProps> = ({ name, width = 24, height = 24, color, hoverColor, className, style, onClick }) => {
  // Create a base path to the icon
  const iconPath = `/icons/${name}.svg`;

  // Track hover state
  const [isHovered, setIsHovered] = useState(false);

  // Create dynamic styles for the icon
  const iconStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    maskImage: `url(${iconPath})`,
    WebkitMaskImage: `url(${iconPath})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    backgroundColor: isHovered && hoverColor ? hoverColor : color || 'currentColor',
    transition: 'background-color 0.2s ease',
    ...style,
  };

  return (
    <div
      className={`inline-block ${className || ''}`}
      style={iconStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    />
  );
};

export default Icon;
