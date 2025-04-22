// ** React Imports
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import Box from '@mui/material/Box'

// ** Custom Hooks
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'
import { usePersonalInfo } from 'src/hooks/usePersonalInfo'

// ** Components
import CircularProgress from '@mui/material/CircularProgress'

interface FormData {
    fname: string
    lname: string
    phoneNumber: string
    nationalCode: string
}

const StepPersonalInfo = () => {
    const { personalInfo, setPersonalInfo, setActiveStep, activeStep } = usePersonalInfoStore()
    const { handleUpdatePersonalInfo, isUpdating } = usePersonalInfo({
        onSuccess: () => handleNext()
    })

    const { handleSubmit, control, setValue, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            fname: '',
            lname: '',
            phoneNumber: '',
            nationalCode: ''
        }
    })

    useEffect(() => {
        if (personalInfo) {
            setValue('fname', personalInfo.fname || '')
            setValue('lname', personalInfo.lname || '')
            setValue('phoneNumber', personalInfo.phoneNumber || '')
            setValue('nationalCode', personalInfo.nationalCode || '')
        }
    }, [personalInfo, setValue])

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleFormSubmit = (data: FormData) => {
        handleUpdatePersonalInfo(data)
        setPersonalInfo(data)
    }

    const onError = (errors: any) => {
        console.log("Form validation errors:", errors)
    }

    if (!personalInfo) {
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
                        name='fname'
                        control={control}
                        rules={{ required: 'نام الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='نام'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='علی'
                                error={Boolean(errors.fname)}
                                helperText={errors.fname?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='lname'
                        control={control}
                        rules={{ required: 'نام خانوادگی الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='نام خانوادگی'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='محمدی'
                                error={Boolean(errors.lname)}
                                helperText={errors.lname?.message}
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
                                error={Boolean(errors.phoneNumber)}
                                helperText={errors.phoneNumber?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='nationalCode'
                        control={control}
                        rules={{ required: 'کد ملی الزامی است' }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='کد ملی'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='0023455422'
                                error={Boolean(errors.nationalCode)}
                                helperText={errors.nationalCode?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    type='submit'
                    variant='contained'
                    disabled={isUpdating}
                    className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                >
                    {isUpdating ? 'در حال بروزرسانی...' : 'ثبت اطلاعات'}
                </Button>
            </Grid>
        </form>
    )
}

export default StepPersonalInfo 