import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Typography, Button, Select, Option } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import CartContext from '../../store/CartContext';

function CartPage() {

    const cartCTX = useContext(CartContext);
    const [cartProducts, setCartProducts] = useState({});
    const [paymentType, setPaymentType] = useState(0);

    function cartItemAddHandler(id, name, sku, amount, price) {
        cartCTX.addItem({
            id: id,
            name: name,
            sku: sku,
            quantity: amount,
            price: price
        })
    }

    function cartItemRemoveHandler(id) {
        cartCTX.removeItem(id);
    }

    function destroyCartItemHandler(id) {

        if (window.confirm('Esta seguro?')) {

            cartCTX.destroyItem(id);
        }
    }

    function handlePaymentType(value) {
        setPaymentType(parseInt(value));
        cartCTX.selectPayment(parseInt(value));
    }

    useEffect(() => {

        const local = JSON.parse(localStorage.getItem('cart'));

        if (local) {
            setCartProducts(local)
            setPaymentType(local.paymentType)
        } else {
            return;
        }

    }, [cartCTX])

    return (
        <>
            <NavBarComponent />
            {/* Main Container */}
            <div className='p-3 background'>
                {/* Cart Container */}
                <div className='bg-gray-300 my-2'>
                    <div className='block md:indent-20 text-center py-5'>
                        <Typography variant="h2">Mi Carrito</Typography>
                    </div>
                    <div>
                        <div className='flex flex-col'>
                            {/* Cart List */}
                            {
                                cartProducts.items?.length !== 0 && Object.keys(cartProducts).length !== 0 ?

                                    <>
                                        {/* Headers */}
                                        <div className='flex flex-row justify-between my-6'>
                                            <div className='flex w-full'>
                                                <Typography className='flex w-full justify-center' variant="lead">Producto</Typography>
                                            </div>
                                            <div className='flex mx-5'>
                                                <Typography variant="lead" className='mx-5'>Cantidad</Typography>
                                                <Typography variant="lead" className=''>Subtotal</Typography>
                                            </div>
                                        </div>
                                        {cartProducts.items?.map((item, index) => (

                                            <div className='flex flex-row justify-center items-center my-6' key={index}>
                                                <div className='flex grow'>
                                                    <div className=''>
                                                        <Button className='p-0 mx-1' variant="text" onClick={() => destroyCartItemHandler(item.id)}>
                                                            <svg fill="#000000" width="48px" height="48px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M589 307v-51H435v51H307v51h410v-51M333 410v358h358V410H333zm102 307h-51V461h51v256zm103 0h-52V461h52v256zm102 0h-51V461h51v256z"></path></g></svg>
                                                        </Button>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <Typography variant="lead">{item.name}</Typography>
                                                    </div>
                                                </div>
                                                <div className='flex mx-5 items-center'>
                                                    <div className='flex items-center'>
                                                        <div className='flex flex-col'>
                                                            <Button className='my-1' variant="gradient" color='pink' onClick={() => cartItemAddHandler(item.id, item.name, item.sku, 1, item.price)}>+</Button>
                                                            <Button className='my-1' variant="gradient" color='gray' onClick={() => cartItemRemoveHandler(item.id)}>-</Button>
                                                        </div>
                                                        <Typography variant="lead" className='mx-5'>{item.quantity}</Typography>
                                                    </div>
                                                    <Typography variant="lead" className='mx-5 shrink'>${item.price * item.quantity}</Typography>
                                                </div>
                                            </div>
                                        ))}
                                    </>

                                    :

                                    <div className='flex justify-center p-5'>
                                        <Typography>No tenes productos en tu carrito!</Typography>
                                    </div>

                            }

                        </div>

                        {/* Total */}
                        <div className='flex justify-center p-5'>
                            <Typography variant="h4">Total: ${cartProducts.total}</Typography>
                        </div>
                    </div>
                </div>

                {
                    cartProducts.items?.length !== 0 && Object.keys(cartProducts).length !== 0 ?

                        // Payment Container
                        <div className='bg-pink-400 p-5'>
                            <div className='flex justify-center my-2'>
                                <Typography variant="h2">Facturación</Typography>
                            </div>

                            <div className='flex grow my-5'>
                                <div className="p-2 grow">
                                    <Select label="Metodo de Pago" className='bg-white' variant="outlined" size='lg' value={String(paymentType)} name="paymentType" onChange={handlePaymentType}>
                                        <Option value='0'>Transferencia</Option>
                                        <Option value='1'>Mercado Pago</Option>
                                    </Select>
                                </div>
                            </div>

                            <div className='flex flex-col justify-center items-center'>
                                <Typography variant='h3' color='white' className='my-2'>
                                    ATENCION
                                </Typography>
                                <Typography variant="lead" color='white' className='text-justify my-2'>
                                    En caso de elegir pago por transferencia, se generara una orden en la cual luego veras las instrucciones de como proceder con el pago.
                                </Typography>
                                <Typography variant="lead" color='white' className='text-justify my-2'>
                                    Por otra parte, si elegis pagar con Mercado Pago, se te llevara al procesador de pago de Mercado Pago para que completes tu compra.
                                </Typography>
                            </div>

                            <div className='flex flex-col mt-5'>
                                <Link to="/store">
                                    <Button className='p-5 my-2' color='white' variant="gradient" size="lg">Volver a la Tienda</Button>
                                </Link>
                                <Button className='p-5 my-2' color='white' variant="gradient" size='lg'>Continuar</Button>
                            </div>
                        </div>

                        :

                        null
                }

            </div>
            <FooterComponent />
        </>
    )
}

export default CartPage;