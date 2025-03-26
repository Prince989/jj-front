export interface MenuItem {
    text: string;
    href: string;
    hasSubmenu?: boolean;
}

export interface ColoredTextProps {
    className?: string;
    textClassName?: string;
} 