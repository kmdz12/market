import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Typography, Button, Select, Option } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import CartContext from '../../store/CartContext';
import DataService from '../../service/dataService';

function CartPage() {

    const cartCTX = useContext(CartContext);
    const [cartProducts, setCartProducts] = useState({});
    const [paymentType, setPaymentType] = useState(0);
    const [userStatus, setUserStatus] = useState(false);
    const [location, setLocation] = useLocation();
    const dataService = new DataService();

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

        if (window.confirm('Quitar este producto del Carrito?')) {

            cartCTX.destroyItem(id);
        }
    }

    function handlePaymentType(value) {
        setPaymentType(parseInt(value));
        cartCTX.selectPayment(parseInt(value));
    }

    function handleDirectionsCheck() {

        dataService.checkLoggedUser().then((response) => {
            setUserStatus(response)

            if (response.loggedIn) {
                setLocation('/completeOrder')
            }

        }).catch((e) => {
            setUserStatus(e.response.data.loggedIn)
            setLocation('/login')
        })
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
            <div className='p-2 background md:p-5 lg:flex lg:flex-row'>
                {/* Cart Container */}
                <div className='bg-gray-300 my-2 rounded lg:flex lg:flex-col mx-1 lg:basis-full'>
                    <div className='block text-center py-3'>
                        <Typography variant="h2">Mi Carrito</Typography>
                    </div>
                    <div>
                        <div className='flex flex-col'>
                            {/* Cart List */}
                            {
                                cartProducts.items?.length !== 0 && Object.keys(cartProducts).length !== 0 ?

                                    <>
                                        {/* Headers */}
                                        <div className='flex flex-row justify-between my-2 md:justify-between md:mx-15'>
                                            <Typography variant="lead" className='ml-12'>Producto</Typography>
                                            <Typography variant="lead" className='mr-10'>Subtotal</Typography>
                                        </div>
                                        {cartProducts.items?.map((item, index) => (

                                            <div className='flex flex-row justify-between my-4' key={index}>
                                                <div className='flex md:grow'>
                                                    <div className='flex self-center'>
                                                        <Button className='p-0 mx-1' variant="text" onClick={() => destroyCartItemHandler(item.id)}>
                                                            <svg fill="#000000" width="48px" height="48px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M589 307v-51H435v51H307v51h410v-51M333 410v358h358V410H333zm102 307h-51V461h51v256zm103 0h-52V461h52v256zm102 0h-51V461h51v256z"></path></g></svg>
                                                        </Button>
                                                    </div>
                                                    <div className='flex flex-col md:flex-row md:items-center md:grow md:w-full md:justify-between'>
                                                        <Typography variant="small" className='pr-10 md:text-lg md:p-0'>{item.name}</Typography>
                                                        <div className='flex flex-col md:basis-[45%] md:px-0'>
                                                            <div className='flex flex-row md:justify-center'>
                                                                <Typography variant="paragraph" className='my-2'>Cantidad:{item.quantity}</Typography>
                                                            </div>
                                                            <div className='flex md:items-center md:justify-center'>
                                                                <Button className='px-4 mr-2' variant="gradient" color='pink' onClick={() => cartItemAddHandler(item.id, item.name, item.sku, 1, item.price)}>
                                                                    <Typography variant='small'>+</Typography>
                                                                </Button>
                                                                <Button className='px-4' variant="gradient" color='gray' onClick={() => cartItemRemoveHandler(item.id)}>
                                                                    <Typography variant='small'>-</Typography>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center mx-5 md:m-0 md:basis-[23%] lg:basis-[16%] lg:justify-end'>
                                                    <Typography variant="lead" className='mx-2 md:px-8 lg:mr-5 lg:p-0' >${item.price * item.quantity}</Typography>
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
                            <Typography variant="h4">Total: $ {cartProducts.total}</Typography>
                        </div>
                    </div>
                </div>

                {
                    cartProducts.items?.length !== 0 && Object.keys(cartProducts).length !== 0 ?

                        // Payment Container
                        <div className='bg-pink-400 my-2 rounded lg:flex lg:flex-col lg:basis-2/3 mx-1'>
                            <div className='block text-center py-3'>
                                <Typography variant="h2">Facturación</Typography>
                            </div>

                            <div className='flex grow mt-5 lg:grow-0'>
                                <div className="p-5 px-10 grow lg:mt-5">
                                    <Select label="Metodo de Pago" className='bg-white' variant="outlined" size='lg' value={String(paymentType)} name="paymentType" onChange={handlePaymentType}>
                                        <Option value='0'>Transferencia</Option>
                                        <Option value='1'>Mercado Pago</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className='p-5 lg:flex lg:flex-col lg:justify-around lg:grow'>
                                <div className='flex flex-col justify-center items-center'>
                                    <Typography variant='h3' color='white' className='my-2'>
                                        ATENCION
                                    </Typography>
                                    <Typography variant="lead" color='white' className='my-2 md:px-10'>
                                        En caso de elegir pago por transferencia, se generara una orden en la cual luego veras las instrucciones de como proceder con el pago.
                                    </Typography>
                                    <Typography variant="lead" color='white' className='my-2 md:px-10'>
                                        Por otra parte, si elegis pagar con Mercado Pago, se te llevara al procesador de pago de Mercado Pago para que completes tu compra.
                                    </Typography>
                                </div>

                                <div className='flex flex-col mt-5 md:px-10'>
                                    <Link to="/store">
                                        <Button className='p-5 my-2 shadow-pop-br' color='white' variant="gradient" size="lg">Volver a la Tienda</Button>
                                    </Link>
                                    <Button className='p-5 my-2 shadow-pop-br' color='white' variant="gradient" size='lg' onClick={handleDirectionsCheck}>Continuar</Button>
                                </div>
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