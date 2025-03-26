import React from 'react'
import MobileMenu from './header/MobileMenu'
import DesktopMenu from './header/DesktopMenu'

const Header = () => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <header className="py-4 bg-white w-full">
            <MobileMenu open={open} onOpen={handleOpen} onClose={handleClose} />
            <DesktopMenu />
        </header>
    )
}

export default Header 