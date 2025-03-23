// ** React Imports
import { useState, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

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

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import toast from 'react-hot-toast'
import Image from 'next/image'

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

type IProblem = {
  [key: string]: string[]
}

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const defaultValues = {
  password: '',
  phone_number: ''
}

interface FormData {
  phone_number: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [problems, setProblems] = useState<IProblem>({})

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))


  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues,
    mode: 'onBlur'
  })

  const onSubmit = (data: FormData) => {
    const { phone_number, password } = data
    auth.login({ phone_number, password, rememberMe }, (err) => {
      setProblems(err.response.data.problem)
      if (err.response?.data?.message)
        toast.error(err.response?.data?.message, {
          position: "bottom-left",
        })
    })
  }


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
            <Image src="/logo.png" unoptimized width={60} height={0} sizes='100vw' style={{ height: "auto" }} alt='Logo' />
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {`خوش آمدید به ${themeConfig.templateName}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                برای استفاده از خدمات لطفا وارد شوید
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Controller
                  name='phone_number'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='شماره همراه'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='09123456789'
                      helperText={problems['phone_number']}
                      error={problems['phone_number'] && problems['phone_number'].length > 0}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='رمز عبور'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      helperText={problems['password']}
                      error={problems['password'] && problems['password'].length > 0}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label='مرا بخاطر بسپار'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography component={LinkStyled} href='/forgot-password'>
                  فراموشی رمز عبور
                </Typography>
              </Box>
              <Button className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1" fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                ورود
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>اکانت ندارید؟</Typography>
                <Typography href='/register' component={LinkStyled}>
                  هم اکنون ثبت نام کنید
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
