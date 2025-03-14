// ** React Imports
import { Dispatch, useState } from 'react'

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

import { FormLabel } from '@mui/material'
import { Box } from '@mui/system'
import FileUploader from './FileUploader'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'

type IProblem = {
    [key: string]: string[]
}

const AddContactDialog = ({
    addMessageOpen,
    setAddMessageOpen,
    fetchData
}: {
    addMessageOpen: boolean
    setAddMessageOpen: Dispatch<boolean>
    fetchData: () => void
}) => {

    const [name, setName] = useState("");
    const [file, setFile] = useState<File[]>();
    const [problems, setProblems] = useState<IProblem>({})

    const handleClose = () => setAddMessageOpen(false)

    const uploadContacts = () => {
        setProblems({});
        const bodyFormData = new FormData();
        bodyFormData.append("title", name);
        if (file?.[0])
            bodyFormData.append("contact_file", file?.[0])
        else {
            toast.error("فایلی انتخاب نشده است، لطفا فایل اکسل مورد نظر خود را انتخاب کنید", {
                position: "bottom-left",
            })

            return;
        }

        mAxios.post("/add/contact", bodyFormData).then(res => {
            fetchData();
            setName("");
            setFile(undefined);
            handleClose();
            if (res.data?.message)
                toast.success(res.data?.message, {
                    position: "bottom-left",
                })
        })
            .catch(err => {
                setProblems(err.response?.data?.problem)
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message, {
                        position: "bottom-left",
                    })
            })
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <Dialog open={addMessageOpen} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>ایجاد لیست مخاطب جدید</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 3 }}>
                        در اینجا میتوانید مخاطبان خود را در قالب فایل اکسل آپلود کنید
                    </DialogContentText>
                    <Box sx={{ display: "flex", mt: "30px", mb: "70px", flexDirection: "column", gap: "10px" }}>
                        <FormLabel>
                            نام لیست مخاطبان
                        </FormLabel>
                        <CustomTextField
                            id='text'
                            autoFocus
                            placeholder='لیست مخاطب 1'
                            helperText={problems['title']}
                            error={problems['title'] && problems['title'].length > 0}
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            fullWidth
                            type='number'
                            multiline />
                    </Box>

                    <FileUploader files={file!} setFiles={setFile} />
                    <Box sx={{ display: "flex", mt: "30px", mb: "70px", flexDirection: "column", gap: "10px" }}>
                    </Box>
                </DialogContent>
                <DialogActions className='dialog-actions-dense' style={{ flexDirection: "row-reverse" }}>
                    <form noValidate autoComplete='off' onSubmit={e => { e.preventDefault(); uploadContacts(); }}>
                        <Button type='submit'>ذخیره</Button>
                    </form>
                    <Button onClick={handleClose}>انصراف</Button>
                </DialogActions>

            </Dialog>
        </LocalizationProvider>
    )
}

export default AddContactDialog
