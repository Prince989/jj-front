import { Box } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import CardMessageStatistics from 'src/views/ui/cards/statistics/CardMessageStatistics'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Import
import 'chart.js/auto'
import { useSettings } from 'src/@core/hooks/useSettings'
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'
import ReportChart from 'src/views/apps/message/Chart'
import { format } from 'date-fns-jalali';

interface APIResponse<T> {
  problem: {},
  message: string,
  data: T
}

interface ResultData {
  count: {
    all: number,
    unsend: number,
    failed: number,
    sent: number
  }
  result: {
    [key: string]: ChartData
  }
}

interface ChartData {
  all: number,
  unsends: number,
  failed: number,
  sent: number
}

export default function Dashboard() {
  const { settings } = useSettings()

  const [data, setData] = useState<ResultData>();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    mAxios.get<APIResponse<ResultData>>("/get/results").then(res => {
      setData(res.data?.data);
    })
      .catch(err => {
        if (err.response?.data?.message)
          toast.error(err.response?.data?.message, {
            position: "bottom-left",
          })
      })
  }

  const chartData = useMemo(() => {
    const temp = [];
    if (data?.result)
      for (const [key, value] of Object.entries(data?.result)) {
        temp.push({
          date: convertToJalali(key),
          ...value
        })
      }

    return temp
  }, [data?.result])

  return (
    <Box>
      {
        data ?
          <CardMessageStatistics data={data!} />
          : <></>
      }
      <Box sx={{
        my: "20px"
      }} />
      <RechartsWrapper>
        <DatePickerWrapper>
          <ReportChart direction={settings.direction} chartData={chartData} />
        </DatePickerWrapper>
      </RechartsWrapper>
    </Box>
  )
}

function convertToJalali(dateString: string): string {
  const date = new Date(dateString);

  return format(date, 'yyyy/MM/dd');
}
