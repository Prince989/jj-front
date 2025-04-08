function formatCurrency(amount: number): string {
    if (amount > 10)
        amount /= 10;

    return Math.round(amount).toLocaleString('fa-IR'); // 'fa-IR' برای نمایش اعداد به صورت فارسی
}

export default formatCurrency;