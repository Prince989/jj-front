import { Autocomplete, Box, Button, Card, Divider, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import CustomTextField from "src/@core/components/mui/text-field"
import useAdmission, { IService, IServiceRequest } from "src/hooks/useAdmission"

const UserRequest = (props: { request: IServiceRequest, services: IService[], install: (amount: string, userId: number, serviceId: number[]) => void }) => {

    const { name, user, usableCredit } = props.request;
    const services = props.services;

    const [selectedServices, setSelectedServices] = useState<IService[]>([])
    const [amount, setAmount] = useState<number>(0)

    const makeInstallment = () => {
        props.install(amount.toString(), user.id, services.map(s => s.id))
        setSelectedServices([])
        setAmount(0)
    }

    return (
        <Card sx={{ padding: '30px' }}>
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

            <Divider sx={{ height: "2px" }} orientation="horizontal" />

            <Box sx={{ marginY: "30px" }} />
            <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
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

    return amount.toLocaleString('fa-IR'); // 'fa-IR' برای نمایش اعداد به صورت فارسی
}

export default Admission
