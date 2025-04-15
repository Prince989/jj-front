import React from 'react';
import { IconButton, Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColoredText from '../dentistry-panel/ColoredText';
import { menuItems } from './config';
import Link from 'next/link';

interface MobileMenuProps {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onOpen, onClose }) => {
    return (
        <div className="lg:hidden flex justify-between items-center">
            <Link href="/">
                <ColoredText
                    firstText="Jey"
                    middleText="Jey"
                    lastText="Line"
                    className="mb-2"
                    textClassName="text-2xl font-[900]"
                />
            </Link>
            <IconButton onClick={onOpen} sx={{ color: '#212121' }}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        width: '90%',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease-in-out',
                        transform: open ? 'translateX(0)' : 'translateX(-100%)',
                    }
                }}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                        <ColoredText
                            firstText="Jey"
                            middleText="Jey"
                            lastText="Line"
                            className="mb-0"
                            textClassName="text-2xl font-[900]"
                        />
                        <IconButton onClick={onClose} sx={{ color: '#212121' }}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <nav className="flex flex-col items-start gap-4">
                        {menuItems.map((item) => (
                            <div key={item.text} className="flex items-center justify-end">
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
                    <Link href='/validation'>
                        <Button
                            variant="contained"
                            startIcon={<PersonOutlineIcon />}
                            className="bg-primary-orange text-white rounded-lg py-2 px-4 normal-case text-sm font-medium w-full justify-center hover:bg-[#E05F00] mt-6"
                        >
                            ورود به حساب کاربری
                        </Button>
                    </Link>
                </div>
            </Drawer>
        </div>
    );
};

export default MobileMenu; 