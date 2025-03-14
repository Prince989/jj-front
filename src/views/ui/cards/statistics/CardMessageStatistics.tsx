// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface DataType {
  key: string
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

export interface ReportDataType {
  count: {
    all: number,
    sent: number,
    unsend: number,
    failed: number
  }
}

const data: DataType[] = [
  {
    key: "all",
    stats: '$9745',
    color: 'info',
    title: 'کل پیام ها',
    icon: 'tabler:sum'
  },
  {
    key: "sent",
    color: 'success',
    stats: '1.423k',
    title: 'پیام های ارسال شده',
    icon: 'tabler:rosette-discount-check'
  },
  {
    key: "unsend",
    color: 'info',
    stats: '8.549k',
    title: 'پیام های باقی مانده',
    icon: 'tabler:chart-pie-2'
  },
  {
    key: "failed",
    stats: '230k',
    title: 'مخاطبان غیرفعال در پلتفرم ها',
    color: 'error',
    icon: 'tabler:exclamation-circle'
  },
]

const renderStats = (reportData: ReportDataType) => {
  return data.map((sale: DataType, index: number) => (
    <Grid item xs={6} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} color={sale.color}>
          {/* @ts-ignore */}
          <Typography variant='h3'>{reportData.count[sale.key]}</Typography>
          <Typography variant='body1'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const CardMessageStatistics = ({ data }: { data: ReportDataType }) => {
  return (
    <Card>
      <CardHeader
        title='آمار'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center', } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        <Grid container spacing={6}>
          {renderStats(data)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardMessageStatistics
