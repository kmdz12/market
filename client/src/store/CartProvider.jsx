import { useEffect, useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
    items: [],
    total: 0,
    paymentType: 1
};

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {

        const updatedTotal = state.total + action.item.unit_price * action.item.quantity;
        const currentCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const currentCartItem = state.items[currentCartItemIndex];
        let updatedItems;

        if (currentCartItem) {

            const updatedItem = {
                ...currentCartItem,
                quantity: currentCartItem.quantity + action.item.quantity
            };

            updatedItems = [...state.items];
            updatedItems[currentCartItemIndex] = updatedItem;

        } else {

            updatedItems = state.items.concat(action.item);
        }

        localStorage.setItem('cart', JSON.stringify({ items: updatedItems, total: updatedTotal, paymentType: state.paymentType }));

        return {
            items: updatedItems,
            total: updatedTotal,
            paymentType: state.paymentType
        }
    }

    if (action.type === 'REMOVE') {

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotal = state.total - existingItem.unit_price;

        let updatedItems;

        if (existingItem.quantity === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);

        } else {

            const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        localStorage.setItem('cart', JSON.stringify({ items: updatedItems, total: updatedTotal, paymentType: state.paymentType }));

        return {
            items: updatedItems,
            total: updatedTotal,
            paymentType: state.paymentType
        }
    }

    if (action.type === 'DESTROY') {

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotal = state.total - existingItem.unit_price * existingItem.quantity;

        let updatedItems;

        updatedItems = state.items.filter(item => item.id !== action.id);

        localStorage.setItem('cart', JSON.stringify({ items: updatedItems, total: updatedTotal, paymentType: state.paymentType }));

        return {
            items: updatedItems,
            total: updatedTotal,
            paymentType: state.paymentType
        }
    }

    if (action.type === 'PAYMENT') {

        localStorage.setItem('cart', JSON.stringify({ items: state.items, total: state.total, paymentType: action.value }));

        return {
            items: state.items,
            total: state.total,
            paymentType: action.value
        }
    }

    if (action.type === 'RESTORE') {

        localStorage.setItem('cart', JSON.stringify({ items: [], total: 0, paymentType: 1 }));

        return {
            items: [],
            total: 0,
            paymentType: 1
        }
    }

    return defaultCartState;
}

function CartProvider(props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    useEffect(() => {

        const local = JSON.parse(localStorage.getItem('cart'));

        if (local) {
            cartState.items = local.items;
            cartState.total = local.total;
            cartState.paymentType = local.paymentType;
        }

    }, [])

    function addItemToCartHander(item) {
        dispatchCartAction({ type: 'ADD', item: item });
    }

    function removeItemFromCartHandler(id) {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }

    function destroyItemFromCartHandler(id) {
        dispatchCartAction({ type: 'DESTROY', id: id });
    }

    function selectPaymentHandler(value) {
        dispatchCartAction({ type: 'PAYMENT', value: value });
    }

    function restoreCart() {
        dispatchCartAction({ type: 'RESTORE' });
    }

    const cartContext = {
        items: cartState.items,
        total: cartState.total,
        paymentType: cartState.paymentType,
        addItem: addItemToCartHander,
        removeItem: removeItemFromCartHandler,
        destroyItem: destroyItemFromCartHandler,
        selectPayment: selectPaymentHandler,
        restoreCart: restoreCart
    }

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider;