import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { SelectChangeEvent } from '@mui/material/Select'
import { Grid } from '@mui/material'
import FinalCreditDialog from './FinalCreditDialog'
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'

const StyledSelect = styled(Select)(() => ({
    backgroundColor: '#E0EFFF',
    border: '0.5px solid #002B8A',
    borderRadius: '6px',
    color: '#0B389F',
    fontWeight: 700,
    fontSize: '16px',
    '& .MuiSelect-select': {
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '0.5px solid #002B8A',
        borderRadius: '6px'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '0.5px solid #002B8A'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    }
}))

const CreditAmount = styled(Typography)(({ theme }) => ({
    color: '#FF6A00',
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: theme.spacing(2)
}))

const Description = styled(Typography)(({ theme }) => ({
    color: '#6F6B7D',
    fontSize: '15px',
    marginBottom: theme.spacing(8)
}))

const Description2 = styled(Typography)(({ theme }) => ({
    color: '#2E2E2E',
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: theme.spacing(3)
}))

const InfoBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#F1FFEF',
    borderRadius: '10px',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(8),
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2)
}))

const CreditDetailsBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#F3F3F3',
    borderRadius: '10px',
    padding: theme.spacing(5),
    boxShadow: '0px 13px 50px -14px rgba(0, 0, 0, 0.1)'
}))

const StepFinalCredit = () => {
    const cardInfo = usePersonalInfoStore(state => state.cardInfo)
    const [paymentPeriod, setPaymentPeriod] = useState('12')
    const [dialogOpen, setDialogOpen] = useState(false)

    const periods = [
        { value: '6', label: '۶ ماهه' },
        { value: '12', label: '۱۲ ماهه' },
    ]

    const handleFinalRequest = () => {
        setDialogOpen(true)
    }

    if (!cardInfo) {
        return null
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <CreditAmount>{cardInfo.price} تومان</CreditAmount>
                <Description2>
                    اعتبار تخصیص یافته به شما برای خدمات درمانی جی جی لاین میباشد.
                </Description2>
            </Box>
            <Description>
                کاربر گرامی! با تایید اعتبار, مبلغ به حساب جی جی لاین شما مینشیند.
            </Description>

            <InfoBox>
                <CheckCircleIcon sx={{ color: '#129D00' }} />
                <Typography sx={{ color: '#6F6B7D', fontSize: '15px' }}>
                    کاربر گرامی جی جی لاین!
                    این مبلغ طبق اعتبارسنجی شما بررسی شده شده است و اقساط شما پس از خرید خدمات و کالاها محاسبه میشود. چنانچه مبلغ خرجکرد شما از اعتبارتان کمتر شده باشد سیسم فقط برای مبلغ خرجکزد شما اقساط را لحاظ میکند.
                </Typography>
            </InfoBox>

            <CreditDetailsBox>
                <Box sx={{ mb: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E5E5', pb: 3 }}>
                    <Typography sx={{ color: '#0B389F', fontWeight: 700, fontSize: '16px' }}>
                        وام تخصیص داده شده
                    </Typography>
                    <Typography sx={{ color: '#0B389F', fontWeight: 700, fontSize: '16px' }}>
                        {cardInfo.price} تومان
                    </Typography>
                </Box>

                <Box sx={{ mb: 9, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: '#0B389F', fontWeight: 600, fontSize: '16px', mb: 1 }}>
                        مدت بازپرداخت
                    </Typography>
                    <StyledSelect
                        value={paymentPeriod}
                        onChange={(e: SelectChangeEvent<unknown>) => setPaymentPeriod(e.target.value as string)}
                    >
                        {periods.map((period) => (
                            <MenuItem key={period.value} value={period.value}>
                                {period.label}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </Box>

                <Box sx={{ mb: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#0B389F', fontWeight: 700, fontSize: '16px' }}>
                        مبلغ هر قسط
                    </Typography>
                    <Typography sx={{ color: '#0B389F', fontWeight: 700, fontSize: '16px' }}>
                        ۱/۵۴۰/۰۰۰ تومان
                    </Typography>
                </Box>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        onClick={handleFinalRequest}
                        className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                    >
                        درخواست نهایی کسب اعتبار جی جی لاین
                    </Button>
                </Grid>
            </CreditDetailsBox>

            <FinalCreditDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                selectedCard={cardInfo}
            />
        </Box>
    )
}

export default StepFinalCredit 