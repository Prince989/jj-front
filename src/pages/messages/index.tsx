import React from 'react'

// ** React Imports
import { useState, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

interface CellType {
  row: MessageDataType
}

import Button from '@mui/material/Button'
import AddMessageDialog from 'src/views/apps/message/AddMessageDialog'
import { ContactProvider } from 'src/context/ContactContext'
import { MessageDataType, MessageProvider } from 'src/context/MessageContext'
import { useMessages } from 'src/hooks/useMessages'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'

type QueueStatus = "شروع نشده" | "در حال ارسال" | "انجام شده" | "لغو شده"

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toggle } = props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          ایجاد پیام جدید
        </Button>
      </Box>
    </Box>
  )
}


const RowOptions = ({ id, status }: { id: number | string, status: string }) => {

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)
  const { fetchData } = useMessages();

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const cancel = () => {
    mAxios.put("/cancel/queue/" + id.toString())
      .then(res => {
        toast.success(res.data?.message, {
          position: "bottom-left",
        })
        fetchData();
      })
      .catch(err => {
        if (err.response?.data?.message)
          toast.error(err.response?.data?.message, {
            position: "bottom-left",
          })
      })
  }

  const handleDelete = () => {
    cancel();
    handleRowOptionsClose()
  }

  return (
    status != "لغو شده" ?
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:trash' fontSize={20} />
            لغو
          </MenuItem>
        </Menu>
      </>
      : <></>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.15,
    minWidth: 100,
    field: 'listName',
    headerName: 'نام لیست مخاطبان',
    renderCell: ({ row }: CellType) => {
      const { phone_list } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {phone_list.title}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'text',
    minWidth: 250,
    headerName: 'متن پیام',

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize', whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", maxWidth: "300px" }}>
            {row.text}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.10,
    minWidth: 100,
    field: 'app',
    headerName: 'پلتفرم',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.app?.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.10,
    minWidth: 100,
    field: 'startTime',
    headerName: 'زمان شروع',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {new Date(row.start_time).toLocaleTimeString("IR", {
            hourCycle: "h24",
          })}
        </Typography>
      )
    }
  },
  {
    flex: 0.10,
    minWidth: 100,
    field: 'endTime',
    headerName: 'زمان پایان',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {new Date(row.end_time).toLocaleTimeString("IR", {
            hourCycle: "h24",
          })}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'وضعیت',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status}

          // @ts-ignore
          color={getStatusColor(row.status)}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'عملیات',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} status={row.status} />
  }
]

export default function MessagesPage() {

  return (
    <MessageProvider>
      <Messages />
    </MessageProvider>
  )
}

function Messages() {
  // ** State
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const { data /*, fetchData */ } = useMessages();

  const style = `
    .MuiDataGrid-footerContainer{
      display : none;
    }
  `

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <ContactProvider>
      <style>
        {style}
      </style>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='پیام های شما' />
            <Divider sx={{ m: '0 !important' }} />
            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
            <DataGrid
              autoHeight
              rowHeight={62}
              disableColumnMenu
              disableColumnSelector
              disableColumnFilter
              disableDensitySelector
              disableVirtualization
              sortingMode='server'
              rows={data}
              columns={columns}
              disableRowSelectionOnClick
            />
          </Card>
        </Grid>
        <AddMessageDialog addMessageOpen={addUserOpen} setAddMessageOpen={setAddUserOpen} />
      </Grid>
    </ContactProvider>
  )
}


function getStatusColor(status: QueueStatus) {

  switch (status) {
    case "انجام شده":
      return "success"
    case "در حال ارسال":
      return "info"
    case "شروع نشده":
      return "warning"
    case "لغو شده":
      return "error"
    default:
      return "secondary"
  }

}