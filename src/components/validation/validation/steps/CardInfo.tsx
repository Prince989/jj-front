import { Box, Typography, Button, styled, Grid, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'
import { List, ListItem } from '@mui/material'
import { useFinancialValidation } from 'src/hooks/useFinancialValidation'
import { usePaymentVerification } from 'src/hooks/usePaymentVerification'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import ConfirmationDialog from './ConfirmationDialog'
import OTPDialog from './OTPDialog'

// import { format } from 'date-fns-jalali'

// Styled components
const CardContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
}))

const StatusChip = styled(Box)(() => ({
    background: '#4CAF50',
    color: '#FFFFFF',
    padding: '4px 10px',
    borderRadius: '9px',
    fontSize: '12px',
    textAlign: 'center',
}))

const CardImage = styled('img')({
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
})

const LoadingContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: '16px'
})

// Add this helper function before the CardInfo component
// const formatBirthDate = (dateString: string) => {
//     try {
//         // First try to parse the date string
//         const date = new Date(dateString)
//         if (isNaN(date.getTime())) {
//             // If the date is invalid, return the original string
//             return dateString
//         }

//         return format(date, 'yyyy/MM/dd')
//     } catch (error) {
//         // If any error occurs, return the original string

//         return dateString
//     }
// }

const CardInfo = () => {
    const router = useRouter()
    const personalInfo = usePersonalInfoStore(state => state.personalInfo)
    const cardInfo = usePersonalInfoStore(state => state.cardInfo)
    const { handleValidation } = useFinancialValidation()
    const { setActiveStep } = usePersonalInfoStore()
    const { loading, error, getVerificationOtp, verifyOtp } = usePaymentVerification()

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
    const [showOtpDialog, setShowOtpDialog] = useState(false)

    useEffect(() => {
        if (error) {
            toast.error('خطا در تایید پرداخت. لطفا مجددا تلاش کنید.')
            const timer = setTimeout(() => {
                setActiveStep(0)
                router.push('/validation', undefined, { shallow: true })
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [error, setActiveStep, router])

    const handleConfirmation = async () => {
        setShowConfirmationDialog(false)
        setShowOtpDialog(true)
        const success = await getVerificationOtp()
        if (!success) {
            setShowOtpDialog(false)
        }
    }

    const handleOtpVerification = async (token: string) => {
        const success = await verifyOtp(token)
        if (success) {
            await handleValidation()
            handleNext()
        }
    }

    const handleValidationClick = () => {
        setShowConfirmationDialog(true)
    }

    const handleNext = () => {
        setActiveStep(3)
    }

    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress />
                <Typography>در حال بررسی وضعیت پرداخت...</Typography>
            </LoadingContainer>
        )
    }

    if (!personalInfo || !cardInfo) {
        return null
    }

    return (
        <Box>
            {/* User Information Grid */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={`${personalInfo.fname} ${personalInfo.lname}`}
                        label="نام و نام خانوادگی"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={personalInfo.nationalCode}
                        label="شماره ملی"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid>
                {/* <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={formatBirthDate(personalInfo.birthDate)}
                        label="تاریخ تولد"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid> */}
                {/* <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={personalInfo.address}
                        label="آدرس"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={personalInfo.postalCode}
                        label="کد پستی"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid> */}
                <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={personalInfo.phoneNumber}
                        label="شماره همراه"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid>
            </Grid>

            {/* Card Display Section */}
            <CardContainer>
                <Grid container spacing={4}>
                    {/* Left Column - Card */}
                    <Grid item xs={12} md={7}>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 9 }}>
                                <Typography sx={{ fontSize: '14px', color: '#2E2E2E', fontWeight: '600' }}>کارت اعتبار ۵۰ میلیون تومانی</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <StatusChip>پرداخت شده</StatusChip>
                                    <Typography sx={{ fontSize: '14px', color: '#002B8A', fontWeight: '600' }}>قیمت: {cardInfo.price} تومان</Typography>
                                </Box>
                            </Box>

                            <List dense sx={{ fontSize: '12px', color: '#2E2E2E', pl: 4 }}>
                                {cardInfo.subTitle?.map((item: string, index: number) => (
                                    <ListItem key={index} sx={{
                                        display: 'list-item',
                                        listStyleType: 'disc',
                                        fontSize: '12px',
                                        padding: '2px 0'
                                    }}>
                                        {item}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    {/* Right Column - Content */}
                    <Grid item xs={12} md={5}>
                        <CardImage src={cardInfo.image} alt="پرداخت شده" />
                    </Grid>
                </Grid>
            </CardContainer>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 16 }}>
                <Button
                    type='submit'
                    variant='contained'
                    className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                    onClick={handleValidationClick}
                >
                    درخواست اعتبارسنجی
                </Button>
            </Grid>

            <ConfirmationDialog
                open={showConfirmationDialog}
                onClose={() => setShowConfirmationDialog(false)}
                onConfirm={handleConfirmation}
            />

            <OTPDialog
                open={showOtpDialog}
                onClose={() => setShowOtpDialog(false)}
                onVerify={handleOtpVerification}
            />
        </Box>
    )
}

export default CardInfo 