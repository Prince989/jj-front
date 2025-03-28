// ** React Imports
import { Dispatch, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

interface FileProp {
    name: string
    type: string
    size: number
}

const FileUploader = ({ files, setFiles }: { files: File[], setFiles: Dispatch<File[]> }) => {

    // ** Hooks
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 2,
        maxSize: 2000000,
        accept: {
            'image/*': ['.csv', '.xlsx']
        },
        onDrop: (acceptedFiles: File[]) => {
            setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
        },
        onDropRejected: () => {
            toast.error('You can only upload 2 files & maximum size of 2 MB.', {
                duration: 2000
            })
        }
    })

    const renderFilePreview = (file: FileProp) => {
        if (file.type.startsWith('image')) {
            return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
        } else {
            return <Icon icon='tabler:file-description' />
        }
    }

    const handleRemoveFile = (file: FileProp) => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
        setFiles([...filtered])
    }

    const fileList = files ? files.map((file: FileProp) => (
        <ListItem key={file.name}>
            <div className='file-details'>
                <div className='file-preview'>{renderFilePreview(file)}</div>
                <div>
                    <Typography className='file-name'>{file.name}</Typography>
                    <Typography className='file-size' variant='body2'>
                        {Math.round(file.size / 100) / 10 > 1000
                            ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                            : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                    </Typography>
                </div>
            </div>
            <IconButton onClick={() => handleRemoveFile(file)}>
                <Icon icon='tabler:x' fontSize={20} />
            </IconButton>
        </ListItem>
    )) : <></>

    return (
        <Fragment>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            mb: 8.75,
                            width: 48,
                            height: 48,
                            display: 'flex',
                            borderRadius: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
                        }}
                    >
                        <Icon icon='tabler:upload' fontSize='1.75rem' />
                    </Box>
                    <Typography variant='h4' sx={{ mb: 2.5 }}>
                        فایل را در اینجا رها کنید
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>فرمت های قابل قبول *.csv, *.xlsx</Typography>
                    {/* <Typography sx={{ color: 'text.secondary' }}>Max 2 files and max size of 2 MB</Typography> */}
                </Box>
            </div>
            {files && files.length ? (
                <Fragment>
                    <List>{fileList}</List>
                </Fragment>
            ) : null}
        </Fragment>
    )
}

export default FileUploader
