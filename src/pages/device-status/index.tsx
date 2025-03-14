/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, DialogContent } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import mAxios from 'src/configs/axios';
import useStatus from 'src/hooks/useStatus';
import EitaaStatus from 'src/views/apps/message/EitaaStatus';
import TelegramStatus from 'src/views/apps/message/TelegramStatus';
import WhatsAppStatus from 'src/views/apps/message/WhatsAppStatus';

interface App {
    appId: number
    loggedIn: boolean
}

export default function DeviceStatus() {

    const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
    const [failedApps, setFailedApps] = useState<number[]>([]);

    useEffect(() => {
        mAxios("/get/app/status").then(res => {
            const apps = res.data.data as App[];
            const notLoggedInApps = apps.filter(a => a.loggedIn == false);
            console.log(notLoggedInApps, "exciting")
            if (notLoggedInApps.length == 0) {
                done();

                return;
            }

            setFailedApps(notLoggedInApps.map(n => n.appId))
            reset();
            getStatus();
        })
            .catch(err => {
                done();
            })
    }, [])

    useEffect(() => {
        if (failedApps.length > 0) {
            reset();
            getStatus();
        }
    }, [failedApps])

    const done = () => {
        window.location.href = "/dashboard";
    }

    const {
        getStatus,
        currentApp,
        nextStep,
        reset
    } = useStatus({
        apps: failedApps,
        done
    });

    return (
        <Box>
            <Dialog open={true} onClose={() => done()} aria-labelledby='form-dialog-title'>
                {
                    (
                        currentApp == 1 ?
                            <DialogContent>
                                <WhatsAppStatus setLoadingStatus={setLoadingStatus} nextStep={nextStep} />
                            </DialogContent>
                            :
                            (
                                currentApp == 2 ?
                                    <DialogContent>
                                        <EitaaStatus setLoadingStatus={setLoadingStatus} nextStep={nextStep} />
                                    </DialogContent>
                                    :
                                    (
                                        currentApp == 3 ?
                                            <DialogContent>
                                                <TelegramStatus setLoadingStatus={setLoadingStatus} nextStep={nextStep} />
                                            </DialogContent>
                                            :
                                            <></>
                                    )
                            )
                    )
                }
            </Dialog>
        </Box>
    )
}