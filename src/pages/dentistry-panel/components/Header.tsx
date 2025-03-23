import React from 'react'
import { Typography, Button, IconButton, Menu, MenuItem } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ColoredText from './ColoredText'

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const menuItems = [
        {
            text: 'جی جی لاین',
            href: '#',
            hasSubmenu: true
        },
        { text: 'راهنمای دریافت وام', href: '#' },
        { text: 'خدمات', href: '#' },
        { text: 'مقالات', href: '#' },
    ]

    return (
        <header className="py-4 bg-white w-full">

            {/* Mobile View */}
            <div className="lg:hidden flex justify-between items-center">

                <ColoredText
                    firstText="Jey"
                    middleText="Jey"
                    lastText="Line"
                    className="mb-2"
                    textClassName="text-2xl font-[900]"
                />
                <IconButton onClick={handleClick} sx={{ color: '#212121' }}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1.5,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                borderRadius: '8px'
                            }
                        }
                    }}
                >
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.text}
                            onClick={handleClose}
                            className="py-4 px-8 hover:bg-gray-50"
                        >
                            <div className="flex items-center justify-between w-full">
                                <Typography className="text-right text-primary-gray text-sm font-normal">
                                    {item.text}
                                </Typography>
                                {item.hasSubmenu && (
                                    <KeyboardArrowDownIcon className="ml-1" sx={{ width: 16, height: 16 }} />
                                )}
                            </div>
                        </MenuItem>
                    ))}
                    <MenuItem onClick={handleClose} className="py-4 px-8">
                        <Button
                            variant="contained"
                            startIcon={<PersonOutlineIcon />}
                            className="bg-primary-orange text-white rounded-lg py-2 px-4 normal-case text-sm font-medium w-full justify-center hover:bg-[#E05F00]"
                        >
                            ورود به حساب کاربری
                        </Button>
                    </MenuItem>
                </Menu>
            </div>

            {/* Desktop View */}
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
                                        <KeyboardArrowDownIcon sx={{ width: 16, height: 16 }} />
                                        <a href={item.href} className="text-primary-gray no-underline text-sm hover:text-primary-orange">
                                            {item.text}
                                        </a>
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
                <Button
                    variant="contained"
                    startIcon={<PersonOutlineIcon />}
                    className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                >
                    ورود به حساب کاربری
                </Button>
            </div>

        </header>
    )
}

export default Header 