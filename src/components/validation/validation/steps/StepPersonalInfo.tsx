// ** React Imports
import { Controller } from 'react-hook-form'
import { useEffect } from 'react'
// ** MUI Imports
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import { UseFormSetValue } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import Box from '@mui/material/Box'

// ** Custom Hooks
import { useProfile } from 'src/hooks/useProfile'

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

interface StepPersonalInfoProps {
    handleSubmit: (onValid: (data: FormData) => void) => (e: React.FormEvent) => void
    onSubmit: (data: FormData) => void
    control: any
    setValue: UseFormSetValue<FormData>
}

const StepPersonalInfo = ({ handleSubmit, onSubmit, control, setValue }: StepPersonalInfoProps) => {
    const { profileData, loading } = useProfile()

    useEffect(() => {
        if (profileData) {
            setValue('fullName', `${profileData.fName} ${profileData.lName}`)
            setValue('nationalId', profileData.nationalCode)
            setValue('phoneNumber', profileData.phoneNumber)
            setValue('birthDate', profileData.birthDate || '')
            // Note: postalCode and address are not in the API response, 
            // so we're not setting them here
        }
    }, [profileData, setValue])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        )
    }

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
                        name='birthDate'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='تاریخ تولد'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='1345/09/19'
                                disabled
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
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='شماره همراه'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='09123456788'
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='postalCode'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='کدپستی'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='1234567898'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='address'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='آدرس'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='تهران، تهران'
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