import { useState } from 'react'
import { Typography, Slider, Button } from '@mui/material'

const LoanBox = () => {
    const [loanAmount, setLoanAmount] = useState<number>(100000000) // 100 million tomans
    const [months, setMonths] = useState<number>(12)

    // Calculate monthly installment
    const calculateMonthlyInstallment = () => {
        // Simple calculation (loan amount divided by months)
        // In real applications, you would include interest rate calculations
        return Math.round(loanAmount / months)
    }

    const handleLoanAmountChange = (event: Event, newValue: number | number[]) => {
        setLoanAmount(newValue as number)
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 p-4 z-10 -mt-[80px]">
            {/* Right Column - Loan Selection */}
            <div className="flex-1 flex flex-col justify-between gap-0 bg-white p-4 lg:p-6 shadow-lg rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="text-primary-blue text-md lg:text-xl font-bold mb-4">
                        وام درخواستی
                    </Typography>
                    <Typography variant="h6" className="text-primary-blue text-md lg:text-lg font-bold mb-4">
                        {loanAmount.toLocaleString()} <span className="text-sm font-normal">تومان</span>
                    </Typography>
                </div>

                <div className="w-full">
                    {/* Min/Max values for mobile - hidden on desktop */}
                    <div className="flex justify-between md:hidden mb-2">
                        <Typography className="text-black text-sm">۱۰ میلیون</Typography>
                        <Typography className="text-black text-sm">۲۰۰ میلیون</Typography>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        {/* Min value for desktop - hidden on mobile */}
                        <Typography className="hidden md:block text-black text-xs fond-bold">۱۰ میلیون</Typography>

                        <Slider
                            value={loanAmount}
                            onChange={handleLoanAmountChange}
                            min={10000000} // 10 million
                            max={200000000} // 200 million
                            step={1000000} // 1 million steps
                            className="md:max-w-[68%] w-full"
                            sx={{
                                color: '#002b8a',
                                '& .MuiSlider-thumb': {
                                    width: 28,
                                    height: 28,
                                    backgroundColor: '#002b8a',
                                    border: '4px solid #fff',
                                    boxShadow: '0 0 0 1px #002b8a',
                                    '&:hover, &.Mui-focusVisible': {
                                        boxShadow: '0 0 0 1px #002b8a',
                                    },
                                    '&:before': {
                                        boxShadow: 'none',
                                    },
                                    '&:after': {
                                        width: 42,
                                        height: 42,
                                    }
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#E0EFFF',
                                    height: 8
                                },
                                '& .MuiSlider-track': {
                                    height: 8
                                }
                            }}
                        />

                        {/* Max value for desktop - hidden on mobile */}
                        <Typography className="hidden md:block text-black text-xs fond-bold">۲۰۰ میلیون</Typography>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4 mt-8">
                    {[6, 8, 12].map((value) => (
                        <Button
                            key={value}
                            variant={months === value ? 'contained' : 'outlined'}
                            onClick={() => setMonths(value)}
                            className={`border-primary-blue ${months === value
                                ? 'bg-primary-blue text-white hover:bg-primary-blue'
                                : 'text-primary-blue hover:bg-primary-blue/5'
                                }`}
                        >
                            {value} ماهه
                        </Button>
                    ))}
                </div>
            </div>

            {/* Left Column - Calculations */}
            <div className="flex-1 flex flex-col gap-6 bg-white p-4 lg:p-6 shadow-lg rounded-lg justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <Typography className="text-primary-blue text-md lg:text-lg font-semibold">
                            مبلغ هر قسط
                        </Typography>
                        <Typography className="text-primary-blue text-md lg:text-lg font-bold">
                            {calculateMonthlyInstallment().toLocaleString()} <span className="text-sm font-normal">تومان</span>
                        </Typography>
                    </div>

                    <div className="h-[1px] w-full bg-gray-200"></div>

                    <div className="flex justify-between items-center">
                        <Typography className="text-primary-blue font-semibold text-md lg:text-sm">
                            اعتبار کیف پول
                        </Typography>
                        <Typography className="text-primary-blue font-bold text-md lg:text-lg">
                            9,050,000 <span className="text-sm font-normal">تومان</span>
                        </Typography>
                    </div>
                </div>

                <Button
                    variant="contained"
                    fullWidth
                    className="bg-primary-orange text-white py-2 text-sm font-semibold hover:bg-primary-orange-1 normal-case"
                >
                    درخواست اعتبار خرید و خدمات
                </Button>
            </div>
        </div>
    )
}

export default LoanBox
