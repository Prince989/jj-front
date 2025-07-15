/**
 * Utility function to extract error message from API response
 * @param error - The error object from catch block
 * @param defaultMessage - Default message to show if no message is found
 * @returns The error message to display
 */
export const getErrorMessage = (error: any, defaultMessage = 'خطا در عملیات'): string => {
    // Check if error has response data with message
    if (error?.response?.data?.message) {
        return error.response.data.message
    }

    // Check if error has a direct message property
    if (error?.message) {
        return error.message
    }

    // Return default message if no specific message found
    return defaultMessage
}

/**
 * Utility function to handle API errors with toast notification
 * @param error - The error object from catch block
 * @param defaultMessage - Default message to show if no message is found
 * @param toast - The toast function from react-hot-toast
 */
export const handleApiError = (
    error: any,
    defaultMessage = 'خطا در عملیات',
    toast: any
): void => {
    const errorMessage = getErrorMessage(error, defaultMessage)
    toast.error(errorMessage)
} 