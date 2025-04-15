// ** React Imports
import React, { useState, ChangeEvent, useMemo, useEffect } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Other Imports
import mAxios from 'src/configs/axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

type IProblem = {
    [key: string]: string[]
}

interface State {
    password: string
    showPassword: boolean
    confirmPassword: string
    showConfirmPassword: boolean
    phoneNumber: string
}

interface ForgotPasswordFormProps {
    onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
    onSwitchToLogin
}) => {
    // ** States
    const [problems, setProblems] = useState<IProblem>({})
    const [token, setToken] = useState<string>("");
    const [showToken, setShowToken] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(75);
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
        phoneNumber: ''
    })

    // ** Hooks
    const theme = useTheme();
    const router = useRouter();

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleResetPassword = (data: { phoneNumber: string; password: string; token: string }) => {
        mAxios.post("/reset/pass", data)
            .then(() => {
                router.push("/login");
            })
            .catch(err => {
                const status = err.response.status;
                const data = err.response.data;
                if (status == 400) {
                    setProblems(data.problem);
                }
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message, {
                        position: "bottom-left",
                    })
            })
    }

    const handleSendCode = (phoneNumber: string) => {
        mAxios.post("/send/verify", {
            phone_number: phoneNumber,
        })
            .then(() => {
                setTimer(75);
                setShowToken(true);
            })
            .catch(err => {
                const status = err.response.status;
                const data = err.response.data;
                if (status == 400) {
                    setProblems(data.problem);
                }
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message, {
                        position: "bottom-left",
                    })
            })
    }

    useEffect(() => {
        if (!timer) return;
        const intervalId = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);

    const resetPass = () => {
        if (values.password !== values.confirmPassword) {
            return;
        }
        handleResetPassword({
            phoneNumber: values.phoneNumber,
            password: values.password,
            token: token
        });
    }

    const send_code = () => {
        handleSendCode(values.phoneNumber);
    }

    const disableSendCode = useMemo(() => {
        if (/^09\d{9}/.test(values.phoneNumber)) {
            return false
        }

        return true;
    }, [values.phoneNumber])

    return (
        <Box sx={{ width: '100%', maxWidth: 400 }}>
            <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill={theme.palette.primary.main}
                    d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
                />
                <path
                    fill='#161616'
                    opacity={0.06}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
                />
                <path
                    fill='#161616'
                    opacity={0.06}
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
                />
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    fill={theme.palette.primary.main}
                    d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
                />
            </svg>
            <Box sx={{ my: 6 }}>
                <Typography variant='h3' sx={{ mb: 1.5 }}>
                    رمز عبور خود را فراموش کردید؟
                </Typography>
                {
                    !showToken &&
                    <Typography sx={{ color: 'text.secondary' }}>شماره تلفن خود را وارد کنید</Typography>
                }
            </Box>
            {
                showToken ?
                    <form noValidate autoComplete='off' onSubmit={e => { e.preventDefault(); resetPass(); }}>
                        <CustomTextField
                            fullWidth
                            label='رمز عبور'
                            value={values.password}
                            placeholder='············'
                            id='auth-register-v2-password'
                            onChange={handleChange('password')}
                            helperText={problems['password']}
                            error={problems['password'] && problems['password'].length > 0}
                            type={values.showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                        >
                                            <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <CustomTextField
                            fullWidth
                            label='تایید رمز عبور'
                            value={values.confirmPassword}
                            placeholder='············'
                            id='auth-register-v2-password'
                            onChange={handleChange('confirmPassword')}
                            helperText={problems['confirmPassword']}
                            error={problems['confirmPassword'] && problems['confirmPassword'].length > 0}
                            type={values.showPassword ? 'text' : 'password'}
                            sx={{ mt: "10px" }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            aria-label='toggle password visibility'
                                        >
                                            <Icon fontSize='1.25rem' icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <CustomTextField
                            fullWidth
                            autoFocus
                            value={token}
                            id='token'
                            label='کد تایید'
                            onChange={(e) => setToken(e.currentTarget.value)}
                            placeholder='1234'
                            helperText={problems['token']}
                            error={problems['token'] && problems['token'].length > 0}
                            sx={{ display: 'flex', my: 2 }}
                        />
                        {
                            timer > 0 ?
                                <Box>
                                    {timer} ثانیه
                                    تا ارسال مجدد
                                </Box>
                                :
                                <Box>
                                    <Button onClick={() => send_code()} sx={{ color: "blue" }}>
                                        ارسال مجدد کد تایید
                                    </Button>
                                </Box>
                        }

                        <Button fullWidth type='submit' variant='contained' sx={{ my: 4 }}>
                            تغییر رمز عبور
                        </Button>
                    </form>
                    :
                    <form noValidate autoComplete='off' onSubmit={e => { e.preventDefault(); send_code(); }}>
                        <CustomTextField
                            fullWidth
                            type='text'
                            value={values.phoneNumber}
                            label='شماره همراه'
                            helperText={problems['phone_number']}
                            error={problems['phone_number'] && problems['phone_number'].length > 0}
                            onChange={handleChange('phoneNumber')}
                            sx={{ display: 'flex', mb: 4 }}
                            placeholder='091234567890'
                        />
                        <Button disabled={disableSendCode} className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1" fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                            ارسال کد تایید
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Typography onClick={onSwitchToLogin} sx={{ cursor: 'pointer', color: 'primary.main' }}>
                                بازگشت به بخش ورود
                            </Typography>
                        </Box>
                    </form>
            }
        </Box>
    )
}

export default ForgotPasswordForm 