import { useContext } from 'react'
import { ContactContext } from 'src/context/ContactContext'

export const useContact = () => useContext(ContactContext)
