import { useState, useCallback } from 'react'
import { getSponsorStatistics, getSponsorExcel, SponsorStatistics } from 'src/services/sponsor'
import toast from 'react-hot-toast'

export interface TimeRange {
    label: string
    hours: number
}

export const TIME_RANGES: TimeRange[] = [
    { label: 'روز گذشته', hours: 24 },
    { label: '۲ روز گذشته', hours: 48 },
    { label: 'هفته گذشته', hours: 168 },
    { label: 'یک ماه گذشته', hours: 720 }
]

export const useSponsorReports = () => {
    const [statistics, setStatistics] = useState<SponsorStatistics | null>(null)
    const [loading, setLoading] = useState(false)
    const [excelLoading, setExcelLoading] = useState(false)
    const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TIME_RANGES[0])

    const fetchStatistics = useCallback(async (hours: number) => {
        try {
            setLoading(true)
            const data = await getSponsorStatistics(hours)
            setStatistics(data)
        } catch (error) {
            console.error('Error fetching sponsor statistics:', error)
            toast.error('خطا در دریافت آمار')
        } finally {
            setLoading(false)
        }
    }, [])

    const downloadExcel = useCallback(async (hours: number) => {
        try {
            setExcelLoading(true)
            const response = await getSponsorExcel(hours)

            if (response.data?.url) {
                // Construct full URL for download
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.jjline.com'
                const downloadUrl = `${baseUrl}${response.data.url}`

                // Create a temporary link and trigger download
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = `sponsor_report_${hours}h.xlsx`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                toast.success('فایل با موفقیت دانلود شد')
            } else {
                toast.error('خطا در دریافت لینک دانلود')
            }
        } catch (error) {
            console.error('Error downloading excel:', error)
            toast.error('خطا در دانلود فایل')
        } finally {
            setExcelLoading(false)
        }
    }, [])

    const handleTimeRangeChange = useCallback((timeRange: TimeRange) => {
        setSelectedTimeRange(timeRange)
        fetchStatistics(timeRange.hours)
    }, [fetchStatistics])

    return {
        statistics,
        loading,
        excelLoading,
        selectedTimeRange,
        fetchStatistics,
        downloadExcel,
        handleTimeRangeChange,
        timeRanges: TIME_RANGES
    }
} 