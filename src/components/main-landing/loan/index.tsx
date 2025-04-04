import { useState } from 'react'
import { Typography, Slider, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled components for non-layout elements
const ValueDisplay = styled(Typography)(() => ({
    color: '#0B389F',
    fontSize: '24px',
    fontWeight: 700
}))

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
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-2xl shadow-lg">
            {/* Right Column - Loan Selection */}
            <div className="flex-1 flex flex-col gap-6">

                <div className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="text-[#0B389F] font-semibold mb-4">
                        وام درخواستی
                    </Typography>
                    <ValueDisplay>
                        {loanAmount.toLocaleString()} تومان
                    </ValueDisplay>
                </div>
                <div>

                    <Slider
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                        min={10000000} // 10 million
                        max={200000000} // 200 million
                        step={1000000} // 1 million steps
                        sx={{
                            color: '#0B389F',
                            '& .MuiSlider-thumb': {
                                width: 24,
                                height: 24,
                                backgroundColor: '#fff',
                                border: '2px solid #0B389F',
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: '0 0 0 8px rgba(11, 56, 159, 0.16)'
                                }
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: '#E0EFFF'
                            }
                        }}
                    />
                    <div className="flex justify-between mt-2">
                        <Typography className="text-[#6F6B7D] text-sm">10 میلیون</Typography>
                        <Typography className="text-[#6F6B7D] text-sm">200 میلیون</Typography>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex justify-center gap-4 mb-8">
                        {[6, 12, 18].map((value) => (
                            <Button
                                key={value}
                                variant={months === value ? 'contained' : 'outlined'}
                                onClick={() => setMonths(value)}
                                className={`border-[#0B389F] ${months === value
                                    ? 'bg-[#0B389F] text-white hover:bg-[#0B389F]'
                                    : 'text-[#0B389F] hover:bg-[#0B389F]/5'
                                    }`}
                            >
                                {value} ماهه
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Left Column - Calculations */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="bg-[#F3F3F3] rounded-lg p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <Typography className="text-[#0B389F] font-semibold">
                            مبلغ هر قسط
                        </Typography>
                        <Typography className="text-[#0B389F] font-bold text-xl">
                            {calculateMonthlyInstallment().toLocaleString()} تومان
                        </Typography>
                    </div>

                    <div className="flex justify-between items-center">
                        <Typography className="text-[#0B389F] font-semibold">
                            اعتبار کیف پول
                        </Typography>
                        <Typography className="text-[#0B389F] font-bold text-xl">
                            9,050,000 تومان
                        </Typography>
                    </div>
                </div>

                <Button
                    variant="contained"
                    fullWidth
                    className="bg-[#FF6A00] text-white py-3 text-base font-semibold hover:bg-[#e65f00] normal-case"
                >
                    درخواست اعتبار خرید و خدمات
                </Button>
            </div>
        </div>
    )
}

export default LoanBox
