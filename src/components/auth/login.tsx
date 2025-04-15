import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// ** Custom Component Import
import RightWrapper from 'src/components/layout/RightWrapper'
import LoginForm from './LoginForm'

// ** Demo Imports
import Image from 'next/image'

const renderContent = () => {
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '45px',
                justifyContent: 'center',
                backgroundColor: '#FAFBFF',
            }}
        >
            <Image alt='logo' width={0} height={0} sizes='100vw' unoptimized className='max-w-[314px] w-full' src={`/images/logo_en.svg`} />
            <Image alt='login-illustration' width={0} height={0} sizes='100vw' unoptimized className='max-h-[550px] max-w-[672px] w-full' src={`/images/registry-illustration.svg`} />
            <p className='max-w-[600px] text-[14px] text-center'>
                برای استفاده از خدمات جی جی لاین ثبت نام کنبد تا از اعتبار ۵۰ میلیون تا ۲۰۰ میلیون تومان بهره مند شوید.برای استفاده از خدمات جی جی لاین ثبت نام کنید تا از اعتبار ۵۰ میلیون تا ۲۰۰ میلیون تومان بهره مند شوید.
            </p>
        </Box>
    )
}

interface LoginProps {
    onSwitchToRegister: () => void
    onSwitchToForgotPassword: () => void
}

const Login = ({ onSwitchToRegister, onSwitchToForgotPassword }: LoginProps) => {
    // ** Hooks
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
            {!hidden && renderContent()}
            <RightWrapper>
                <Box
                    sx={{
                        p: [6, 12],
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <LoginForm onSwitchToRegister={onSwitchToRegister} onSwitchToForgotPassword={onSwitchToForgotPassword} />
                </Box>
            </RightWrapper>
        </Box>
    )
}

export default Login
