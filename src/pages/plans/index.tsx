import { Icon } from '@iconify/react'
import { Card, CardContent, Checkbox, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import React, { Dispatch, useEffect, useMemo, useState } from 'react'
import mAxios from 'src/configs/axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

interface APIResponse<T> {
    problem: {},
    message: string,
    data: T
}

interface DataResponse {
    plans: PlanData[],
    apps: AppData[]
}

interface AppData {
    id: number
    name: string
    faText: string
    isActive: boolean
    amount: {
        [key: string]: number
    }
    checked: boolean
    imageAddress: string
}

interface PlanData {
    id: number,
    amount: number,
    key: string
    durationTimeInMonth: number,
    app: {
        id: number
    }[]
}

const ButtonGroupBasic = ({ month, setMonth }: { month: string, setMonth: Dispatch<string> }) => {
    return (
        <div className='demo-space-y'>
            <div>
                <ButtonGroup variant='outlined'>
                    <Button onClick={() => setMonth("1")} variant={month == "1" ? "contained" : "outlined"} >1 ماهه</Button>
                    <Button onClick={() => setMonth("6")} variant={month == "6" ? "contained" : "outlined"}>6 ماهه</Button>
                    <Button onClick={() => setMonth("12")} variant={month == "12" ? "contained" : "outlined"}>12 ماهه</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

function CheckBoxComponent({
    id,
    faTitle,
    month,
    amount,
    imageAddress,
    isActive,
    checked,
    setChecked
}: {
    id: number
    faTitle: string,
    month: string,
    amount: { [key: string]: number },
    imageAddress: string,
    isActive: boolean,
    checked: boolean,
    setChecked: (id: number) => void
}) {

    return (
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center", borderRadius: "10px", borderStyle: "dashed", backgroundColor: (!isActive ? "#f7f7f7" : "inherit"), borderColor: "darkgray", borderWidth: "0.5px", minWidth: "250px", maxWidth: "300px", p: "10px" }}>
            <Image src={process.env.NEXT_PUBLIC_API_BASE_URL + imageAddress} width={60} height={0} sizes='100vw' style={{ height: "auto" }} alt={faTitle} />
            <Box>
                <Typography sx={{ fontSize: "17px", fontWeight: "600" }} component={"h3"}>
                    {faTitle}
                </Typography>
                {
                    isActive ?
                        <Box>
                            <Typography component={"h3"} sx={{ textDecoration: "line-through", fontSize: "12px" }} color={"red"}>
                                {amount?.[month] && formatCurrency(amount?.[month] * 1.4)} تومان
                            </Typography>
                            <Typography component={"h3"} color={"green"}>
                                {amount?.[month] && formatCurrency(amount?.[month])} تومان
                            </Typography>
                        </Box>

                        :
                        <Typography component={"h3"} color={"green"}>
                            به زودی
                        </Typography>
                }

            </Box>
            <Checkbox disabled={!isActive} checked={checked} onChange={() => setChecked(id)} />
        </Box>
    )
}

export default function Plans() {

    const [planData, setPlanData] = useState<PlanData[]>([])
    const [month, setMonth] = useState<string>("1");
    const [apps, setApps] = useState<AppData[]>([])
    const router = useRouter();

    const selectedApps = useMemo(() => {
        return apps.filter(a => a.checked)
    }, [apps])

    const selectedPlan = useMemo(() => {
        const appString = selectedApps.map(a => a.id).sort((a, b) => a - b).join('-');

        const key = appString + "," + month;

        const temp = planData.find(p => p.key == key);

        return temp;
    }, [selectedApps, planData, month])

    const price = useMemo(() => {
        const appString = selectedApps.map(a => a.id).sort((a, b) => a - b).join('-');

        const key = appString + "," + month;

        const temp = planData.find(p => p.key == key)?.amount ?? 0;

        return temp;
    }, [selectedApps, planData, month])

    const tax = useMemo(() => {
        return price * 0.1;
    }, [price])

    const priceTotal = useMemo(() => {
        return price + tax;
    }, [price, tax])

    const pay = () => {
        mAxios.post("/plan/buy", {
            planId: selectedPlan?.id
        }).then(res => {
            const url = res.data?.data.url;
            router.push(url);
        })
            .catch(err => {
                console.log(err);
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message, {
                        position: "bottom-left",
                    })
            })
    }

    useEffect(() => {
        mAxios.get<APIResponse<DataResponse>>("/get/plans").then(res => {
            const temp = res.data.data;

            const result = temp.plans.map(t => {
                const key = t.app.map(t => t.id).sort((a, b) => a - b).join('-') + ',' + t.durationTimeInMonth;

                return {
                    ...t,
                    key
                }
            })

            const singleAppPlans = temp.plans.filter(t => t.app.length == 1)

            const appResult = temp.apps.map(t => {
                const amount: any = {};

                singleAppPlans.forEach(p => {
                    if (p.app?.[0].id == t.id)
                        amount[p.durationTimeInMonth.toString()] = p.amount;
                })

                return {
                    ...t,
                    checked: false,
                    amount
                }
            }).sort((a, b) => a.id - b.id)

            setApps([...appResult]);
            setPlanData([...result])
        })
            .catch(err => {
                console.log(err);
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message, {
                        position: "bottom-left",
                    })
            })
    }, [])

    const handleCheckChange = (id: number) => {
        const temp = [...apps];

        const result = temp.map(t => {
            return {
                ...t,
                checked: (t.id == id ? !t.checked : t.checked)
            }
        })

        setApps([...result]);
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "30px" }}>
            <Grid container gap={6}>
                <Grid item md={7} xs={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: "flex" }}>
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <Icon icon="tabler:diamond" style={{ fontSize: "25px" }} />
                                        <Typography sx={{ fontSize: "20px", fontWeight: "700" }} component={"h1"}>
                                            خرید اشتراک
                                        </Typography>
                                    </Box>

                                    <Box sx={{ my: "30px", mx: "15px" }}>
                                        <Typography sx={{ fontWeight: "600", fontSize: "17px" }} component={"h2"}>
                                            مدت زمان استفاده:
                                        </Typography>
                                    </Box>
                                    <Box sx={{ px: "10px" }}>
                                        <ButtonGroupBasic month={month} setMonth={setMonth} />
                                    </Box>
                                    <Box sx={{ my: "30px", mx: "15px" }}>
                                        <Typography sx={{ fontWeight: "600", fontSize: "17px" }} component={"h2"}>
                                            انتخاب پلتفرم:
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: "100%%", px: "20px" }}>
                                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "start", gap: "10px" }}>
                                            {
                                                apps.map(a => (
                                                    <CheckBoxComponent
                                                        key={a.id}
                                                        id={a.id}
                                                        month={month}
                                                        amount={a.amount}
                                                        isActive={a.isActive}
                                                        faTitle={a.faText}
                                                        imageAddress={a.imageAddress}
                                                        checked={a.checked}
                                                        setChecked={handleCheckChange} />
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ p: "20px" }}>
                                <Typography sx={{ fontWeight: "600", fontSize: "20px" }} component={"h3"}>
                                    جزئیات پرداخت
                                </Typography>
                            </Box>
                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", my: "15px", gap: "20px", px: "30px" }}>
                                    <Typography sx={{ fontWeight: "600", fontSize: "15px" }} component={"h3"}>
                                        مبلغ:
                                    </Typography>
                                    <Typography sx={{ fontWeight: "600", fontSize: "15px" }} component={"h3"}>
                                        {formatCurrency(price)} تومان
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", my: "15px", gap: "20px", px: "30px" }}>
                                    <Typography sx={{ fontWeight: "600", fontSize: "15px" }} component={"h3"}>
                                        مالیات ارزش افزوده:
                                    </Typography>
                                    <Typography sx={{ fontWeight: "600", fontSize: "15px" }} component={"h3"}>
                                        {formatCurrency(tax)}تومان
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ p: "20px" }}>
                                <Typography sx={{ fontWeight: "600", color: "#aaa", fontSize: "20px" }} component={"h3"}>
                                    مبلغ قابل پرداخت:
                                </Typography>
                                <Typography sx={{ fontWeight: "600", mt: "15px" }}>
                                    {formatCurrency(priceTotal)} تومان
                                </Typography>
                            </Box>
                            <Button variant='contained' onClick={() => pay()} disabled={priceTotal == 0 || !selectedPlan} fullWidth>
                                پرداخت
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

function formatCurrency(amount: number): string {
    if (amount > 10)
        amount /= 10;

    return amount.toLocaleString('fa-IR'); // 'fa-IR' برای نمایش اعداد به صورت فارسی
}
