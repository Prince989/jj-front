import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import mAxios from 'src/configs/axios'
import authConfig from 'src/configs/auth'

type PaymentItem = {
  id: number
  userId: number
  merchantId: string
  status: string
  paymentId: string
  amount: string
  referenceId: string | null
  sponserId: any
  paymentMethod: string
  transactionType: string
  repaymentInvoiceId: number | null
  clrdRepaymentInvoiceId: number | null
  roshaRepaymentInvoiceId: number | null
  createdAt: string
  updatedAt: string
  prepayInvoiceId: number | null
  orderId: number | null
  roshaOrderId: number | null
}

type ApiResponse<T> = {
  problem: Record<string, unknown>
  message: string
  data: T[]
}

function pickLatestByCreatedAt(items: PaymentItem[]): PaymentItem | null {
  if (!items || items.length === 0) return null
  const withDate = items.filter(item => !!item.createdAt)
  if (withDate.length > 0) {
    return withDate.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]
  }

  return items[items.length - 1]
}

export const useHasRoshaCompletedPayment = () => {
  const [hasCompletedRoshaPayment, setHasCompletedRoshaPayment] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await mAxios.get<ApiResponse<PaymentItem>>('/payment/list')
      const latest = pickLatestByCreatedAt(response.data.data || [])
      const ok =
        !!latest &&
        latest.status === 'completed' &&
        latest.roshaOrderId !== null &&
        latest.roshaOrderId !== undefined
      setHasCompletedRoshaPayment(Boolean(ok))
    } catch (err: any) {
      setError('خطا در دریافت وضعیت پرداخت')
      setHasCompletedRoshaPayment(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const storedToken =
      (typeof window !== 'undefined' && window.localStorage.getItem(authConfig.storageTokenKeyName)) ||
      Cookies.get(authConfig.storageTokenKeyName)
    if (storedToken) {
      fetchStatus()
    } else {
      setHasCompletedRoshaPayment(false)
    }
  }, [fetchStatus])

  return { hasCompletedRoshaPayment, loading, error, refetch: fetchStatus }
}

export default useHasRoshaCompletedPayment


