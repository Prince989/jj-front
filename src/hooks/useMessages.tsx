import { useContext } from 'react'
import { MessageContext } from 'src/context/MessageContext'

export const useMessages = () => useContext(MessageContext)
