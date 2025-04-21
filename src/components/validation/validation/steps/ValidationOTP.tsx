import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import mAxios from 'src/configs/axios'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomOtpInput from '../CustomOTPInput'
import { useAuth } from 'src/hooks/useAuth'
import { toast } from 'react-hot-toast'
import { Box } from '@mui/system'

export default function ValidationOTP(
    { handlePayment, handleClose }:
        {
            handlePayment: () => Promise<void>,
            handleClose: () => void
        }
) {

    const [showOtp, setShowOtp] = useState<boolean>(true);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [token, setToken] = useState<number | null>(null);
    const [timer, setTimer] = useState<number>(75);
    const { otpLogin } = useAuth();

    const handleSetMobile = () => {
        if (phoneNumber)
            mAxios.post("/auth/otp", {
                phoneNumber
            })
                .then(() => {
                    setShowOtp(true)
                    setTimer(75);
                })
    }

    const handleLogin = () => {
        if (token)
            otpLogin({
                phoneNumber: "09194321624",
                token: token?.toString()
            }, () => {
                handlePayment();
            }, (err) => {
                if (err?.response?.data?.message)
                    toast.error(err?.response?.data?.message, {
                        position: "bottom-left",
                    })
            })
    }

    React.useEffect(() => {
        // exit early when we reach 0
        if (!timer) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            if (showOtp)
                setTimer(timer - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);

        // add timer as a dependency to re-rerun the effect
        // when we update it
    }, [timer, showOtp]);

    return (
        <Dialog open={true} aria-labelledby='form-dialog-title'>
            {
                !showOtp ?
                    <>
                        <Box sx={{ padding: "40px", minWidth: "300px" }}>
                            <DialogContentText sx={{ mb: "5px" }}>
                                لطفا شماره همراه به نام خود را وارد کنید
                            </DialogContentText>
                            <DialogContent>
                                <CustomTextField
                                    id='phone-number'
                                    autoFocus
                                    label="شماره همراه"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                                    fullWidth
                                    type='text'
                                />
                            </DialogContent>
                        </Box>
                        <DialogActions className='dialog-actions-dense' style={{ flexDirection: "row-reverse" }}>
                            <Button disabled={!phoneNumber || phoneNumber.length < 11} onClick={() => handleSetMobile()}>ارسال کد تایید</Button>
                            <Button onClick={handleClose}>انصراف</Button>
                        </DialogActions>
                    </>
                    :
                    <>
                        <Box sx={{ padding: "40px", minWidth: "300px" }}>
                            <DialogContentText sx={{ mb: "5px" }}>
                                کد ارسال شده را وارد نمایید
                            </DialogContentText>
                            <DialogContent>
                                <CustomOtpInput value={token} onChange={(e) => setToken(e)} hasError={false} />
                                {
                                    timer > 0 ?
                                        <Box>
                                            {timer} ثانیه
                                            تا ارسال مجدد
                                        </Box>
                                        :
                                        <Box>
                                            <Button onClick={() => handleSetMobile()} sx={{ color: "blue" }}>
                                                ارسال مجدد کد تایید
                                            </Button>
                                        </Box>
                                }
                            </DialogContent>
                        </Box>
                        <DialogActions className='dialog-actions-dense' style={{ flexDirection: "row-reverse" }}>
                            <Button disabled={!token || token.toString().length !== 4} onClick={() => handleLogin()}>تایید</Button>
                            <Button onClick={handleClose}>انصراف</Button>
                        </DialogActions>
                    </>
            }
        </Dialog>
    )
}
