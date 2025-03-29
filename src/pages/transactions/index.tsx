import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import mAxios from 'src/configs/axios'

interface CellType {
    row: TransactionType
}

interface TransactionType {
    id: number
    referenceId: string
    amount: number
    status: "completed" | "pending" | "failed"
}

interface APIResponse<T> {
    problem: {},
    message: string,
    data: T
}

const columns: GridColDef[] = [
    {
        flex: 0.15,
        minWidth: 100,
        field: 'referenceId',
        headerName: 'کد تراکنش',
        renderCell: ({ row }: CellType) => {
            const { referenceId } = row

            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 500,
                                textDecoration: 'none',
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' }
                            }}
                        >
                            {referenceId}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.15,
        field: 'amount',
        minWidth: 250,
        headerName: 'مبلغ',

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize', whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", maxWidth: "300px" }}>
                        {formatCurrency(row.amount)} تومان
                    </Typography>
                </Box>
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
                    label={(row.status === "completed" ? "موفق" : (row.status == "failed" ? "ناموفق" : "در انتظار"))}
                    color={row.status == "completed" ? "success" : (row.status == "failed" ? "error" : "warning")}
                    sx={{ textTransform: 'capitalize' }}
                />
            )
        }
    },
]

export default function Transactions() {

    const style = `
        .MuiDataGrid-footerContainer{
            display : none;
        }
      `

    const [data, setData] = useState<TransactionType[]>([]);

    const fetchData = () => {
        mAxios.get<APIResponse<TransactionType[]>>("/payment/list").then(res => {
            setData(res.data.data);
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>

            <style>
                {style}
            </style>
            <Grid container spacing={6.5}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='تراکنش های شما' />
                        <Divider sx={{ m: '0 !important' }} />
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
            </Grid>

        </>
    )
}

function formatCurrency(amount: number): string {
    if (amount > 10)
        amount /= 10;

    return amount.toLocaleString('fa-IR'); // 'fa-IR' برای نمایش اعداد به صورت فارسی
}
