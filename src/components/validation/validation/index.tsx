// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MuiStep, { StepProps } from '@mui/material/Step'
import MuiStepper, { StepperProps } from '@mui/material/Stepper'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** React Imports
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Step Components
// import StepPersonalInfo from './steps/StepPersonalInfo'
import StepCardSelection from './steps/StepCardSelection'
import CardInfo from './steps/CardInfo'
import StepFinalCredit from './steps/StepFinalCredit'

// ** Store Import
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'

// ** Custom Hooks
import { useProfile } from 'src/hooks/useProfile'

const steps = [

  // {
  //   title: 'تکمیل اطلاعات هویتی',
  //   icon: 'tabler:user',
  //   subtitle: 'اطلاعات هویتی خود را تکمیل نمایید'
  // },
  {
    icon: 'tabler:credit-card',
    title: 'انتخاب و پرداخت هزینه کارت',
    subtitle: 'هزینه کارت اعتباری را پرداخت نمایید'
  },
  {
    title: 'درخواست اعتبارسنجی',
    icon: 'tabler:file-check',
    subtitle: 'درخواست اعتبارسنجی آغاز میشود'
  },
  {
    icon: 'tabler:wallet',
    subtitle: 'محاسبه نهایی دریافت اعتبار',
    title: 'دریافت سقف اعتبار'
  }
]

const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  height: '100%',
  minWidth: '15rem',
  '& .MuiStep-root:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(0)
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 0
  }

}))

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const Step = styled(MuiStep)<StepProps>(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(6),

  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: "0 !important"
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`,
    fontSize: '12px',
    marginTop: '4px'
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed': {
    '& .step-title': {
      color: '#032F90',
      fontWeight: 600
    },
  },
  '& .step-title': {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.text.primary,
    transition: 'color 0.2s ease'
  },
  '& .MuiStepLabel-label': {
    cursor: 'pointer'
  },
  '& .step-label': {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }
}))

const StepperConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: '23px',
    padding: 0
  },
  [`&.${stepConnectorClasses.active}`]: {
    borderColor: theme.palette.primary.light
  },
  [`&.${stepConnectorClasses.completed}`]: {
    borderColor: theme.palette.primary.main
  },
  '&&& .MuiStepConnector-line': {
    borderRadius: 0,
    minHeight: '3rem',
    border: 'none',
    borderLeft: '1.5px dashed #D6E3FF',
    margin: 0,
    padding: 0
  },
  '.MuiStepper-vertical &': {
    marginLeft: '23px !important',
    height: '100%',
    marginRight: 0,
  }
}))

const ValidationWizard = () => {
  // ** Store
  const { activeStep, setActiveStep, setPersonalInfo } = usePersonalInfoStore()

  // ** Hooks
  const searchParams = useSearchParams()
  const { profileData } = useProfile()

  useEffect(() => {
    const paymentStatus = searchParams.get('status')
    if (paymentStatus === 'success') {
      setActiveStep(2)
    }
  }, [searchParams, setActiveStep])

  useEffect(() => {
    if (profileData) {
      setPersonalInfo({
        fullName: `${profileData.fName} ${profileData.lName}`,
        nationalId: profileData.nationalCode,
        phoneNumber: profileData.phoneNumber,
        birthDate: profileData.birthDate || '',
        postalCode: '',
        address: ''
      })
    }
  }, [profileData, setPersonalInfo])

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:

      // return <StepPersonalInfo />
      case 1:
        return <StepCardSelection />
      case 2:
        return <CardInfo />
      case 3:
        return <StepFinalCredit />
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  return (
    <>
      <Box sx={{ mb: 6, textAlign: 'left' }}>
        <Typography variant='h3' sx={{ mb: 3, fontSize: "24px", fontWeight: 700, color: "#002B8A" }}>
          اعتبارسنجی
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          کاربر گرامی! لطفا اطلاعات خود را به صورت کامل تکمیل نمایید تا اعتبار سنجی شما انجام شود.
        </Typography>
      </Box>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, boxShadow: "none" }}>
        <StepperHeaderContainer>
          <StepperWrapper>
            <Stepper
              activeStep={activeStep}
              orientation='vertical'
              connector={<StepperConnector />}
              sx={{ height: '100%', minWidth: '15rem' }}
            >
              {steps.map((step, index) => {
                const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

                return (
                  <Step
                    key={index}
                    sx={{ '&.Mui-completed + svg': { color: 'primary.main' }, mb: "0px !important" }}
                  >
                    <StepLabel>
                      <div className='step-label'>
                        <RenderAvatar
                          variant='rounded'
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '8px',
                            margin: "0px !important",
                            ...(activeStep === index && {
                              background: '#D6E3FF',
                              color: '#0C3A9F',
                              boxShadow: 'none'
                            }),
                            ...(activeStep > index && {
                              background: 'linear-gradient(270deg, #032F90 75%, #3B75F6 100%) !important',
                              color: '#FFFFFF'
                            }),
                            ...(activeStep < index && {
                              background: '#F5F5F5',
                              color: '#6F6B7D'
                            })
                          }}
                        >
                          <Icon icon={step.icon} fontSize='1.5rem' />
                        </RenderAvatar>
                        <div>
                          <Typography className='step-title'>{step.title}</Typography>
                          <Typography className='step-subtitle'>{step.subtitle}</Typography>
                        </div>
                      </div>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </StepperWrapper>
        </StepperHeaderContainer>
        <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important`, flex: 1 }}>
          {renderContent()}
        </CardContent>
      </Card>
    </>
  )
}

export default ValidationWizard
