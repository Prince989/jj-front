// ** React Imports
import React from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Component Import
import RightWrapper from 'src/components/layout/RightWrapper'
import ForgotPasswordForm from './ForgotPasswordForm'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
    zIndex: 2,
    maxHeight: 680,
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down(1540)]: {
        maxHeight: 550
    },
    [theme.breakpoints.down('lg')]: {
        maxHeight: 500
    }
}))

interface ForgotPasswordProps {
    onSwitchToLogin: () => void
}

const ForgotPassword = ({ onSwitchToLogin }: ForgotPasswordProps) => {
    // ** Hooks
    const theme = useTheme()

    // ** Vars
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    const renderContent = () => {
        return (
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                    borderRadius: '20px',
                    justifyContent: 'center',
                    backgroundColor: 'customColors.bodyBg',
                    margin: theme => theme.spacing(8, 0, 8, 8)
                }}
            >
                <LoginIllustration alt='login-illustration' src={`/images/authentication/login.svg`} />
                <FooterIllustrationsV2 />
            </Box>
        )
    }

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
                    <ForgotPasswordForm onSwitchToLogin={onSwitchToLogin} />
                </Box>
            </RightWrapper>
        </Box>
    )
}

export default ForgotPassword 