import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import Icon from 'src/@core/components/icon'
import CustomTextField from "src/@core/components/mui/text-field"
import useAdmission, { IService, IServiceRequest } from "src/hooks/useAdmission"

const UserRequest = (props: { request: IServiceRequest, services: IService[], install: (amount: string, userId: number, serviceId: number[], serviceType: string, paymentMode: string) => void }) => {

    const { name, user, usableCredit } = props.request;
    const services = props.services;

    const [selectedServices, setSelectedServices] = useState<IService[]>([])
    const [amount, setAmount] = useState<number>(0)
    const [serviceType, setServiceType] = useState<"medical" | "beauty">("medical")
    const [paymentMode, setPaymentMode] = useState<"promissoryNote" | "installmentCheque" | "guaranteeCheque">("promissoryNote")

    const makeInstallment = () => {
        props.install(amount.toString(), user.id, services.map(s => s.id), serviceType, paymentMode)
        setSelectedServices([])
        setAmount(0)
    }

    const info = useMemo(() => {
        let months = 0;
        let prepay = 0;
        let installment = 0

        let prepayPercentage = 0;
        let installmentPercentage = 0;

        if (serviceType == "medical") {
            switch (paymentMode) {
                case "promissoryNote":
                    prepayPercentage = 30;
                    installmentPercentage = 70;
                    prepay = prepayPercentage * amount / 100;
                    installment = installmentPercentage * amount / 100;
                    months = 6;
                    break;
                case "installmentCheque":
                    prepayPercentage = 30;
                    installmentPercentage = 70;
                    prepay = prepayPercentage * amount / 100;
                    installment = installmentPercentage * amount / 100;
                    months = 12;

                    break;
                case "guaranteeCheque":
                    prepayPercentage = 30;
                    installmentPercentage = 70;
                    prepay = prepayPercentage * amount / 100;
                    installment = installmentPercentage * amount / 100;
                    months = 8;
                    break;
            }
        }
        else {
            switch (paymentMode) {
                case "promissoryNote":
                    prepayPercentage = 50;
                    installmentPercentage = 50;
                    prepay = prepayPercentage * amount / 100;
                    installment = installmentPercentage * amount / 100;
                    months = 3;
                    break;
                case "installmentCheque":
                    prepayPercentage = 50;
                    installmentPercentage = 50;
                    prepay = prepayPercentage * amount / 100;
                    installment = installmentPercentage * amount / 100;
                    months = 6;

                    break;
                case "guaranteeCheque":
                    prepayPercentage = 50;
                    installmentPercentage = 50;
                    prepay = prepayPercentage * amount / 100;
                    installment = installmentPercentage * amount / 100;
                    months = 4;
                    break;
            }
        }

        return {
            prepay: Math.round(prepay),
            prepayPercentage,
            months,
            installment: Math.round(installment),
            installmentPercentage
        }
    }, [amount, serviceType, paymentMode])

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
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">شیوه پرداخت</FormLabel>
                                <RadioGroup
                                    row
                                    value={paymentMode}

                                    // @ts-ignore
                                    onChange={(e) => setPaymentMode(e.currentTarget.value)}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="promissoryNote" control={<Radio />} label="سفته" />
                                    <FormControlLabel value="installmentCheque" control={<Radio />} label="چک اقساط" />
                                    <FormControlLabel value="guaranteeCheque" control={<Radio />} label="چک تضمینی" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        {
                            amount > 0 &&
                            <Box sx={{ fontSize: "18px", my: "20px" }}>
                                <h1 className="font-bold">
                                    شرح پرداختی:
                                </h1>
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

                </AccordionDetails>
            </Accordion>


        </Card>
    )

}

const Admission = () => {

    const { requests, filter, services, install } = useAdmission()

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
                requests.map(r => <UserRequest request={r} services={services} install={install} key={r.id} />)
            }
        </div>
    )
}

function formatCurrency(amount: number): string {
    if (amount > 10)
        amount /= 10;

    return Math.round(amount).toLocaleString('fa-IR'); // 'fa-IR' برای نمایش اعداد به صورت فارسی
}

export default Admission
