import React, { useContext, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import CartContext from '../../store/CartContext';
import '../../animations/animista.css';

function OrderCompletedPage() {

    const cartCTX = useContext(CartContext);

    useEffect(() => {
        cartCTX.restoreCart();
    }, [])

    return (
        <>
            <div className='flex flex-col h-screen'>
                <NavBarComponent />
                {/* Order Completed Container */}
                <div className='p-2 background lg:flex lg:justify-center grow'>
                    <Card className="h-full w-full lg:w-3/4 xl:w-1/2">
                        <CardBody className='flex flex-col grow justify-center'>
                            <div className='flex flex-col items-center justify-center'>
                                <svg className='my-5' width="64px" height="64px" viewBox="0 0 20.00 20.00" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#66ff7b" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                                <Typography variant="h5" color="blue-gray" className="mb-5 text-center">
                                    Orden finalizada!
                                </Typography>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                {/* <Typography className='text-center text-xl my-5'>
                                    Tu orden <span className='font-bold inline-block'>#3123129014198309</span> ha sido recibida!
                                </Typography> */}
                                <Typography className='text-center text-xl my-5'>
                                    Tu orden ha sido recibida!
                                </Typography>
                                <Typography className='text-center text-lg my-5'>
                                    Si elegiste pagar por transferencia, por favor segui las siguientes instrucciones!
                                </Typography>
                                <Typography className='text-center my-5' variant='h4'>
                                    INSTRUCCIONES A SEGUIR
                                </Typography>

                                <Typography className='my-5 text-base md:text-lg text-center'>
                                    Para confirmar tu pedido, primero tenes que enviar el pago al siguiente CBU: <span className='font-bold underline inline-block'>289137198794871293872193871</span> - o por alias <span className='font-bold underline inline-block'>dame.la.plata</span>
                                </Typography>

                                <Typography className='my-5 text-lg text-center'>
                                    Una vez realizada la transferencia, enviamos el comprobante junto con el numero de orden al siguiente telefono por WhatsApp <span className='font-bold underline inline-block'>261-221-3244</span> para confirmar tu pedido.
                                </Typography>

                                <Typography className='text-center my-5' variant='h5'>
                                    Tu pedido estara llegando en las proximas <span className='underline'>24 horas</span>
                                </Typography>

                                <Typography className='text-center my-5' variant='lead'>
                                    Muchas gracias por confiar en nosotros!
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0 flex justify-center">
                            <Link to='/store'>
                                <Button className='md:w-1/2 shadow-pop-br h-14' variant='outlined' color='pink'>Volver a la tienda</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
                <FooterComponent />
            </div>
        </>
    )
}

export default OrderCompletedPage;