import React, { useState } from 'react'
import {
    TextField,
    Button,
    MenuItem,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { validatePhone, validateFullName, persianToEnglish, englishToPersian } from '../utils/validation'

const serviceTypes = [
    { value: 'implant', label: 'ایمپلنت دندان' },
    { value: 'root-canal', label: 'عصب کشی' },
    { value: 'composite', label: 'کامپوزیت' },
    { value: 'laminate', label: 'لمینیت' },
    { value: 'surgery', label: 'جراحی دندان' }
]

const ContactFormSection = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        serviceType: ''
    })
    const [phoneError, setPhoneError] = useState('')
    const [nameError, setNameError] = useState('')
    const [displayPhone, setDisplayPhone] = useState('')

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const englishValue = persianToEnglish(value)
        setFormData(prev => ({ ...prev, phoneNumber: englishValue }))
        setDisplayPhone(value)
        const validation = validatePhone(value)
        setPhoneError(validation.error)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData(prev => ({ ...prev, fullName: value }))
        const validation = validateFullName(value)
        setNameError(validation.error)
    }

    const handlePhoneBlur = () => {
        if (formData.phoneNumber) {
            setDisplayPhone(englishToPersian(formData.phoneNumber))
        }
    }

    const handlePhoneFocus = () => {
        if (formData.phoneNumber) {
            setDisplayPhone(englishToPersian(formData.phoneNumber))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'phoneNumber') {
            handlePhoneChange(e)
        } else if (name === 'fullName') {
            handleNameChange(e)
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const phoneValidation = validatePhone(formData.phoneNumber)
        const nameValidation = validateFullName(formData.fullName)

        setPhoneError(phoneValidation.error)
        setNameError(nameValidation.error)

        if (phoneValidation.isValid && nameValidation.isValid) {
            console.log('Form submitted:', formData)
        }
    }

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            boxShadow: 'none',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            height: '48px',
            '& fieldset': {
                borderColor: '#E5E5E5',
                borderWidth: '1px',
            },
            '&:hover fieldset': {
                borderColor: '#E5E5E5',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#E5E5E5',
            },
        },
        '& .MuiOutlinedInput-input': {
            color: '#949494',
            fontSize: '16px',
            fontWeight: 400,
            padding: '16px 20px',
            '&::placeholder': {
                color: '#949494',
                opacity: 1,

            },
        },
    }

    return (
        <section className="w-full bg-gradient-to-b from-sky-50 to-primary-blue-2 rounded-3xl py-6">            <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-black text-primary-blue text-center mb-5">
                فرم دریافت خدمات
            </h2>
            <h6 className="text-primary-blue text-sm lg:text-lg font-normal text-center mb-10">
                لطفا اطلاعات خود را در فرم زیر وارد کنید تا با شما تماس بگیریم
            </h6>

            <form onSubmit={handleSubmit} className="lg:p-5">
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="mb-3">
                        <label className="block text-primary-gray text-sm lg:text-base font-semibold mb-2">
                            نام و نام خانوادگی
                        </label>
                        <TextField
                            fullWidth
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="امیرحسین سانح"
                            variant="outlined"
                            error={!!nameError}
                            helperText={nameError}
                            sx={{
                                ...inputStyles,
                                '& .MuiFormHelperText-root': {
                                    color: '#d32f2f',
                                    marginRight: 0,
                                    marginTop: '4px',
                                    fontSize: '12px'
                                }
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-primary-gray text-sm lg:text-base font-semibold mb-2">
                            شماره همراه
                        </label>
                        <TextField
                            fullWidth
                            name="phoneNumber"
                            value={displayPhone}
                            onChange={handleChange}
                            onBlur={handlePhoneBlur}
                            onFocus={handlePhoneFocus}
                            placeholder="۰۹۱۲۱۲۳۴۵۶۷۸"
                            variant="outlined"
                            error={!!phoneError}
                            helperText={phoneError}
                            sx={{
                                ...inputStyles,
                                '& .MuiFormHelperText-root': {
                                    color: '#d32f2f',
                                    marginRight: 0,
                                    marginTop: '4px',
                                    fontSize: '12px'
                                }
                            }}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-primary-gray text-sm lg:text-base font-semibold mb-2">
                            نوع خدمت
                        </label>
                        <TextField
                            select
                            fullWidth
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            placeholder="ایمپلنت دندان"
                            variant="outlined"
                            sx={inputStyles}
                            SelectProps={{
                                IconComponent: KeyboardArrowDownIcon,
                                sx: {
                                    '& .rtl-18j6xgb-MuiInputBase-root-MuiOutlinedInput-root .MuiSvgIcon-root': {
                                        left: '14px',
                                    },
                                },
                                MenuProps: {
                                    PaperProps: {
                                        sx: {
                                            mt: 1,
                                            borderRadius: '16px',
                                            '& .MuiMenuItem-root': {
                                                fontSize: '16px',
                                                py: 1.5,
                                                '&.Mui-selected': {
                                                    backgroundColor: '#FF6B00 !important',
                                                    color: '#FFFFFF !important',
                                                    '&:hover': {
                                                        backgroundColor: '#FF6B00 !important',
                                                        color: '#fff !important'
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: '#FFF5EB !important',
                                                    color: '#FF6B00 !important'
                                                }
                                            }
                                        }
                                    }
                                }
                            }}
                        >
                            {serviceTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="mb-5 flex items-end">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="bg-primary-orange hover:bg-primary-orange text-white rounded-lg h-12 text-sm lg:text-base font-semibold"
                        >
                            تایید و ارسال فرم
                        </Button>
                    </div>
                </div>
            </form>
        </div>
        </section>
    )
}

export default ContactFormSection 