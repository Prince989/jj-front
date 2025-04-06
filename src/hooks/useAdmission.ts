import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import mAxios from 'src/configs/axios';

export interface IService {
    id: number
    title: string
}

export interface IServiceRequest {
    id: number;
    name: string;
    title: string;
    businessId: number;
    price: number;
    usableCredit: number;
    user: {
        id: number;
        fName: string;
        lName: string;
        password: string;
        phoneNumber: string;
        nationalCode: string;
        gender: string;
        birthDate: Date;
    }
    service: {
        id: number;
        title: string;
        price: number
    }
    createdAt: Date;
    updatedAt: Date;
}

interface IResponse<T> {
    problem: {},
    message: "",
    data: T[]
}

export default function useAdmission() {
    const [requests, setRequests] = useState<IServiceRequest[]>([])
    const [initalRequests, setInitialRequests] = useState<IServiceRequest[]>([]);
    const [services, setServices] = useState<IService[]>([])

    const getRequests = () => {
        mAxios.get<IResponse<IServiceRequest>>("service-request/1").then(res => {
            setInitialRequests(res.data.data);
            setRequests(res.data.data)
        })
    }

    useEffect(() => {
        getRequests();
        mAxios.get<IResponse<IService>>("business/services/1").then(res => {
            setServices(res.data.data)
        })
    }, [])

    const filter = (nationalCode: string) => {
        if (nationalCode == "") {
            setRequests(initalRequests)

            return;
        }

        const temp = initalRequests.filter(i => i.user.nationalCode.includes(nationalCode))
        setRequests(temp)
    }

    const install = (amount: string, userId: number, serviceId: number[], serviceType: string, paymentMode: string) => {
        mAxios.post("credit/install", {
            services: serviceId,
            amount: parseInt(amount),
            userId,
            serviceType,
            paymentMode
        }).then(() => {
            toast.success("مبلغ مورد نظر از اعتبار کاربر کسر شد", {
                position: "bottom-left"
            });
            getRequests();
        })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: "bottom-left"
                })
            })
    }

    return {
        requests,
        filter,
        services,
        install,
        getRequests
    }
}
