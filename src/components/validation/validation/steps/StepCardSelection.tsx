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
import { Grid } from '@mui/material'

// ** Types & Data
import { creditCardsData } from '../../../../configs/credit-cards'

import { CardInfo } from 'src/store/usePersonalInfoStore'


// ** Store Import
import { usePersonalInfoStore } from 'src/store/usePersonalInfoStore'


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
                    value={data.id}
                    control={<Radio checked={selectedCard === data.id} onChange={() => onChange(data.id)} />}
                    label={<Typography sx={{ fontSize: '15px', color: '#2E2E2E', fontWeight: '500' }}>{data.title}</Typography>}
                />
                <Typography sx={{ fontSize: '15px', color: '#002B8A' }}>
                    {data.price}
                </Typography>
            </Box>
            <Typography sx={{ fontSize: '12px', color: '#2E2E2E' }}>
                {data.description}
            </Typography>
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

    const { setActiveStep, activeStep, setCardInfo } = usePersonalInfoStore()


    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleCardChange = (value: string) => {
        setSelectedCard(value)
        const selectedCardData = creditCardsData.find(card => card.id === value)
        if (selectedCardData) {
            setCardInfo({
                id: selectedCardData.id,
                title: selectedCardData.title,
                description: selectedCardData.description,
                price: selectedCardData.price,
                status: 'پرداخت شده',
                image: selectedCardData.image,
                amount: selectedCardData.amount
            })
        } else {
            setCardInfo({
                id: '',
                title: '',
                description: '',
                price: '',
                status: '',
                image: '',
                amount: ''
            })
        }
    }

    return (
        <Box sx={{ mt: 4 }}>
            <RadioGroup
                value={selectedCard}
                name="card-selection"
                sx={{ gap: 4 }}
            >
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center' }}>
                    {creditCardsData.map((card) => (
                        <CreditCard
                            key={card.id}
                            data={card}
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
                    onClick={handleNext}
                    disabled={!selectedCard}
                >
                    پرداخت
                </Button>
            </Grid>
        </Box>
    )
}

export default StepCardSelection 