import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { format } from "date-fns-jalali"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import Icon from 'src/@core/components/icon'
import CustomTextField from "src/@core/components/mui/text-field"
import useAdmission, { IInovicePrepay, IService, IServiceRequest, checkPaymentStatus } from "src/hooks/useAdmission"

type PaymentMode = "free" | "guaranteeCheque" | "promissoryNote" | "guaranteeAndPersonCheque"

const paymentModeTranslate = {
    "free": "بدون چک و سفته",
    "guaranteeCheque": "چک شخص یا ضامن",
    "promissoryNote": "150% سفته",
    "guaranteeAndPersonCheque": "چک شخص و ضامن"
}

const UserRequest = (
    props: {
        request: IServiceRequest,
        services: IService[],
        loading: boolean,
        getRequest: () => void,
        install: (amount: string, userId: number, serviceId: number[], serviceType: string) => void
        prepay: (amount: string, sId: number, serviceType: string, serviceId: number[], Is24: boolean) => void
    }
) => {

    const { name, user, usableCredit, creditAmount, prepayInvoice } = props.request;
    const services = props.services;
    const getRequest = props.getRequest;

    const [selectedServices, setSelectedServices] = useState<IService[]>([])
    const [amount, setAmount] = useState<number>(0)
    const [serviceType, setServiceType] = useState<"medical" | "beauty">("medical")
    const [is24, setIs24] = useState<boolean>(false);

    const makeInstallment = () => {
        // props.prepay(amount.toString(), user.id, services.map(s => s.id), serviceType)
        props.prepay(amount.toString(), props.request.id, serviceType, services.map(s => s.id), is24)
        setSelectedServices([])
        setAmount(0)
    }

    const handle24Change = (e: ChangeEvent<HTMLInputElement>) => {
        const r = e.currentTarget.value == "24";
        setIs24(r);
    }

    const info = useMemo(() => {
        let months = 0;
        let prepay = 0;
        let installment = 0
        let paymentMode: PaymentMode = "free";
        let prepayPercentage = 0;
        let installmentPercentage = 0;

        if (creditAmount == 2000000000) {
            if (amount <= 2000000000 && amount > 1000000000) {
                paymentMode = "guaranteeAndPersonCheque"
            }
            if (amount <= 1000000000 && amount > 300000000) {
                paymentMode = "guaranteeCheque"
            }
            if (amount <= 300000000 && amount > 50000000) {
                paymentMode = "promissoryNote"
            }
            else if (amount < 50000000) {
                paymentMode = "free"
            }

            if (serviceType == "medical") {
                if (is24) {
                    prepayPercentage = 50
                    installmentPercentage = 50
                    installment = amount * installmentPercentage / 100;
                    prepay = (amount * 18 * (24 + 1)) / 2400;
                    prepay *= 0.5;
                    installment = prepay;
                    months = 24;
                }
                else {
                    prepayPercentage = 30
                    installmentPercentage = 70
                    prepay = amount * prepayPercentage / 100;
                    installment = amount * installmentPercentage / 100;
                    months = 12;
                }
            }
            else {
                prepayPercentage = 50
                installmentPercentage = 50
                prepay = amount * prepayPercentage / 100;
                installment = amount * installmentPercentage / 100;
                months = 6;
            }
        }
        else if (creditAmount == 500000000) {

            if (amount > 100000000 && amount <= 500000000) {
                paymentMode = "guaranteeCheque"
            }
            else if (amount <= 100000000 && amount > 10000000) {
                paymentMode = "promissoryNote"
            }
            else if (amount < 10000000) {
                paymentMode = "free"
            }

            if (serviceType == "medical") {
                prepayPercentage = 30
                installmentPercentage = 70
                prepay = amount * prepayPercentage / 100;
                installment = amount * installmentPercentage / 100;
                months = 6;
            }
            else {
                prepayPercentage = 50
                installmentPercentage = 50
                prepay = amount * prepayPercentage / 100;
                installment = amount * installmentPercentage / 100;
                months = 4;
            }
        }
        else {

        }

        return {
            prepay: Math.round(prepay),
            prepayPercentage,
            months,
            paymentMode,
            installment: Math.round(installment),
            installmentPercentage
        }
    }, [amount, serviceType, is24])

    return (
        <Card sx={{ padding: '30px', my: "30px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Box>
                    <span>
                        درخواست کننده :
                    </span>
                    <span>
                        {
                            user.fName + " " + user.lName
                        }
                    </span>
                </Box>
                <Box>
                    <span>
                        به نام :
                    </span>
                    <span>
                        {name}
                    </span>
                </Box>
                <Box>
                    <span>
                        کد ملی درخواست کننده :
                    </span>
                    <span>
                        {user.nationalCode}
                    </span>
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", my: "20px" }}>
                <Box>
                    <span>
                        مقدار اعتبار :
                    </span>
                    <span>
                        {
                            formatCurrency(usableCredit)
                        }
                        &nbsp;
                        تومان
                    </span>
                </Box>
                <Box />
                <Box />
                <Box />
            </Box>

            <Accordion>
                <AccordionSummary
                    expandIcon={<Icon icon="tabler:chevron-down" />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h1 className="font-bold text-lg">
                        پذیرش
                    </h1>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ marginY: "30px" }} />
                    <Box sx={{ display: 'flex', flexWrap: "wrap", justifyContent: "space-between" }}>
                        <Box>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">نوع خدمت یا خدمات</FormLabel>
                                <RadioGroup
                                    row
                                    value={serviceType}

                                    // @ts-ignore
                                    onChange={(e) => setServiceType(e.currentTarget.value)}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="medical" control={<Radio />} label="درمانی" />
                                    <FormControlLabel value="beauty" control={<Radio />} label="زیبایی" />
                                </RadioGroup>
                            </FormControl>
                            <Box sx={{ mx: "30px" }} />
                            {
                                creditAmount == 2000000000 &&
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">شیوه پرداخت</FormLabel>
                                    <RadioGroup
                                        row
                                        value={is24 ? "24" : "12"}
                                        defaultValue={"12"}

                                        // @ts-ignore
                                        onChange={handle24Change}
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="12" control={<Radio />} label="12 ماهه" />
                                        <FormControlLabel value="24" control={<Radio />} label="24 ماهه" />
                                    </RadioGroup>
                                </FormControl>
                            }
                        </Box>
                        {
                            amount > 0 &&
                            <Box sx={{ fontSize: "18px", my: "20px" }}>
                                <h1 className="font-bold">
                                    شرح پرداختی:
                                </h1>
                                <p>
                                    {
                                        paymentModeTranslate[info.paymentMode]
                                    }
                                </p>
                                <p>
                                    <b>
                                        {info.prepayPercentage}
                                    </b>
                                    {
                                        `% پیش پرداخت`
                                    }
                                    &nbsp;
                                    <b>
                                        {info.installmentPercentage}
                                    </b>
                                    {
                                        `% اقساط`
                                    }
                                </p>
                                <p>
                                    <b>
                                        {info.months}
                                    </b>
                                    {
                                        ` ماهه`
                                    }
                                </p>
                                {
                                    is24 &&
                                    <p>
                                        <b>
                                            سود سالیانه 18 درصد
                                        </b>
                                    </p>
                                }

                                <p>
                                    <b>
                                        {
                                            ` ${formatCurrency(info.prepay)} تومان `
                                        }
                                    </b>
                                    &nbsp;
                                    پیش پرداخت
                                </p>
                                <p>
                                    <b>
                                        {
                                            ` ${(formatCurrency(info.installment / info.months))} تومان `
                                        }
                                    </b>
                                    &nbsp;
                                    اقساط ماهیانه
                                </p>
                            </Box>
                        }
                        <Box />
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center" }}>
                        <Autocomplete
                            sx={{ width: 300 }}
                            options={services}
                            autoHighlight
                            multiple
                            value={selectedServices}
                            onChange={(event: any, newValue: IService[] | null) => {
                                setSelectedServices(newValue ?? []);
                            }}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="خدمات مورد نظر را انتخاب کنید"
                                />
                            )}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <CustomTextField type="number" value={amount.toString()} label="هزینه" onChange={(e) => setAmount(parseInt(e.currentTarget.value))} />
                            <span className="text-sm">
                                {
                                    formatCurrency(amount)
                                }
                                &nbsp;
                                تومان
                            </span>
                        </Box>
                        <Button
                            onClick={makeInstallment}
                            className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                            variant="contained" size="small" sx={{ width: "100px", height: "40px" }}>
                            ثبت
                        </Button>
                    </Box>
                    {
                        prepayInvoice.map(p =>
                            <Invoice invoice={p} key={p.id} getRequest={getRequest} loading={props.loading} />
                        )
                    }
                </AccordionDetails>
            </Accordion>


        </Card>
    )

}

const Invoice = (props: { invoice: IInovicePrepay, getRequest: () => void, loading: boolean }) => {

    const { id, amount, createdAt, services } = props.invoice;

    const paymentStatus = useMemo(() => {
        return checkPaymentStatus(props.invoice);
    }, [props.invoice])

    return (
        <Card sx={{ padding: "20px", my: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    شماره فاکتور:
                    {id}
                </Box>
                <Box>
                    مبلغ پیش پرداخت:
                    {amount.toLocaleString()} ریال
                </Box>
                <Box>
                    خدمات:
                    {services.map(s => s.title).join(",")}
                </Box>
                <Box>
                    تاریخ:
                    {convertToJalali(createdAt)}
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", my: "20px" }}>
                <Box>
                    وضعیت : {
                        paymentStatus ? <span className="text-emerald-500">
                            پرداخت شده
                        </span>
                            :
                            <span className="text-orange-600">
                                در انتظار پرداخت
                            </span>
                    }
                </Box>
                {
                    !paymentStatus &&
                    <Box>
                        <Button
                            disabled={props.loading}
                            onClick={props.getRequest}
                            className="bg-primary-orange text-white rounded-lg py-3 px-6 normal-case text-sm font-medium hover:bg-primary-orange-1"
                            variant="contained" size="small" sx={{ width: "200px", height: "40px" }}>
                            بررسی وضعیت پرداخت
                        </Button>
                    </Box>
                }
            </Box>
        </Card>
    )
}

const Admission = () => {

    const { requests, filter, services, install, prepay, getRequests, loading } = useAdmission()

    useEffect(() => {
        console.log(requests)
    }, [requests])

    return (
        <div>
            <Card sx={{ padding: "30px" }}>
                <CustomTextField label="کدملی" onChange={(e) => filter(e.currentTarget.value)} />
            </Card>
            <Box sx={{ marginY: "30px" }} />
            {
                requests.map(r => <UserRequest getRequest={getRequests} loading={loading} request={r} prepay={prepay} services={services} install={install} key={r.id} />)
            }
        </div>
    )
}

function formatCurrency(amount: number): string {
    if (amount > 10)
        amount /= 10;

    return Math.round(amount).toLocaleString('fa-IR'); // 'fa-IR' برای نمایش اعداد به صورت فارسی
}


function convertToJalali(dateString: string): string {
    const date = new Date(dateString);

    return format(date, 'yyyy/MM/dd');
}

export default Admission
