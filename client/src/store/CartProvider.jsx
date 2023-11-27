import { useEffect, useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
    items: [],
    total: 0
};

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        const updatedTotal = state.total + action.item.price * action.item.quantity;
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

        localStorage.setItem('cart', JSON.stringify({ items: updatedItems, total: updatedTotal }));

        return {
            items: updatedItems,
            total: updatedTotal
        };
    }

    if (action.type = 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotal = state.total - existingItem.price;

        let updatedItems;

        if (existingItem.quantity === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);

        } else {
            const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        }

        //TODO: Test if removing items on Cart page updates the storage accordingly
        localStorage.setItem('cart', JSON.stringify({ items: updatedItems, total: updatedTotal }));

        return {
            items: updatedItems,
            total: updatedTotal
        }
    }

    return defaultCartState;
}

function CartProvider(props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    useEffect(() => {

        const local = JSON.parse(localStorage.getItem('cart'))

        if(local) {
            cartState.items = local.items;
            cartState.total = local.total
        }

    }, [])

    function addItemToCartHander(item) {
        dispatchCartAction({ type: 'ADD', item: item });
    }

    function removeItemFromCartHandler(id) {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }

    const cartContext = {
        items: cartState.items,
        total: cartState.total,
        addItem: addItemToCartHander,
        removeItem: removeItemFromCartHandler
    }

    // Resets after refresh and overwrites everything
    // localStorage.setItem('cart', JSON.stringify(cartContext));

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider;