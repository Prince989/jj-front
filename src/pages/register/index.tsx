// ** React Imports
import React, { useState, ChangeEvent, ReactNode, useMemo } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import mAxios from 'src/configs/axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface State {
  password: string
  showPassword: boolean
  confirmPassword: string
  showConfirmPassword: boolean
  fname: string
  lname: string
  nationalCode: string
  phoneNumber: string
}

type IProblem = {
  [key: string]: string[]
}

// ** Styled Components

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

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const RegisterV2 = () => {
  // ** States
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
    fname: '',
    lname: '',
    nationalCode: '',
    phoneNumber: ''
  })



  // ** Hooks
  const theme = useTheme()
  const router = useRouter();
  const [problems, setProblems] = useState<IProblem>({})
  const [agree, setAgree] = useState<boolean>(false);

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

  const signup = () => {
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

    mAxios.post("/auth/signup", {
      phoneNumber: values.phoneNumber,
      password: values.password,
      fname: values.fname,
      lname: values.lname,
      nationalCode: values.nationalCode,
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

    mAxios.post("/auth/otp", {
      phoneNumber: values.phoneNumber,
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
            flexDirection: 'column',
            gap: '45px',
            justifyContent: 'center',
            backgroundColor: '#FAFBFF',
          }}
        >
          {/* <LoginIllustration alt='login-illustration' src={`/images/registry-illustration.svg`} /> */}

          <Image alt='logo' width={0} height={0} sizes='100vw' unoptimized className='max-w-[314px] w-full' src={`/images/logo_en.svg`} />
          <Image alt='login-illustration' width={0} height={0} sizes='100vw' unoptimized className='max-h-[550px] max-w-[672px] w-full' src={`/images/registry-illustration.svg`} />
          <p className='max-w-[600px] text-[14px] text-center'>
            برای استفاده از خدمات جی جی لاین ثبت نام کنبد تا از اعتبار ۵۰ میلیون تا ۲۰۰ میلیون تومان بهره مند شوید.برای استفاده از خدمات جی جی لاین ثبت نام کنید تا از اعتبار ۵۰ میلیون تا ۲۰۰ میلیون تومان بهره مند شوید.
          </p>
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
          <Box sx={{ width: '100%', maxWidth: 400, textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: "16px" }}>
              <Image src="/images/logo_fa.svg" unoptimized width={201} height={0} sizes='100vw' style={{ height: "auto" }} alt='Logo' />
            </Box>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5, fontSize: "16px" }}>
                برای ثبت نام اطلاعات خود را تکمیل نمایید
              </Typography>
            </Box>
            {
              showToken ?
                <form noValidate autoComplete='off' onSubmit={e => { e.preventDefault(); signup(); }}>
                  <CustomTextField
                    fullWidth
                    autoFocus
                    value={values.fname}
                    id='fname'
                    label='نام'
                    onChange={handleChange('fname')}
                    placeholder='John'
                    helperText={problems['fname']}
                    error={problems['fname'] && problems['fname'].length > 0}
                    sx={{ display: 'flex', mb: 4 }}
                  />
                  <CustomTextField
                    fullWidth
                    autoFocus
                    value={values.lname}
                    id='lname'
                    label='نام خانوادگی'
                    onChange={handleChange('lname')}
                    placeholder='doe'
                    helperText={problems['lname']}
                    error={problems['lname'] && problems['lname'].length > 0}
                    sx={{ display: 'flex', mb: 4 }}
                  />
                  <CustomTextField
                    fullWidth
                    autoFocus
                    type='number'
                    value={values.nationalCode}
                    id='nationalCode'
                    label='کدملی'
                    onChange={handleChange('nationalCode')}
                    placeholder='doe'
                    helperText={problems['nationalCode']}
                    error={problems['nationalCode'] && problems['nationalCode'].length > 0}
                    sx={{ display: 'flex', mb: 4 }}
                  />
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
                  <FormControlLabel
                    control={<Checkbox checked={agree} onChange={(e) => setAgree(e.currentTarget.checked)} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ mr: 1 }}>
                          با شرایط و قوانین سایت
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>موافق هستم </Typography>
                      </Box>
                    }
                  />
                  <Button className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1" fullWidth type='submit' disabled={!agree} variant='contained' sx={{ mb: 4 }}>
                    ثبت نام
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>قبلا ثبت نام کردید؟</Typography>
                    <Typography
                      component={LinkStyled}
                      href='/login'
                      sx={{ fontSize: theme.typography.body1.fontSize }}
                    >
                      لطفا وارد شوید
                    </Typography>
                  </Box>
                </form>
                :
                <form noValidate autoComplete='off' onSubmit={e => { e.preventDefault(); send_code(); }}>
                  <CustomTextField
                    fullWidth
                    type='text'
                    value={values.phoneNumber}
                    label='شماره همراه ( به نام خودتان)'
                    helperText={problems['phone_number']}
                    error={problems['phone_number'] && problems['phone_number'].length > 0}
                    onChange={handleChange('phoneNumber')}
                    sx={{ display: 'flex', mb: 4 }}
                    placeholder='091234567890'
                  />
                  <Button className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1" fullWidth type='submit' disabled={disableSendCode} variant='contained' sx={{ mb: 4 }}>
                    ارسال کد تایید
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>قبلا ثبت نام کرده اید؟</Typography>
                    <Typography href='/login' component={LinkStyled}>
                      وارد شوید
                    </Typography>
                  </Box>
                </form>
            }
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

RegisterV2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

RegisterV2.guestGuard = true

export default RegisterV2
