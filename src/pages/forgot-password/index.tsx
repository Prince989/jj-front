// ** React Imports
import React, { useState, ChangeEvent, ReactNode, useMemo } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import mAxios from 'src/configs/axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

interface State {
  password: string
  showPassword: boolean
  confirmPassword: string
  showConfirmPassword: boolean
  phoneNumber: string
}

type IProblem = {
  [key: string]: string[]
}

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

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const ForgotPassword = () => {
  // ** States
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
    phoneNumber: ''
  })



  // ** Hooks
  const theme = useTheme()
  const router = useRouter();
  const [problems, setProblems] = useState<IProblem>({})

  // TODO TOKEN
  const [token, setToken] = useState<string>("");
  const [showToken, setShowToken] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(75);

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const resetPass = () => {
    setProblems({});

    if (!/^09\d{9}/.test(values.phoneNumber)) {
      setProblems(
        {
          ...problems,
          phone_number: [
            "شماره موبایل نا معتبر"
          ]
        }
      );

      return;
    }

    if (values.password != values.confirmPassword) {
      setProblems({
        confirmPassword: [
          "تایید رمز عبور اشتباه است"
        ]
      })

      return;
    }

    mAxios.post("/reset/pass", {
      phone_number: values.phoneNumber,
      password: values.password,
      token: token
    })
      .then(() => {
        router.push("/login");
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

  const disableSendCode = useMemo(() => {
    if (/^09\d{9}/.test(values.phoneNumber)) {
      return false
    }

    return true;
  }, [values.phoneNumber])

  const send_code = () => {
    setProblems({});

    if (!/^09\d{9}/.test(values.phoneNumber)) {
      setProblems(
        {
          ...problems,
          phone_number: [
            "شماره موبایل نا معتبر"
          ]
        }
      );

      return;
    }

    mAxios.post("/send/verify", {
      phone_number: values.phoneNumber,
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
        console.log(err.response);
      })
  }

  React.useEffect(() => {
    // exit early when we reach 0
    if (!timer) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);

    // add timer as a dependency to re-rerun the effect
    // when we update it
  }, [timer]);

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
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
      ) : null}
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
                  <Button fullWidth type='submit' disabled={disableSendCode} variant='contained' sx={{ mb: 4 }}>
                    ارسال کد تایید
                  </Button>
                </form>
            }
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgotPassword.guestGuard = true

export default ForgotPassword
