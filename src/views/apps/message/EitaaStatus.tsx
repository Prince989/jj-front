/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Button, Typography } from '@mui/material';
import ProgressLinearIndeterminate from 'src/views/components/progress/ProgressLinearIndeterminate';
import { Box } from '@mui/system';
import CustomTextField from 'src/@core/components/mui/text-field';
import mAxios from 'src/configs/axios';

export default function EitaaStatus({
    setLoadingStatus,
    nextStep
}: {
    setLoadingStatus: Dispatch<boolean>
    nextStep: () => void
}) {

    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [twoFactor, setTwoFactor] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [codeShow, setCodeShow] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const [codeError, setCodeError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const sendPassword = () => {
        if (password.trim() == "")
            setPasswordError("رمز عبور نباید خالی باشد");

        mAxios.post("/send/eitaa/password", {
            password
        }).then(res => {
            setTwoFactor(false);
            setLoading(true);
        })
            .catch(err => {
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message, {
                        position: "bottom-left",
                    })
                setLoadingStatus(false);
            })
    }

    const sendCode = () => {
        if (code.trim() == "")
            setCodeError("کد تایید نباید خالی باشد");

        mAxios.post("/send/eitaa/code", {
            code
        }).then(res => {
            setLoading(true);
            setCodeShow(false);
        })
            .catch(err => {
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message, {
                        position: "bottom-left",
                    })
                setLoadingStatus(false);
            })
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        const source = new EventSource(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/get/eitaa/status?token=' + token);
        setEventSource(source);

        source.onmessage = function (event) {
            console.log('Message from server:', event.data);
            const msg = event.data as string;
            if (msg.includes("waiting for results")) {
                setLoading(true);
            }
            else if (msg.includes("کد تایید")) {
                setLoading(false);
                setCodeShow(true);
            }
            else if (msg.includes("2fa")) {
                setLoading(false);
                setTwoFactor(true);
            }
            else if (msg.includes("نامعتبر")) {
                setLoadingStatus(false);
                toast.error(msg, {
                    position: 'bottom-left'
                })
            }
            else if (msg.includes("با موفقیت")) {
                nextStep();
                console.log("this is paaa", msg);
                toast.success(msg, {
                    position: 'bottom-left',
                })
            }
            else if (msg.includes("سرور")) {
                setLoadingStatus(false);
                toast.error(msg, {
                    position: 'bottom-left'
                })
            }
        };

        source.onerror = function (event) {
            console.log('EventSource failed:', event);
            source.close();
            if (source.readyState === EventSource.CLOSED) {
                // If the connection was closed, you might want to retry after a delay
                console.log('Connection was closed, retrying...');

                // setLoadingStatus(false);
            }
        };

        return () => {
            source.close();
        }
    }, [])

    return (
        <>
            {
                !loading ?
                    <Box>
                        {
                            codeShow ?
                                <Box>
                                    <Typography variant='h3' >
                                        <b>
                                            ورود به حساب ایتا
                                        </b>
                                    </Typography>
                                    <Box sx={{ my: "10px" }}>
                                    </Box>
                                    <Typography>
                                        لطفا کد تاییدی که به حساب ایتا شما ارسال شده را وارد کنید
                                    </Typography>
                                    <Box sx={{ my: "10px" }}>
                                    </Box>
                                    <CustomTextField
                                        id='text'
                                        autoFocus
                                        label={"کد تایید"}
                                        value={code}
                                        helperText={codeError}
                                        error={codeError != ""}
                                        onChange={(e) => setCode(e.currentTarget.value)}
                                        fullWidth
                                        type='text'
                                    />
                                    <Button variant='contained' sx={{ my: "20px", mr: "auto" }} onClick={() => { sendCode() }}>ارسال کد تایید</Button>
                                </Box>
                                :
                                (
                                    twoFactor ?
                                        <Box>
                                            <Typography variant='h3' >
                                                <b>
                                                    ورود به حساب ایتا
                                                </b>
                                            </Typography>
                                            <Box sx={{ my: "10px" }}>
                                            </Box>
                                            <Typography>
                                                تایید دو مرحله ای حساب شما فعال است، لطفا رمز عبور حساب خود را وارد کنید
                                            </Typography>
                                            <Box sx={{ my: "10px" }}>
                                            </Box>
                                            <CustomTextField
                                                id='text'
                                                autoFocus
                                                label={"رمز عبور حساب کاربری"}
                                                helperText={passwordError}
                                                error={passwordError != ""}
                                                value={password}
                                                onChange={(e) => setPassword(e.currentTarget.value)}
                                                fullWidth
                                                type='password'
                                            />
                                            <Button variant='contained' sx={{ my: "20px", mr: "auto" }} onClick={() => { sendPassword() }}>ارسال رمز</Button>
                                        </Box>
                                        :
                                        <></>
                                )
                        }

                    </Box>
                    :
                    <>
                        <Typography sx={{ mb: 4 }}>
                            در حال بررسی وضعیت حساب ایتا شما
                        </Typography>
                        <ProgressLinearIndeterminate />
                    </>
            }
        </>
    )
}
