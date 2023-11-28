import React, { createContext } from 'react';

const CartContext = createContext({
    items: [],
    total: 0,
    paymentType: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    destroyItem: (id) => { },
    selectPayment: (value) => { }
});

export default CartContext;