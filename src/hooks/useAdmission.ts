import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import mAxios from 'src/configs/axios';

export interface IService {
    id: number
    title: string
}
export interface IInovicePrepay {
    id: number
    amount: number
    services: {
        id: number;
        title: string;
        price: number
    }[]
    transactions: {
        id: number
        status: "pending" | "failed" | "completed"
    }[]
    createdAt: string
}

export interface IServiceRequest {
    id: number;
    name: string;
    title: string;
    businessId: number;
    price: number;
    usableCredit: number;
    creditAmount: number;
    prepayInvoice: IInovicePrepay[]
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
    const [loading, setLoading] = useState<boolean>(false);

    const getRequests = () => {
        setLoading(true)
        mAxios.get<IResponse<IServiceRequest>>("service-request/1").then(res => {
            setInitialRequests(res.data.data);
            setRequests(res.data.data)
        }).finally(() => {
            setLoading(false)
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

    const prepay = (amount: string, sId: number, serviceType: string, serviceId: number[], Is24: boolean) => {
        mAxios.post("prepay/pay", {
            sId,
            gatewayId: 1,
            services: serviceId,
            Is24,
            amount: parseInt(amount),
            serviceType
        }).then(() => {
            toast.success("لینک پرداخت پیش پرداخت ارسال شد", {
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

    const install = (amount: string, userId: number, serviceId: number[], serviceType: string) => {
        mAxios.post("credit/install", {
            services: serviceId,
            amount: parseInt(amount),
            userId,
            serviceType
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
        prepay,
        getRequests,
        loading
    }
}

export function checkPaymentStatus(invoice: IInovicePrepay) {
    const successfullTransaction = invoice.transactions.find(i => i.status == "completed");

    if (successfullTransaction) {
        return true
    }

    return false
}