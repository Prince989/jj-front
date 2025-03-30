// ** React Imports
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import Box from '@mui/material/Box'

// ** Custom Hooks
import { useProfile } from 'src/hooks/useProfile'
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'

// ** Components
import CircularProgress from '@mui/material/CircularProgress'

interface FormData {
    fullName: string
    nationalId: string
    phoneNumber: string
    birthDate: string
    postalCode: string
    address: string
}

const StepPersonalInfo = () => {
    const { profileData, loading } = useProfile()
    const setPersonalInfo = usePersonalInfoStore(state => state.setPersonalInfo)
    const { setActiveStep, activeStep } = usePersonalInfoStore()

    const { handleSubmit, control, setValue, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            fullName: '',
            nationalId: '',
            phoneNumber: '',
            birthDate: '',
            postalCode: '',
            address: ''
        }
    })

    useEffect(() => {
        if (profileData) {
            setValue('fullName', `${profileData.fName} ${profileData.lName}`)
            setValue('nationalId', profileData.nationalCode)
            setValue('phoneNumber', profileData.phoneNumber)
            setValue('birthDate', profileData.birthDate || '')
        }
    }, [profileData, setValue])

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleFormSubmit = (data: FormData) => {
        console.log("Form submission attempted")
        console.log("Form data:", data)
        setPersonalInfo(data)
        handleNext()
    }

    const onError = (errors: any) => {
        console.log("Form validation errors:", errors)
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit(handleFormSubmit, onError)} className='h-full flex flex-col justify-between'>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='fullName'
                        control={control}
                        rules={{ required: 'نام و نام خانوادگی الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='نام و نام خانوادگی'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='علی محمدی'
                                disabled
                                error={Boolean(errors.fullName)}
                                helperText={errors.fullName?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='nationalId'
                        control={control}
                        rules={{ required: 'شماره ملی الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='شماره ملی'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='0023455422'
                                disabled
                                error={Boolean(errors.nationalId)}
                                helperText={errors.nationalId?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='birthDate'
                        control={control}

                        // rules={{ required: 'تاریخ تولد الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='تاریخ تولد'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='1345/09/19'
                                disabled
                                error={Boolean(errors.birthDate)}
                                helperText={errors.birthDate?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon fontSize='1.25rem' icon='tabler:calendar' />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='phoneNumber'
                        control={control}
                        rules={{ required: 'شماره همراه الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='شماره همراه'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='09123456788'
                                disabled
                                error={Boolean(errors.phoneNumber)}
                                helperText={errors.phoneNumber?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='postalCode'
                        control={control}
                        rules={{ required: 'کد پستی الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='کدپستی'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='1234567898'
                                error={Boolean(errors.postalCode)}
                                helperText={errors.postalCode?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='address'
                        control={control}
                        rules={{ required: 'آدرس الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='آدرس'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='تهران، تهران'
                                error={Boolean(errors.address)}
                                helperText={errors.address?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    type='submit'
                    variant='contained'
                    className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                >
                    ثبت اطلاعات
                </Button>
            </Grid>
        </form>
    )
}

export default StepPersonalInfo 