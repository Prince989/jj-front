/* eslint-disable @typescript-eslint/no-unused-vars */

// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

interface Props {
    direction: 'ltr' | 'rtl'
    chartData: ChartData[]
}

interface PickerProps {
    start: Date | number
    end: Date | number
}

interface ChartData {
    date: string,
    all: number,
    unsends: number,
    failed: number,
    sent: number
}

const CustomTooltip = (data: TooltipProps<any, any>) => {
    const { active, payload } = data

    if (active && payload) {
        return (
            <div className='recharts-custom-tooltip'>
                <Typography>{data.label}</Typography>
                <Divider />
                {data &&
                    data.payload &&
                    data.payload.map((i: any) => {
                        return (
                            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                                <Icon icon='mdi:circle' fontSize='0.6rem' />
                                <Typography variant='body2'>{`${i.dataKey == "sent" ? "پیام های موفق" : "مخاطبان غیرفعال در پلتفرم ها"} : ${i.payload[i.dataKey]}`}</Typography>
                            </Box>
                        )
                    })}
            </div>
        )
    }

    return null
}

const ReportChart = ({ direction, chartData }: Props) => {
    // ** States
    /*
    const [endDate, setEndDate] = useState<DateType>(null)
    const [startDate, setStartDate] = useState<DateType>(null)

    const CustomInput = forwardRef((props: PickerProps, ref) => {
        const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
        const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

        const value = `${startDate}${endDate !== null ? endDate : ''}`

        return (
            <CustomTextField
                {...props}
                value={value}
                inputRef={ref}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Icon fontSize='1.25rem' icon='tabler:calendar-event' />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Icon fontSize='1.25rem' icon='tabler:chevron-down' />
                        </InputAdornment>
                    )
                }}
            />
        )
    })

    const handleOnChange = (dates: any) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }
*/
    return (
        <Card>
            <CardHeader
                title='نمودار پیام ها'
                sx={{
                    flexDirection: ['column', 'row'],
                    alignItems: ['flex-start', 'center'],
                    '& .MuiCardHeader-action': { mb: 0 },
                    '& .MuiCardHeader-content': { mb: [2, 0] }
                }}

            // action={
            //     <DatePicker
            //         selectsRange
            //         id='recharts-bar'
            //         endDate={endDate}
            //         selected={startDate}
            //         startDate={startDate}
            //         onChange={handleOnChange}
            //         placeholderText='Click to select a date'
            //         customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
            //     />
            // }
            />
            <CardContent>
                <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#02ABA8' } }}>
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>پیام های موفق</Typography>
                    </Box>
                    <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#ea5455aa' } }}>
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>مخاطبان غیرفعال در پلتفرم ها</Typography>
                    </Box>
                </Box>
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer>
                        <BarChart height={350} data={chartData} barSize={15} style={{ direction }} margin={{ left: -20 }}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='date' reversed={direction === 'rtl'} />
                            <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
                            <Tooltip content={CustomTooltip} />
                            {/* <Bar dataKey='Apple' stackId='a' fill='#826af9' />
                            <Bar dataKey='Samsung' stackId='a' fill='#9f87ff' /> */}
                            <Bar dataKey='sent' stackId='a' fill='#02ABA8' />
                            <Bar dataKey='failed' stackId='a' fill='#ea5455aa' radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ReportChart
