import React from 'react';
import { Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColoredText from '../ColoredText';
import { menuItems } from './config';
import Link from 'next/link';

const DesktopMenu: React.FC = () => {
    return (
        <div className="hidden lg:flex justify-between items-center">
            <div className="flex items-center gap-12">
                <ColoredText
                    firstText="Jey"
                    middleText="Jey"
                    lastText="Line"
                    className="mb-2"
                    textClassName="text-2xl font-[900]"
                />
                <nav className="flex gap-14 items-center">
                    {menuItems.map((item) => (
                        <div key={item.text} className="flex items-center">
                            {item.hasSubmenu ? (
                                <div className="flex gap-2 items-center cursor-pointer">
                                    <a href={item.href} className="text-primary-gray no-underline text-sm hover:text-primary-orange">
                                        {item.text}
                                    </a>
                                    <KeyboardArrowDownIcon sx={{ width: 16, height: 16 }} />
                                </div>
                            ) : (
                                <a href={item.href} className="text-primary-gray no-underline text-sm hover:text-primary-orange">
                                    {item.text}
                                </a>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
            <Link href='/validation'>
                <Button
                    variant="contained"
                    startIcon={<PersonOutlineIcon />}
                    className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                >
                    ورود به حساب کاربری
                </Button>
            </Link>
        </div>
    );
};

export default DesktopMenu; 