/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Base64Image from './Base64Image';
import { Typography } from '@mui/material';
import ProgressLinearIndeterminate from 'src/views/components/progress/ProgressLinearIndeterminate';
import { Box } from '@mui/system';
import { Icon } from '@iconify/react';

export default function WhatsAppStatus({
    setLoadingStatus,
    nextStep
}: {
    setLoadingStatus: Dispatch<boolean>
    nextStep: () => void
}) {

    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [qrShow, setQrShow] = useState<boolean>(false);
    const [qrData, setQrData] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        const source = new EventSource(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/get/whatsapp/status?token=' + token);
        setEventSource(source);

        source.onmessage = function (event) {
            console.log('Message from server:', event.data);
            const msg = event.data as string;
            if (msg.indexOf("qr:") > -1) {
                setQrShow(true);
                setQrData(msg.replace("qr:", ""));
            }
            if (event.data == "logged in") {
                source.close();
                nextStep();
            }
        };

        source.onerror = function (event) {
            console.log('EventSource failed:', event);
            source.close();
            if (source.readyState === EventSource.CLOSED) {
                // If the connection was closed, you might want to retry after a delay
                console.log('Connection was closed, retrying...');
                setQrShow(false)
                setLoadingStatus(false);
                toast.error("زمان اسکن بارکد تمام شد، لطفا دوباره تلاش کنید", {
                    position: "bottom-left"
                })
            }
        };

        return () => {
            source.close();
        }
    }, [])

    return (
        <>
            {
                qrData ?
                    <Box sx={{ p: "20px" }}>
                        <Typography variant='h3' >
                            <b>
                                ورود به حساب واتساپ
                            </b>
                        </Typography>
                        <ul>
                            <Typography sx={{ fontSize: "18px", textAlign: "left" }}>
                                <li>
                                    به اپلیکیشن
                                    <b>
                                        &nbsp;
                                        Whatsapp
                                        &nbsp;
                                    </b>
                                    خود رفته
                                </li>
                            </Typography>
                            <Typography sx={{ fontSize: "18px", textAlign: "left" }}>
                                <li>
                                    بالا در قسمت
                                    <Icon icon={'tabler:dots-vertical'}></Icon>
                                    <b>
                                        &nbsp;
                                        دستگاه های پیوندشده
                                        &nbsp;
                                    </b>
                                    را انتخاب کنید
                                </li>
                            </Typography>
                            <Typography sx={{ fontSize: "18px", textAlign: "left" }}>
                                <li>
                                    دکمه&nbsp;
                                    <b>
                                        &nbsp;
                                        پیوند دادن دستگاه
                                        &nbsp;
                                    </b>
                                    &nbsp;را بزنید و بارکد زیر را اسکن کنید
                                </li>
                            </Typography>
                        </ul>
                        <Box sx={{ display: "flex", justifyContent: "center", my: "10px" }}>
                            <Base64Image base64Data={qrData} />
                        </Box>
                    </Box>
                    :
                    <>
                        <Typography sx={{ mb: 4 }}>
                            در حال بررسی وضعیت حساب واتساپ شما
                        </Typography>
                        <ProgressLinearIndeterminate />
                    </>
            }
        </>
    )
}
