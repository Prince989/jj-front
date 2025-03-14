// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Types
import mAxios from 'src/configs/axios'

interface ContactDataType {
    "id": number,
    "title": string,
    "excelAddress": string,
}

interface ContactDataProvider {
    data: ContactDataType[]
    fetchData: () => any
}

// ** Defaults
const defaultProvider: ContactDataProvider = {
    data: [],
    fetchData: () => Promise.resolve()
}

const ContactContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const ContactProvider = ({ children }: Props) => {

    const [data, setData] = useState<ContactDataType[]>([]);

    const fetchData = () => {
        mAxios.get("/get/contact").then(res => {
            const contacts = res.data.data;
            setData([...contacts]);
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const values = {
        data: data,
        fetchData: fetchData
    }

    return <ContactContext.Provider value={values}>{children}</ContactContext.Provider>
}

export { ContactContext, ContactProvider }
