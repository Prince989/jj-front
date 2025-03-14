import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Box } from '@mui/system'
import React, { Dispatch, useState } from 'react'
import toast from 'react-hot-toast'
import CustomTextField from 'src/@core/components/mui/text-field'
import mAxios from 'src/configs/axios'

type IProblem = {
    [key: string]: string[]
}

export default function AIDialog({
    aiDialogOpen,
    setAIDialogOpen,
    setInputStr
}: {
    aiDialogOpen: boolean
    setAIDialogOpen: Dispatch<boolean>
    setInputStr: Dispatch<string>
}) {

    const [mode, setMode] = useState<"improve" | "custom">("custom")
    const [text, setText] = useState<string>("");
    const [business, setBusiness] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [additionalInfo, setAdditionalInfo] = useState<string>("");
    const [problem, setProblem] = useState<IProblem>();
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

    const sendToAI = () => {
        const data = (mode == "improve" ? {
            text
        } : {
            business,
            contact,
            additionalInfo,
        });

        setLoadingStatus(true);

        mAxios.post("/ai/suggest", {
            improve: mode == "improve",
            ...data
        }).then(res => {
            const content = res.data?.data?.content;
            setInputStr(content);
            setLoadingStatus(false);
            handleClose();
        })
            .catch(err => {
                setProblem(err.response?.data?.problem)
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message, {
                        position: "bottom-left",
                    })
                setLoadingStatus(false);
            })
    }

    const handleClose = () => {
        setAIDialogOpen(false);
    }

    return (
        <Dialog open={aiDialogOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>
            {
                loadingStatus ?
                    <DialogContent sx={{ padding: "30px", display: 'flex', justifyContent: "center" }}>
                        <CircularProgress color='primary' />
                    </DialogContent>
                    :
                    <>
                        <DialogTitle id='form-dialog-title-ai'>پیام با هوش مصنوعی</DialogTitle>
                        <DialogContent sx={{ padding: "30px" }}>
                            {/* @ts-ignore */}
                            <RadioGroup row aria-label='colored' name='colored' defaultValue={mode} onChange={(e) => setMode(e.currentTarget.value)} value={mode}>
                                <FormControlLabel value='custom' control={<Radio />} label='اطلاعات میدم،باهاش پیام بساز' />
                                <FormControlLabel value='improve' control={<Radio />} label='پیام رو دارم، میخوام بهترش کنم' />
                            </RadioGroup>
                            {
                                mode == "custom" ?
                                    <form onSubmit={(e) => { e.preventDefault(); }}>

                                        <Box sx={{ my: "10px" }}>
                                            <FormLabel>
                                                کسب و کار/ موضوع
                                            </FormLabel>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                                <CustomTextField
                                                    id='business'
                                                    error={problem?.["business"] && problem?.["business"]?.length > 0}
                                                    helperText={problem?.["business"]?.[0]}
                                                    autoFocus
                                                    placeholder={'خرید و فروش فلان چیز'}
                                                    value={business}
                                                    onChange={(e) => setBusiness(e.currentTarget.value)}
                                                    fullWidth
                                                    type='text'
                                                />
                                            </Box>
                                        </Box>

                                        <Box sx={{ my: "10px" }}>
                                            <FormLabel>
                                                راه های ارتباطی
                                            </FormLabel>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                                <CustomTextField
                                                    id='contact'
                                                    error={problem?.["contact"] && problem?.["contact"]?.length > 0}
                                                    helperText={problem?.["contact"]?.[0]}
                                                    placeholder='مثل تلفن ، آدرس وب سایت ، ایمیل و ...'
                                                    value={contact}
                                                    onChange={(e) => setContact(e.currentTarget.value)}
                                                    fullWidth
                                                    multiline
                                                    type='text'
                                                />
                                            </Box>
                                        </Box>

                                        <Box sx={{ my: "10px" }}>
                                            <FormLabel>
                                                توضیحات اضافی
                                            </FormLabel>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                                <CustomTextField
                                                    id='additionalInfo'
                                                    error={problem?.["additionalInfo"] && problem?.["additionalInfo"]?.length > 0}
                                                    helperText={problem?.["additionalInfo"]?.[0]}
                                                    placeholder='مثلا ما برای محصولاتمون 10 درصد تخفیف در نظر گرفتیم و ...'
                                                    value={additionalInfo}
                                                    onChange={(e) => setAdditionalInfo(e.currentTarget.value)}
                                                    fullWidth
                                                    type='text'
                                                />
                                            </Box>
                                        </Box>
                                    </form>
                                    :
                                    <Box sx={{ my: "10px" }}>
                                        <FormLabel>
                                            پیام
                                        </FormLabel>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <CustomTextField
                                                id='text'
                                                error={problem?.["text"] && problem?.["text"]?.length > 0}
                                                helperText={problem?.["text"]?.[0]}
                                                autoFocus
                                                value={text}
                                                onChange={(e) => setText(e.currentTarget.value)}
                                                fullWidth
                                                type='text'
                                                multiline />
                                        </Box>
                                    </Box>
                            }

                            <DialogActions className='dialog-actions-dense' style={{ flexDirection: "row-reverse" }}>
                                {/* <Button onClick={() => addQueue()}>ذخیره</Button> */}
                                <Button onClick={sendToAI}>بساز</Button>
                                <Button onClick={handleClose}>بیخیال</Button>
                            </DialogActions>
                        </DialogContent>
                    </>
            }

        </Dialog>
    )
}
