// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Link from '@mui/material/Link'
import { Grid, CircularProgress, List, ListItem } from '@mui/material'

// ** Types & Data
import { CardInfo } from 'src/store/usePersonalInfoStore'

// ** Store Import
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'
import useCards from 'src/hooks/useCards'
import { usePurchase } from 'src/hooks/usePurchase'
import ValidationOTP from './ValidationOTP'

// ** Styled Components
const CardImage = styled('img')({
    width: '100%',
    height: 'auto',
    maxWidth: '400px'
})

const StyledLink = styled(Link)({
    color: '#FF6A00',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    position: 'relative',
    paddingBottom: '4px',
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '1px',
        backgroundColor: '#FF6A00',
        opacity: 0.6
    },
    '&:hover::after': {
        opacity: 1
    }
})

// Card Component
const CreditCard = ({ data, selectedCard, onChange }: { data: CardInfo, selectedCard: string, onChange: (value: string) => void }) => (
    <Box sx={{ flex: 1, maxWidth: '500px' }}>
        <CardImage src={data.image} alt={data.title} />
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                    value={data.id.toString()}
                    control={<Radio checked={selectedCard === data.id.toString()} onChange={() => onChange(data.id.toString())} />}
                    label={<Typography sx={{ fontSize: '15px', color: '#2E2E2E', fontWeight: '500' }}>{data.title}</Typography>}
                />
                <Typography sx={{ fontSize: '15px', color: '#002B8A' }}>
                    قیمت: {data.price.toLocaleString()} ریال
                </Typography>
            </Box>
            <List dense sx={{ fontSize: '12px', color: '#2E2E2E', pl: 4 }}>
                {data.subTitle.map((item, index) => (
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                <StyledLink>
                    توضیحات بیشتر
                </StyledLink>
            </Box>
        </Box>
    </Box>
)

const StepCardSelection = () => {
    const [selectedCard, setSelectedCard] = useState<string>('')
    const { cards, loading, error } = useCards()
    const { setCardInfo } = usePersonalInfoStore()
    const { isPaymentLoading, handlePayment } = usePurchase({ selectedCard })
    const [otpShow, setOtpShow] = useState<boolean>(false);

    const handleClose = () => {
        setOtpShow(false)
    }

    const handleCardChange = (value: string) => {
        setSelectedCard(value)
        const selectedCardData = cards.find(card => card.id.toString() === value)
        if (selectedCardData) {
            const cardImage = selectedCardData.id === 1
                ? '/images/validation-forms/50mil.png'
                : '/images/validation-forms/200mil.png'

            setCardInfo({
                id: selectedCardData.id,
                title: selectedCardData.title,
                credit: selectedCardData.credit,
                price: selectedCardData.price,
                installCount: selectedCardData.installCount,
                subTitle: selectedCardData.subTitle,
                createdAt: selectedCardData.createdAt,
                updatedAt: selectedCardData.updatedAt,
                image: cardImage,
            })
        } else {
            setCardInfo({
                id: '',
                title: '',
                credit: 0,
                price: 0,
                installCount: 0,
                subTitle: [],
                image: '',
            })
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Typography color="error">خطا در دریافت اطلاعات کارت‌ها</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ mt: 4 }}>
            <RadioGroup
                value={selectedCard}
                name="card-selection"
                sx={{ gap: 4 }}
            >
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center' }}>
                    {cards.map((card) => (
                        <CreditCard
                            key={card.id}
                            data={{
                                id: card.id,
                                title: card.title,
                                credit: card.credit,
                                price: card.price,
                                installCount: card.installCount,
                                subTitle: card.subTitle,
                                createdAt: card.createdAt,
                                updatedAt: card.updatedAt,
                                image: card.id === 1 ? '/images/validation-forms/50mil.png' : '/images/validation-forms/200mil.png',
                            }}
                            selectedCard={selectedCard}
                            onChange={handleCardChange}
                        />
                    ))}
                </Box>
            </RadioGroup>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 16 }}>
                <Button
                    type='submit'
                    variant='contained'
                    className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                    onClick={() => setOtpShow(true)}
                    disabled={!selectedCard || isPaymentLoading}
                >
                    {isPaymentLoading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={20} color="inherit" />
                            <span>در حال پردازش...</span>
                        </Box>
                    ) : 'پرداخت'}
                </Button>
            </Grid>
            {
                otpShow && <ValidationOTP handlePayment={handlePayment} handleClose={handleClose} />
            }
        </Box>
    )
}

export default StepCardSelection 