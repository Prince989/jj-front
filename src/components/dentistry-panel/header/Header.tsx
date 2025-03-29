import React from 'react'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'

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