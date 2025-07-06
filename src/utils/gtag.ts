declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js' | 'set',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void
        dataLayer: Record<string, any>[]
    }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && GA_ID && window.gtag) {
        window.gtag('config', GA_ID, {
            page_path: url,
        })
    }
}

// Track custom events
export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string
    category: string
    label?: string
    value?: number
}) => {
    if (typeof window !== 'undefined' && GA_ID && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}
