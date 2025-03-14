/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react'

// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import Button from '@mui/material/Button'
import AddContactDialog from 'src/views/apps/contacts/AddContactDialog'
import mAxios from 'src/configs/axios'
import { ContactProvider, ContactContext } from 'src/context/ContactContext'
import { useContact } from 'src/hooks/useContact'
import { useRouter } from 'next/router'

interface CellType {
    row: {
        "id": number,
        "title": string,
        "excelAddress": string,
        "isPrivate": boolean
    }
}

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
                    ایجاد لیست مخاطب جدید
                </Button>
            </Box>
        </Box>
    )
}

const deleteContact = (id: string, callback: () => any) => {

    mAxios.delete("/delete/contact/" + id).then(res => {
        if (res.data?.message)
            toast.success(res.data?.message, {
                position: "bottom-left"
            })
        if (callback)
            callback();
    })
        .catch(err => {

            if (err.response?.data?.message) {
                toast.error(err.response?.data?.message, {
                    position: "bottom-left"
                })
            }
        })
}

const ActionCol = ({ row }: CellType) => {

    const { fetchData } = useContact();

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
                href={process.env.NEXT_PUBLIC_API_BASE_URL + "/" + row.excelAddress}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <Button
                    sx={{ '& svg': { mr: 2 }, textDecoration: "none", display: "flex", alignItems: "center", gap: "2px" }}
                >
                    <Icon icon='tabler:download' fontSize={20} />
                    دانلود
                </Button>
            </Link>
            {
                row.isPrivate &&
                <Button onClick={() => deleteContact(row.id.toString(), fetchData)} sx={{ '& svg': { mr: 2 }, display: "flex", alignItems: "center", gap: "2px" }}>
                    <Icon icon='tabler:trash' fontSize={20} />
                    حذف
                </Button>
            }
        </Box>
    )
}

const columns: GridColDef[] = [
    {
        flex: 0.15,
        minWidth: 100,
        field: 'title',
        headerName: 'نام لیست مخاطبان',
        renderCell: ({ row }: CellType) => {
            const { title } = row

            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                                textDecoration: 'none',
                                color: 'text.secondary',
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 100,
        sortable: false,
        field: 'actions',
        headerName: 'عملیات',
        renderCell: ActionCol
    }
]

const NoRows = () => {

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            دیتایی وجود ندارد
        </Box>
    )
}

function Contacts({ addContact }: { addContact: boolean }) {
    const [value, setValue] = useState<string>('')
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

    const { data, fetchData } = useContact();

    const style = `
    .MuiDataGrid-footerContainer{
      display : none;
    }
  `

    const handleFilter = useCallback((val: string) => {
        // setValue(val)
    }, [])


    useEffect(() => {
        setAddUserOpen(addContact);
    }, [addContact])

    useEffect(() => {
        console.log(data, "this is data")
    }, [data])

    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

    return (
        <>
            <style>
                {style}
            </style>
            <Grid container spacing={6.5}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='مخاطبین شما' />
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
                            slots={
                                {
                                    noRowsOverlay: NoRows
                                }
                            }
                            sortingMode='server'
                            rows={data}
                            columns={columns}
                            disableRowSelectionOnClick
                        />
                    </Card>
                </Grid>
                <AddContactDialog fetchData={fetchData} addMessageOpen={addUserOpen} setAddMessageOpen={setAddUserOpen} />
            </Grid>
        </>
    )
}

export default function ContactsPage() {
    const { pathname, route, query } = useRouter();

    return (
        <ContactProvider>
            <Contacts addContact={(query?.addContact == "true") ?? false} />
        </ContactProvider>
    )
}
