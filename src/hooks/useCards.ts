import { useEffect, useState } from 'react'
import mAxios from 'src/configs/axios'

export interface Card {
    id: number
    title: string
    credit: number
    price: number
    installCount: number
    subTitle: string[]
    createdAt: string
    updatedAt: string
}

export interface CardResponse {
    problem: Record<string, unknown>
    message: string
    data: Card[]
}

// Cache the cards data
let cachedCards: Card[] | null = null
let lastFetchTime: number | null = null
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour in milliseconds

export const useCards = () => {
    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCards = async () => {
            try {

                // If we have cached data and it's not expired, use it
                if (cachedCards && lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION) {
                    setCards(cachedCards)
                    setLoading(false)

                    return
                }

                const response = await mAxios.get<CardResponse>('/card')
                const fetchedCards = response.data.data

                // Update cache
                cachedCards = fetchedCards
                lastFetchTime = Date.now()

                setCards(fetchedCards)
                setError(null)
            } catch (err) {
                setError('Failed to fetch cards')
                console.error('Error fetching cards:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchCards()
    }, [])

    return { cards, loading, error }
}

export default useCards 