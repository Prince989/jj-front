import { Dialog, DialogContent, DialogActions, Button, Typography, Box, styled } from '@mui/material'

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

interface ConfirmationDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

const ConfirmationDialog = ({ open, onClose, onConfirm }: ConfirmationDialogProps) => {
    return (
        <StyledDialog
            open={open}
            onClose={onClose}
        >
            <DialogOverlay />
            <DialogContent>
                <MessageBox>
                    <Typography sx={{ color: '#2D2D2D', fontSize: '16px', textAlign: 'center' }}>
                        آیا از درخواست اعتبارسنجی اطمینان دارید؟
                    </Typography>
                </MessageBox>
            </DialogContent>
            <DialogActions className='dialog-actions-dense' style={{ flexDirection: "row-reverse" }}>
                <Button onClick={onConfirm}>تایید</Button>
                <Button onClick={onClose}>انصراف</Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default ConfirmationDialog 