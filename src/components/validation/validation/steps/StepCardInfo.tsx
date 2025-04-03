// ** React Imports
import { Controller } from 'react-hook-form'
import { useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { UseFormSetValue } from 'react-hook-form'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Store Import
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'

interface FormData {
    cardNumber: string
    sheba: string
    fullName: string
    nationalId: string
}

interface StepCardInfoProps {
    handleSubmit: (onValid: (data: FormData) => void) => (e: React.FormEvent) => void
    onSubmit: (data: FormData) => void
    control: any
    setValue: UseFormSetValue<FormData>
}

const StepCardInfo = ({ handleSubmit, onSubmit, control, setValue }: StepCardInfoProps) => {
    const personalInfo = usePersonalInfoStore(state => state.personalInfo)

    useEffect(() => {
        if (personalInfo) {
            // Pre-fill the form with personal information
            setValue('fullName', personalInfo.fullName)
            setValue('nationalId', personalInfo.nationalId)
        }
    }, [personalInfo, setValue])

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='fullName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='نام و نام خانوادگی'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='علی محمدی'
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='nationalId'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='شماره ملی'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='0023455422'
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='cardNumber'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='شماره کارت'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='6037-xxxx-xxxx-xxxx'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='sheba'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='شماره شبا'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='IR xx-xxxx-xxxx-xxxx-xxxx-xxxx-xx'
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

export default StepCardInfo 