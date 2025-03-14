/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { Dispatch, useEffect, useRef, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalaliV3';

import Picker from 'emoji-picker-react';
import { Checkbox, FormControlLabel, FormHelperText, FormLabel, IconButton, MenuItem, Select, Typography } from '@mui/material'
import Chip from '@mui/material/Chip';
import { Icon } from '@iconify/react'
import { Box } from '@mui/system'
import ProgressLinearIndeterminate from 'src/views/components/progress/ProgressLinearIndeterminate'
import { useContact } from 'src/hooks/useContact'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { MessageDataType } from 'src/context/MessageContext'
import Link from 'next/link'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'
import Base64Image from './Base64Image'
import { useMessages } from 'src/hooks/useMessages'
import Image from 'next/image'
import useStatus from 'src/hooks/useStatus'
import WhatsAppStatus from './WhatsAppStatus'
import TelegramStatus from './TelegramStatus'
import EitaaStatus from './EitaaStatus'
import AIDialog from './AIDialog'

type IProblem = {
  [key: string]: string[]
}

type IApp = {
  "id": number,
  "name": string,
  "faText": string,
  "imageAddress": string,
  "isActive": false,
}

const AddMessageDialog = ({
  addMessageOpen,
  setAddMessageOpen }: {
    addMessageOpen: boolean
    setAddMessageOpen: Dispatch<boolean>
  }) => {

  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [inputStr, setInputStr] = useState("");
  const [interval, setInterval] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [rightNow, setRightNow] = useState<boolean>(true);
  const [selectedContacts, setSelectedContacts] = useState<any>();
  const [startTime, setStartTime] = useState<string>(formatTime(new Date().getHours(), new Date().getMinutes()));
  const [endTime, setEndTime] = useState<string>(formatTime(new Date(new Date().setHours(new Date().getHours() + 1)).getHours(), new Date().getMinutes()));
  const [startDate, setStartDate] = useState<string>(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString());
  const [problem, setProblem] = useState<IProblem>();
  const [apps, setApps] = useState<IApp[]>([]);
  const [aiDialogOpen, setAIDialogOpen] = useState<boolean>(false);
  const [selectedApps, setSelectedApps] = useState<number[]>([]);
  const inputFile = useRef(null)
  const [file, setFile] = useState<File>();
  const { fetchData } = useMessages()

  console.log(selectedContacts)

  const done = () => {
    const bodyFormData = new FormData();

    bodyFormData.append("text", inputStr)

    // @ts-ignore
    bodyFormData.append("listId", selectedContacts?.id.toString())
    bodyFormData.append("startDate", rightNow ? new Date(new Date().setHours(14)).toISOString() : startDate.split('T')[0])
    bodyFormData.append("startTime", startTime)
    bodyFormData.append("endTime", endTime)

    for (let i = 0; i < selectedApps.length; i++) {
      bodyFormData.append(`apps[${i}]`, selectedApps[i].toString())
    }

    if (file)
      bodyFormData.append("attatch_file", file)

    const int = Number.isNaN(parseInt(interval)) ? "0" : interval;

    bodyFormData.append("interval", int)

    mAxios.post("/add/queue", bodyFormData).then(res => {
      toast.success(res.data?.message, {
        position: "bottom-left"
      });
      fetchData();
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

  const {
    getStatus,
    currentApp,
    nextStep,
    reset
  } = useStatus({
    apps: selectedApps,
    done
  });

  const { data: contacts } = useContact();

  const style = `
    .MuiIconButton-edgeEnd{
      scale: -1; 
    }
    .MuiIconButton-edgeStart{
      scale : -1
    }
    .MuiFormHelperText-root{
      color: #EA5455 !important;
    }
    .MuiDialog-root{
      z-index : 1200
    }
  `
  const handleClose = () => {
    setAddMessageOpen(false);
    reset();
    setLoadingStatus(false);
  };

  const onEmojiClick = (emojiData: any) => {
    setInputStr((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  const validate = () => {
    setProblem(undefined);
    console.log(selectedContacts)
    if (!selectedContacts) {
      setProblem({
        "listId": [
          "باید لیست مخاطبین انتخاب شود"
        ]
      })

      return -1;
    }

    if (selectedApps.length < 1) {
      setProblem({
        "apps": [
          "پلتفرم انتخاب نشده است"
        ]
      })

      return -1;
    }

    if (inputStr.trim().length == 0) {
      setProblem({
        "text": [
          "متن نباید خالی باشد"
        ]
      })

      return -1;
    }

    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);

    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);

    const compareResult = compareTimes(startHour, startMinute, endHour, endMinute);

    if (compareResult < 0) {
      setProblem({
        "endTime": [
          "زمان پایان نباید قبل از زمان شروع باشد"
        ]
      })

      return -1;
    }

    if (rightNow) {
      const nowHour = new Date().getHours();
      const nowMinutes = new Date().getMinutes();

      const compareResult = compareTimes(nowHour, nowMinutes, endHour, endMinute)
      if (compareResult < 0) {
        setProblem({
          "startTime": [
            "زمان شروع انتخاب شده در امروز گذشته است، میتوانید با تغییر تاریخ این برنامه را از فردا شروع کرده یا بازه زمانی را تغییر دهید"
          ]
        })

        return -1;
      }

    }

    return 1;
  }

  useEffect(() => {
    console.log(startDate, "no problem");
  }, [startDate])

  const addQueue = () => {
    if (validate() < 0) {

      return;
    }
    setLoadingStatus(true);

    getStatus();
  }

  useEffect(() => {
    getApps();
  }, [])

  useEffect(() => {
    if (contacts?.[0])
      setSelectedContacts(contacts[0].id)
  }, [contacts])

  useEffect(() => {
    setSelectedApps(apps.map(a => a.id))
  }, [apps])

  useEffect(() => {
    console.log(currentApp, "this is p gharar")
  }, [currentApp])

  const getApps = () => {
    mAxios.get("/get/user/apps").then(res => {
      setApps(res.data.data);
    })
  }

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    if (inputFile?.current)

      // @ts-ignore
      inputFile.current?.click();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <Dialog open={addMessageOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <style>
          {style}
        </style>
        {
          loadingStatus ?
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
            :
            <>
              <DialogTitle id='form-dialog-title'>ایجاد پیام انبوه</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ mb: 3 }}>
                  در اینجا میتوانید پیام مد نظر خود را وارد کنید و ارسال آن را برنامه ریزی کنید
                </DialogContentText>
                <FormLabel sx={{ mt: "5px" }}>
                  لیست مخاطبان
                </FormLabel>
                {/* @ts-ignore */}
                <Select error={problem?.["listId"] && problem?.["listId"]?.length > 0} size='small' value={selectedContacts?.id} onChange={(e) => setSelectedContacts(contacts.find(c => c.id == e.target.value))} defaultValue={contacts?.[0]} fullWidth style={{ width: "91%" }}>
                  <Link href="/contacts/?addContact=true" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem>
                      <Icon icon={"tabler:plus"} />
                      ایجاد لیست مخاطب جدید
                    </MenuItem>
                  </Link>
                  {
                    contacts.map(c => (
                      <MenuItem key={c.id} value={c.id} sx={{ "& .MuiMenuItem-root": { backgroundColor: "white !important" } }}>
                        {c.title}
                      </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>
                  {problem?.["listId"]?.[0]}
                </FormHelperText>
                <Box sx={{ my: "10px" }}>
                  <Button variant='contained' color='primary' onClick={() => setAIDialogOpen(true)}>
                    از هوش مصنوعی برای ساخت پیام استفاده کن
                    <Icon icon={'tabler:robot'} fontSize={25}>
                    </Icon>
                  </Button>
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
                        value={inputStr}
                        onChange={(e) => setInputStr(e.currentTarget.value)}
                        fullWidth
                        type='text'
                        multiline />
                      <IconButton onClick={() => { setShowPicker(true) }}>
                        <Icon icon="tabler:mood-happy" />
                      </IconButton>
                      <IconButton onClick={() => { onButtonClick() }}>
                        <Icon icon="tabler:photo" />
                      </IconButton>
                    </Box>
                  </Box>
                  {showPicker && (
                    <Picker style={{ maxWidth: "600px", position: "fixed", zIndex: "100", bottom: "10%", right: "50%", transform: "translate(50%,0)" }} onEmojiClick={onEmojiClick} />
                  )}
                </Box>
                <FormLabel sx={{ mt: "20px" }}>
                  پلتفرم ها
                </FormLabel>
                <Box sx={{ mb: "10px" }}>
                  {/* @ts-ignore */}
                  <Select multiple size='small' fullWidth sx={{ width: "91%" }}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
                        {selected.map((value) => {

                          // @ts-ignore
                          const selected = apps.find(a => a?.id == value)

                          return (

                            // @ts-ignore
                            <Box key={value} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              {/* @ts-ignore */}
                              <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + selected?.imageAddress} unoptimized width={30} height={30} alt={selected?.name} />
                              <Typography>
                                {selected?.faText}
                              </Typography>
                            </Box>
                          )
                        }
                        )}
                      </Box>

                      // @ts-ignore
                    )} value={selectedApps} onChange={(e) => { console.log(e.target.value); setSelectedApps(e.target.value) }}>
                    {
                      apps.map(a => (
                        <MenuItem key={a?.id} value={a.id}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + a?.imageAddress} unoptimized width={30} height={30} alt={a?.name} />
                            <Typography>
                              {a?.faText}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))
                    }
                  </Select>
                  <FormHelperText>
                    {problem?.["apps"]?.[0]}
                  </FormHelperText>
                </Box>
                <Box sx={{ display: "flex", mb: "10px", flexDirection: "column", gap: "10px" }}>
                  <FormControlLabel control={<Checkbox checked={rightNow} onChange={(e) => setRightNow(e.currentTarget.checked)} />} label="همین امروز شروع شود" />
                  <FormLabel disabled={rightNow}>
                    تاریخ شروع ارسال
                  </FormLabel>
                  <DatePicker onChange={(e) => { if (e) setStartDate(new Date(e?.setHours(14)).toISOString()) }} disabled={rightNow} defaultValue={new Date(new Date().setDate(new Date().getDate() + 1))} minDate={new Date(new Date().setDate(new Date().getDate() - 1))} name="startDate" sx={{ width: "91%" }} disablePast />
                </Box>
                <Box sx={{ display: "flex", mb: "10px", flexDirection: "column", gap: "10px" }}>
                  <FormLabel>
                    زمان شروع ارسال
                  </FormLabel>
                  {/* @ts-ignore */}
                  <TimePicker onError={(e) => { if (e != null && e == "disablePast") setProblem({ "startTime": ["زمان انتخاب شده گذشته است"] }) }} onChange={(e) => { setStartTime(formatTime(e?.getHours(), e?.getMinutes())); setProblem({}) }} disablePast={rightNow} ampm={false} sx={{ width: "91%", direction: "ltr" }} defaultValue={new Date(new Date().setMinutes(new Date().getMinutes() + 30))} />
                  <FormHelperText>
                    {problem?.["startTime"]?.[0]}
                  </FormHelperText>
                </Box>
                <Box sx={{ display: "flex", mb: "10px", flexDirection: "column", gap: "10px" }}>
                  <FormLabel>
                    زمان پایان ارسال
                  </FormLabel>
                  {/* @ts-ignore */}
                  <TimePicker onChange={(e) => { setEndTime(formatTime(e?.getHours(), e?.getMinutes())) }} ampm={false} sx={{ width: "91%", direction: "ltr" }} defaultValue={new Date(new Date().setHours(new Date().getHours() + 2))} />
                  <FormHelperText>
                    {problem?.["endTime"]?.[0]}
                  </FormHelperText>
                </Box>
                <FormLabel>
                  وقفه بین ارسال پیام
                </FormLabel>
                <CustomTextField id='text' autoFocus placeholder='بر حسب ثانیه' value={interval} onChange={(e) => setInterval(e.currentTarget.value)} sx={{ width: "91%" }} fullWidth type='number' multiline />
                <Typography sx={{ fontSize: "13px", my: "10px", maxWidth: "500px", width: "91%" }}>
                  به دلایل امنیتی و بسته نشدن حساب شما توسط پیام رسان مربوطه، در حالت عادی وقفه بین پیام ها چیزی در حدود یک دقیقه الی یک دقیقه و نیم است  و زمانی که شما برای وقفه وارد میکنید، مازاد بر آن است؛ در صورتی که شما عددی وارد نکنید این زمان صفر ثانیه در نظر گرفته میشود
                </Typography>
                <input type='file' id='file' onChange={handleChange} ref={inputFile} accept="image/*" style={{ display: 'none' }} />
              </DialogContent>
              <DialogActions className='dialog-actions-dense' style={{ flexDirection: "row-reverse" }}>
                <Button onClick={() => addQueue()}>ذخیره</Button>
                <Button onClick={handleClose}>انصراف</Button>
              </DialogActions>
              <AIDialog aiDialogOpen={aiDialogOpen} setAIDialogOpen={setAIDialogOpen} setInputStr={setInputStr} />
            </>
        }
      </Dialog>
    </LocalizationProvider >
  )
}

export default AddMessageDialog


function compareTimes(startHour: number, startMinute: number, endHour: number, endMinute: number) {
  if (startHour > endHour) {
    return -1;
  }

  if (startHour == endHour) {
    if (startMinute >= endMinute)
      return -1;
  }

  return 1;
}

function formatTime(hour: number, minutes: number) {

  const h = hour < 10 ? "0" + hour : hour
  const m = minutes < 10 ? "0" + minutes : minutes;

  return `${h}:${m}`
}