import React, { useCallback } from "react";
import OTPInput from "react-otp-input";

interface OtpInputComponentProps {
    onChange: (value: number | null) => void;
    hasError?: boolean;
    value: number | null;
}

const CustomOtpInput: React.FC<OtpInputComponentProps> = ({
    onChange,
    hasError = false,
    value,
}) => {

    const formatPersianNumber = useCallback((number: number) => {
        return number.toLocaleString("fa-IR", { useGrouping: false });
    }, []);

    const convertPersianToEnglish = (str: string) => {
        const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        const englishDigits = "0123456789";

        return str.replace(
            /[۰-۹]/g,
            (char) => englishDigits[persianDigits.indexOf(char)]
        );
    };

    const handleChange = (val: string) => {
        const convertedValue = convertPersianToEnglish(val);

        if (/^\d*$/.test(convertedValue)) {
            onChange(convertedValue === "" ? null : Number(convertedValue));
        }
    };

    return (
        <OTPInput
            value={String(value ?? "")}
            onChange={handleChange}
            inputStyle={{
                border: hasError ? "solid 1px #F73B3B" : "",
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                filter: "drop-shadow(rgba(174, 174, 174, 0.2) 0px 5px 3px)",
                margin: "6px",
                fontSize: "24px",
                fontWeight: "500",
            }}
            containerStyle={{
                padding: "4px",
                direction: "ltr",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            numInputs={4}
            renderInput={(props) => (
                <input
                    {...props}
                    value={props.value ? formatPersianNumber(Number(props.value)) : ""}
                    type="text"
                    dir="rtl"
                />
            )}
        />
    );
};

export default CustomOtpInput;
