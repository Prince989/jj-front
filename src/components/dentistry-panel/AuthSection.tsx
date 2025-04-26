import { useState } from 'react'
import Image from 'next/image'
import RightWrapper from 'src/components/layout/RightWrapper'
import RegisterForm from 'src/components/auth/RegisterForm'
import LoginForm from 'src/components/auth/LoginForm'
import ForgotPasswordForm from 'src/components/auth/ForgotPasswordForm'

type FormType = 'login' | 'register' | 'forgot-password'

const AuthSection = () => {
    const [formType, setFormType] = useState<FormType>('login')

    return (
        <div className="flex bg-white">
            <div className="hidden flex-1 lg:flex relative items-center flex-col gap-[45px] justify-center bg-[#FAFBFF] p-4">
                <Image
                    alt='auth-illustration'
                    width={450}
                    height={450}
                    unoptimized
                    className='max-h-[450px] max-w-[450px]'
                    src='/images/dentistry/auth.svg'
                />
            </div>
            <RightWrapper>
                <div className="p-6 md:p-12 h-full flex items-center justify-center">
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
                </div>
            </RightWrapper>
        </div>
    )
}

export default AuthSection
