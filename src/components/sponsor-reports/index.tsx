import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    CircularProgress,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material'
import { DownloadIcon, ChartIcon, ListIcon } from 'src/@core/components/IconV2'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useSponsorReports } from 'src/hooks/useSponsorReports'

const StatCard = ({ title, value, color = 'primary' }: { title: string; value: number; color?: string }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" component="div" color={color}>
                {value.toLocaleString('fa-IR')}
            </Typography>
        </CardContent>
    </Card>
)

const StatListItem = ({ title, value, color = 'primary' }: { title: string; value: number; color?: string }) => (
    <ListItem>
        <ListItemText
            primary={title}
            secondary={
                <Chip
                    label={value.toLocaleString('fa-IR')}
                    color="primary"
                    variant="outlined"
                    sx={{ color: color }}
                />
            }
        />
    </ListItem>
)

const SponsorReportsComponent = () => {
    const {
        statistics,
        loading,
        excelLoading,
        selectedTimeRange,
        fetchStatistics,
        downloadExcel,
        handleTimeRangeChange,
        timeRanges
    } = useSponsorReports()

    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')

    useEffect(() => {
        fetchStatistics(selectedTimeRange.hours)
    }, [fetchStatistics, selectedTimeRange.hours])

    const handleDownload = () => {
        downloadExcel(selectedTimeRange.hours)
    }

    const handleRefresh = () => {
        fetchStatistics(selectedTimeRange.hours)
    }

    const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newViewMode: 'cards' | 'list' | null) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode)
        }
    }

    const getStatValue = (stat: Record<string, any> | undefined) => {
        if (!stat) return 0

        // If it's an object with count property, return count, otherwise sum all values
        if (typeof stat === 'object' && stat.count !== undefined) {
            return stat.count
        }

        // If it's an object with multiple properties, sum them
        if (typeof stat === 'object') {

            return Object.values(stat).reduce((sum: number, val: any) => sum + (Number(val) || 0), 0)
        }

        return Number(stat) || 0
    }

    const getStatTitle = (key: string) => {
        switch (key) {
            case 'views': return 'بازدیدکنندگان'
            case 'otps': return 'تایید OTP'
            case 'logins': return 'ورود به سیستم'
            case 'signups': return 'ثبت نام'
            case 'orders': return 'سفارشات'
            default: return key
        }
    }

    const getStatColor = (key: string) => {
        switch (key) {
            case 'views': return 'info.main'
            case 'otps': return 'warning.main'
            case 'logins': return 'success.main'
            case 'signups': return 'secondary.main'
            case 'orders': return 'error.main'
            default: return 'primary'
        }
    }

    const statsData = [
        { key: 'views', title: getStatTitle('views'), value: getStatValue(statistics?.views), color: getStatColor('views') },
        { key: 'otps', title: getStatTitle('otps'), value: getStatValue(statistics?.otps), color: getStatColor('otps') },
        { key: 'logins', title: getStatTitle('logins'), value: getStatValue(statistics?.logins), color: getStatColor('logins') },
        { key: 'signups', title: getStatTitle('signups'), value: getStatValue(statistics?.signups), color: getStatColor('signups') },
        { key: 'orders', title: getStatTitle('orders'), value: getStatValue(statistics?.orders), color: getStatColor('orders') }
    ]

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    گزارشات اسپانسر
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    مشاهده آمار و دانلود گزارشات
                </Typography>
            </Box>

            {/* Time Range Selector and Controls */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>بازه زمانی</InputLabel>
                            <Select
                                value={selectedTimeRange.hours}
                                label="بازه زمانی"
                                onChange={(e) => {
                                    const timeRange = timeRanges.find(tr => tr.hours === e.target.value)
                                    if (timeRange) {
                                        handleTimeRangeChange(timeRange)
                                    }
                                }}
                            >
                                {timeRanges.map((timeRange) => (
                                    <MenuItem key={timeRange.hours} value={timeRange.hours}>
                                        {timeRange.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Button
                            variant="outlined"
                            startIcon={excelLoading ? <CircularProgress size={20} /> : <DownloadIcon />}
                            onClick={handleDownload}
                            disabled={excelLoading}
                            sx={{ minWidth: 200, minHeight: 54 }}
                        >
                            {excelLoading ? 'در حال دانلود...' : 'دانلود گزارش Excel'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6} md={4} my={3}>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewModeChange}
                        aria-label="view mode"
                        size="large"
                    >
                        <ToggleButton value="cards" aria-label="card view">
                            <ChartIcon />
                        </ToggleButton>
                        <ToggleButton value="list" aria-label="list view">
                            <ListIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid container justifyContent="flex-end" xs={12} sm={6} md={4} my={3} >
                    <Button
                        variant="outlined"
                        startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                        onClick={handleRefresh}
                        disabled={loading}
                        sx={{ minWidth: 200, minHeight: 54 }}
                    >
                        {loading ? 'در حال بروزرسانی...' : 'بروز رسانی آمار'}
                    </Button>
                </Grid>
            </Grid>

            {/* Statistics Display */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : viewMode === 'cards' ? (

                // Card View
                <Grid container spacing={3}>
                    {statsData.map((stat) => (
                        <Grid item xs={12} sm={6} md={4} key={stat.key}>
                            <StatCard
                                title={stat.title}
                                value={stat.value}
                                color={stat.color}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (

                // List View
                <Paper sx={{ mt: 2 }}>
                    <List>
                        {statsData.map((stat, index) => (
                            <React.Fragment key={stat.key}>
                                <StatListItem
                                    title={stat.title}
                                    value={stat.value}
                                    color={stat.color}
                                />
                                {index < statsData.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    )
}

export default SponsorReportsComponent 