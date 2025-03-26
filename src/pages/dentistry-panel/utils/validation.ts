export const phoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/

export const persianToEnglish = (str: string): string => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

    return str.replace(/[۰-۹]/g, (d) => String(persianNumbers.indexOf(d)))
}

export const englishToPersian = (str: string): string => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

    return str.replace(/[0-9]/g, (d) => persianNumbers[Number(d)])
}

export interface ValidationResult {
    isValid: boolean;
    error: string;
}

export const validatePhone = (phone: string): ValidationResult => {
    if (!phone) {
        return {
            isValid: false,
            error: 'شماره موبایل الزامی است'
        }
    }

    const englishPhone = persianToEnglish(phone)
    if (!phoneRegex.test(englishPhone)) {
        return {
            isValid: false,
            error: 'شماره موبایل نامعتبر است'
        }
    }

    return {
        isValid: true,
        error: ''
    }
}

export const validateFullName = (name: string): ValidationResult => {
    if (!name || name.trim() === '') {
        return {
            isValid: false,
            error: 'نام و نام خانوادگی الزامی است'
        }
    }

    if (name.trim().length < 3) {
        return {
            isValid: false,
            error: 'نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد'
        }
    }

    return {
        isValid: true,
        error: ''
    }
} 