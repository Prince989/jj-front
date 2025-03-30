import { Box, Typography, Button, styled, Grid } from '@mui/material'
import { useEffect } from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'

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

const CardInfo = () => {
    const personalInfo = usePersonalInfoStore(state => state.personalInfo)
    const cardInfo = usePersonalInfoStore(state => state.cardInfo)

    useEffect(() => {
        console.log("personalInfo", personalInfo)
        console.log("cardInfo", cardInfo)
    }, [personalInfo, cardInfo])

    if (!personalInfo || !cardInfo) {
        return null // or some loading state/error message
    }

    return (
        <Box>
            {/* User Information Grid */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={personalInfo.fullName}
                        label="نام و نام خانوادگی"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={personalInfo.nationalId}
                        label="شماره ملی"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={4} mb={8}>
                    <CustomTextField
                        fullWidth
                        value={personalInfo.birthDate}
                        label="تاریخ تولد"
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={4} mb={8}>
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
                </Grid>
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
                                    <StatusChip>{cardInfo.status}</StatusChip>
                                    <Typography sx={{ fontSize: '14px', color: '#002B8A', fontWeight: '600' }}>قیمت: {cardInfo.price} تومان</Typography>
                                </Box>
                            </Box>

                            <Typography sx={{ mb: 3, color: '#666666' }}>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                            </Typography>
                        </Box>
                    </Grid>
                    {/* Right Column - Content */}
                    <Grid item xs={12} md={5}>
                        <CardImage src={cardInfo.image} alt={cardInfo.status} />
                    </Grid>
                </Grid>
            </CardContainer>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 16 }}>
                <Button
                    type='submit'
                    variant='contained'
                    className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                >
                    درخواست اعتبار سنجی
                </Button>
            </Grid>
        </Box>
    )
}

export default CardInfo 