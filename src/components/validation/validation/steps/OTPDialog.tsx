import { Dialog, DialogContent, DialogActions, Button, Box, styled } from '@mui/material'
import CustomOtpInput from '../CustomOTPInput'
import { useState, useEffect } from 'react'

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '10px',
        maxWidth: '400px',
        width: '100%',
        margin: theme.spacing(2),
        backgroundColor: '#FFFFFF'
    }
}))

interface OTPDialogProps {
    open: boolean
    onClose: () => void
    onVerify: (token: string) => Promise<void>
}

const OTPDialog = ({ open, onClose, onVerify }: OTPDialogProps) => {
    const [otpToken, setOtpToken] = useState<number | null>(null)
    const [timer, setTimer] = useState<number>(75)

    useEffect(() => {
        if (!timer) return

        const intervalId = setInterval(() => {
            if (open) {
                setTimer(timer - 1)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timer, open])

    const handleVerify = async () => {
        if (!otpToken) return
        await onVerify(otpToken.toString())
    }

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
        >
            <DialogContent>
                <Box sx={{ padding: "40px", minWidth: "300px" }}>
                    <DialogContent sx={{ mb: "5px" }}>
                        کد ارسال شده را وارد نمایید
                    </DialogContent>
                    <DialogContent>
                        <CustomOtpInput
                            value={otpToken}
                            onChange={(e) => setOtpToken(e)}
                            hasError={false}
                        />
                        {timer > 0 ? (
                            <Box>
                                {timer} ثانیه تا ارسال مجدد
                            </Box>
                        ) : (
                            <Box>
                                <Button onClick={() => setTimer(75)} sx={{ color: "blue" }}>
                                    ارسال مجدد کد تایید
                                </Button>
                            </Box>
                        )}
                    </DialogContent>
                </Box>
            </DialogContent>
            <DialogActions className='dialog-actions-dense' style={{ flexDirection: "row-reverse" }}>
                <Button
                    disabled={!otpToken || otpToken.toString().length !== 4}
                    onClick={handleVerify}
                >
                    تایید
                </Button>
                <Button onClick={onClose}>انصراف</Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default OTPDialog 