import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    paymentType: 'installment' | 'online';
    setPaymentType: React.Dispatch<React.SetStateAction<'installment' | 'online'>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [quantity, setQuantity] = useState(1);
    const [paymentType, setPaymentType] = useState<'installment' | 'online'>('installment');

    return (
        <CartContext.Provider value={{ quantity, setQuantity, paymentType, setPaymentType }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartQuantity = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartQuantity must be used within a CartProvider');
    }

    return context;
}; 