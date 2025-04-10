import React from 'react';
import { Button, InputBase, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColoredText from '../ColoredText';
import { menuItems } from './config';
import Link from 'next/link';
import { SearchIcon } from 'src/@core/components/IconV2';

const DesktopMenu: React.FC = () => {
    return (
        <div className="hidden lg:flex justify-between items-center">
            <div className="flex items-center gap-9">
                <ColoredText
                    firstText="Line"
                    middleText="Jey"
                    lastText="Jey"
                    className=""
                    textClassName="text-2xl font-[600]"
                />
                <nav className="flex gap-14 items-center">
                    {menuItems.map((item) => (


                        item.hasSubmenu ? (
                            <div className="flex gap-2 items-center cursor-pointer">
                                <a href={item.href} className="text-primary-gray no-underline text-sm hover:text-primary-orange py-6 cursor-pointer">
                                    {item.text}
                                </a>
                                <KeyboardArrowDownIcon sx={{ width: 16, height: 16 }} />
                            </div>
                        ) : (
                            <a href={item.href} className="text-primary-gray no-underline text-sm hover:text-primary-orange py-6 cursor-pointer">
                                {item.text}
                            </a>
                        )


                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-4 flex-1 justify-end">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white h-[36px] flex-[0.7]">
                    <InputBase
                        placeholder="چیزی که میخوای رو اینجا پیدا کن"
                        className="px-4 text-sm flex-grow text-right rounded-l-lg"
                        inputProps={{ 'aria-label': 'search', dir: 'rtl' }}
                    />
                    <IconButton className="py-2 px-4 rounded-none rounded-r-none bg-primary-orange hover:bg-primary-orange-1 text-white h-full">
                        <SearchIcon width={16} height={16} />
                    </IconButton>
                </div>

                <Link href='/validation' className='cursor-pointer'>
                    <Button
                        variant="contained"
                        startIcon={<PersonOutlineIcon />}
                        className="bg-primary-orange text-white rounded-md py-2 px-6 normal-case text-xs font-medium hover:bg-primary-orange-1 h-[36px]"
                    >
                        ورود به حساب کاربری
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default DesktopMenu; 