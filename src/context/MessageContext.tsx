// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Types
import mAxios from 'src/configs/axios'

export interface MessageDataType {
    id: number
    text: string
    phone_list: {
        title: string
    }
    app: {
        name: string
    }
    interval: number
    start_date: string
    start_time: string
    end_time: string
    status: string
    createdAt: string
}

interface MessageDataProvider {
    data: MessageDataType[]
    fetchData: () => any
}

// ** Defaults
const defaultProvider: MessageDataProvider = {
    data: [],
    fetchData: () => Promise.resolve()
}

const MessageContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const MessageProvider = ({ children }: Props) => {

    const [data, setData] = useState<MessageDataType[]>([]);

    const fetchData = () => {
        console.log("Comming here");
        mAxios.get("/get/queues").then(res => {
            const queues = res.data.data;
            setData([...queues]);
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log(data);
    }, [data])

    const values = {
        data: data,
        fetchData: fetchData
    }

    return <MessageContext.Provider value={values}>{children}</MessageContext.Provider>
}

export { MessageContext, MessageProvider }
