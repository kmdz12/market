import { createContext } from 'react';

const CartContext = createContext({
    items: [],
    total: 0,
    paymentType: 1,
    addItem: (item) => { },
    removeItem: (id) => { },
    destroyItem: (id) => { },
    selectPayment: (value) => { },
    restoreCart: () => { }
});

export default CartContext;