import { Dialog, DialogContent } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { CardInfo } from 'src/store/usePersonalInfoStore'

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '10px',
        maxWidth: '400px',
        width: '100%',
        margin: theme.spacing(2),
        backgroundColor: '#FFFFFF'
    }
}))

const DialogOverlay = styled(Box)(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
    zIndex: -1
}))

const MessageBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
}))

interface FinalCreditDialogProps {
    open: boolean
    onClose: () => void
    selectedCard: CardInfo | null
}

const FinalCreditDialog = ({ open, onClose, selectedCard }: FinalCreditDialogProps) => {
    if (!selectedCard) return null

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            aria-labelledby="final-credit-dialog"
        >
            <DialogOverlay />
            <DialogContent>
                <MessageBox>
                    <CheckCircleIcon sx={{ color: '#129D00', fontSize: 40, mb: 3 }} />
                    <Typography
                        sx={{
                            color: '#2D2D2D',
                            fontSize: '16px',
                            textAlign: 'center',
                            lineHeight: 2
                        }}
                    >
                        کاربر گرامی!
                        <br />
                        مبلغ {selectedCard.amount} تومان به حساب شما برای خرید کالا یا خدمات جی جی لاین نشست.
                    </Typography>
                </MessageBox>
            </DialogContent>
        </StyledDialog>
    )
}

export default FinalCreditDialog 