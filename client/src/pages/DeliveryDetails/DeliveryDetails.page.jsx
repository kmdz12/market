import React, { useState, useEffect, useContext } from 'react';
import { Input, Typography, Select, Option, Textarea, Button } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import DataService from '../../service/dataService';
import CartContext from '../../store/CartContext';

function DeliveryDetailsPage() {

    const cartCTX = useContext(CartContext);
    const [cartProducts, setCartProducts] = useState({});
    const [userLogged, setUserLogged] = useState();
    const [currentUser, setCurrentUser] = useState({
        email: '',
        id: 0,
        info_id: 0,
        name: '',
        phone: '',
        surname: ''
    });
    const [pickup, setPickup] = useState({
        name: '',
        surname: ''
    })
    const dataService = new DataService();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {

            dataService.checkLoggedUser().then((response) => {
                setUserLogged(response)
            }).catch((e) => {
                setUserLogged(e.response.data.loggedIn)
                localStorage.removeItem('token');
                setLocation('/login')
            })
        } else {
            setLocation('/login')
        }

    }, [])

    useEffect(() => {
        dataService.getUser().then((response) => setCurrentUser(response))
        setPickup({
            name: currentUser.name,
            surname: currentUser.surname
        })
    }, [userLogged])

    useEffect(() => {

        const local = JSON.parse(localStorage.getItem('cart'));

        if (local) {
            setCartProducts(local)
        } else {
            return;
        }

    }, [cartCTX])

    useEffect(() => {

        // console.log(currentUser, userLogged)
        // console.log(cartProducts)
    }, [currentUser, userLogged])

    function handlePickupChange(e) {
        const { name, value } = e.target;

        setPickup((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    return (
        <>
            <div className='flex flex-col h-screen'>
                <NavBarComponent />
                <div className='p-2 background lg:flex lg:justify-center grow'>
                    {/* Final Cart Details */}
                    <div className='flex flex-col my-4 bg-gray-300 p-5 lg:w-1/3'>
                        <Typography variant="h2" className='text-center'>Tu Carrito</Typography>
                        <div className='flex justify-between mt-5'>
                            <div className='flex flex-col'>
                                <Typography variant="lead" >Producto</Typography>
                            </div>
                            <Typography variant="lead" >Subtotal</Typography>
                        </div>
                        {
                            cartProducts.items?.map((item, index) => (

                                <div className='flex justify-between my-2' key={index}>
                                    <div className='flex flex-col'>
                                        <Typography variant="lead" >{item.name}</Typography>
                                        <Typography variant="lead" >Cantidad: {item.quantity}</Typography>
                                    </div>
                                    <Typography variant="lead" >${item.quantity * item.price}</Typography>
                                </div>
                            ))
                        }

                        <div className='flex flex-col justify-between mt-5 grow lg:justify-end'>
                            <div className='flex justify-between'>
                                <Typography variant='lead'>Metodo de Pago:</Typography>
                                {
                                    cartProducts.paymentType == 0 ?

                                        <Typography variant='lead'>Transferencia Bancaria</Typography>

                                        :

                                        <Typography variant='lead'>Mercado Pago</Typography>

                                }
                            </div>

                            <div className='flex justify-between'>
                                <Typography variant='lead'>Total:</Typography>
                                <Typography variant='h5'>$ {cartProducts.total}</Typography>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className='flex flex-col my-4 bg-gray-300 p-5 lg:w-1/3'>
                        <div>
                            <Typography variant="h2" className='text-center'>Informacion de Delivery</Typography>
                            <Typography variant='paragraph' className='text-center mt-5'>A continuacion, provee los detalles para el envio de tu pedido, o selecciona uno previamente guardado!</Typography>
                        </div>

                        {/* Form Container */}
                        <div className='flex flex-col grow'>
                            <Typography variant='paragraph' className='text-center mt-5'>Quien retira el envio?</Typography>
                            <div className='flex flex-col items-center xl:flex-row'>
                                <div className='w-full p-3'>
                                    <Input label='Nombre' className='bg-white' name='name' value={pickup.name} onChange={handlePickupChange} />
                                </div>
                                <div className='w-full p-3'>
                                    <Input label='Apellido' className='bg-white' name='surname' value={pickup.surname} onChange={handlePickupChange} />
                                </div>
                            </div>

                            {/* My Directions Container */}
                            <div className='bg-gray-300 flex flex-col items-center rounded my-3 lg:items-start lg:m-0 grow'>
                                <div>
                                    <Typography variant='h5' className='p-3'>Mis Direcciones</Typography>
                                </div>
                                {/* Saved Directions Container*/}
                                <div className='flex flex-row overflow-x-scroll py-2 w-full px-4'>
                                    <div className='bg-gray-500 rounded p-3 mx-1'>
                                        <Typography className='whitespace-nowrap'>Godoy Cruz</Typography>
                                        <Typography className='whitespace-nowrap'>Las Tortugas</Typography>
                                        <Typography className='whitespace-nowrap'>Calle Falsa 123</Typography>
                                        <Typography className='whitespace-wrap md:whitespace-nowrap'>Pasando el puente, al lado del rotonda</Typography>
                                    </div>
                                    <div className='bg-gray-500 rounded p-3 mx-1'>
                                        <Typography>Department</Typography>
                                        <Typography>Locality</Typography>
                                        <Typography>Street</Typography>
                                    </div>
                                    <div className='bg-gray-500 rounded p-3 mx-1'>
                                        <Typography>Department</Typography>
                                        <Typography>Locality</Typography>
                                        <Typography>Street</Typography>
                                    </div>
                                    <div className='bg-gray-500 rounded p-3 mx-1'>
                                        <Typography>Department</Typography>
                                        <Typography>Locality</Typography>
                                        <Typography>Street</Typography>
                                    </div>
                                    <div className='bg-gray-500 rounded p-3 mx-1'>
                                        <Typography>Department</Typography>
                                        <Typography>Locality</Typography>
                                        <Typography>Street</Typography>
                                    </div>
                                    <div className='bg-gray-500 rounded p-3 mx-1'>
                                        <Typography>Department</Typography>
                                        <Typography>Locality</Typography>
                                        <Typography>Street</Typography>
                                    </div>
                                </div>
                                {/* New Direction Container */}
                                <div className='flex flex-col py-3 w-full px-4 grow'>
                                    <div className='md:flex md:justify-between'>
                                        <div className='py-2 md:w-full md:mr-1'>
                                            <Select label="Departamento" className='bg-white'>
                                                <Option>Material Tailwind HTML</Option>
                                                <Option>Material Tailwind React</Option>
                                                <Option>Material Tailwind Vue</Option>
                                                <Option>Material Tailwind Angular</Option>
                                                <Option>Material Tailwind Svelte</Option>
                                            </Select>
                                        </div>
                                        <div className='py-2 md:w-full md:ml-1'>
                                            <Select label="Localidad" className='bg-white'>
                                                <Option>Material Tailwind HTML</Option>
                                                <Option>Material Tailwind React</Option>
                                                <Option>Material Tailwind Vue</Option>
                                                <Option>Material Tailwind Angular</Option>
                                                <Option>Material Tailwind Svelte</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='py-2'>
                                            <Input className="bg-white" label="Calle" type="text" variant="outlined" size='lg' />
                                        </div>
                                        <div className='py-2'>
                                            <Textarea label="Indicaciones" className='bg-white' variant='outlined' size='md' />
                                        </div>
                                    </div>

                                    <div className='flex justify-center md:flex-col md:items-end grow md:justify-end mt-10'>
                                        <Button className='flex shadow-pop-br md:py-6 md:px-32 rounded-none lg:text-xl' color='pink' variant="gradient">Finalizar Orden</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        </>
    )
}

export default DeliveryDetailsPage;