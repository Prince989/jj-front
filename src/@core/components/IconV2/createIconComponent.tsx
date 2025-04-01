import React from 'react';
import Icon, { IconProps } from './Icon';

/**
 * Helper function to create icon components
 * @param iconName The name of the SVG file in public/icons (without .svg extension)
 * @returns A React component for the icon
 */
export function createIconComponent(iconName: string) {
  type CreatedIconProps = Omit<IconProps, 'name'>;

  const IconComponent: React.FC<CreatedIconProps> = (props) => {
    return <Icon name={iconName} {...props} />;
  };

  IconComponent.displayName = `${iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Icon`;

  return IconComponent;
}

export default createIconComponent;
