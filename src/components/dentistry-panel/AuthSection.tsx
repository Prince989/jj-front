import { useState } from 'react'
import Box from '@mui/material/Box'
import Image from 'next/image'
import RightWrapper from 'src/components/layout/RightWrapper'
import RegisterForm from 'src/components/auth/RegisterForm'
import LoginForm from 'src/components/auth/LoginForm'
import ForgotPasswordForm from 'src/components/auth/ForgotPasswordForm'

type FormType = 'login' | 'register' | 'forgot-password'

const AuthSection = () => {
    const [formType, setFormType] = useState<FormType>('login')

    return (
        <Box sx={{ backgroundColor: 'background.paper', display: 'flex' }}>
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
                    p: 4
                }}
            >
                <Image
                    alt='auth-illustration'
                    width={450}
                    height={450}
                    unoptimized
                    className='max-h-[450px] max-w-[450px]'
                    src='/images/dentistry/auth.svg'
                />
            </Box>
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
                    {formType === 'login' && (
                        <LoginForm
                            onSwitchToRegister={() => setFormType('register')}
                            onSwitchToForgotPassword={() => setFormType('forgot-password')}
                        />
                    )}
                    {formType === 'register' && (
                        <RegisterForm onSwitchToLogin={() => setFormType('login')} />
                    )}
                    {formType === 'forgot-password' && (
                        <ForgotPasswordForm
                            onSwitchToLogin={() => setFormType('login')}
                        />
                    )}
                </Box>
            </RightWrapper>
        </Box>
    )
}

export default AuthSection
