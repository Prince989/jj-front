import { Box } from '@mui/material'
import React, { useEffect } from 'react'

// ** Third Party Styles Import
import 'chart.js/auto'

export default function Dashboard() {

  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = () => {
    /*mAxios.get<APIResponse<ResultData>>("/get/results").then(res => {
      setData(res.data?.data);
    })
      .catch(err => {
        if (err.response?.data?.message)
          toast.error(err.response?.data?.message, {
            position: "bottom-left",
          })
      })*/
  }

  return (
    <Box>
      <Box sx={{
        my: "20px"
      }} />

    </Box>
  )
}
