import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'wouter';
import { Input, Typography, Select, Option, Textarea, Button, Checkbox, Radio, Card, List, ListItem, ListItemPrefix, Spinner } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import DataService from '../../service/dataService';
import CartContext from '../../store/CartContext';
import './DeliveryDetails.style.css';

function DeliveryDetailsPage() {

    const cartCTX = useContext(CartContext);
    const [cartProducts, setCartProducts] = useState({});
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [userLogged, setUserLogged] = useState();
    const [currentUser, setCurrentUser] = useState({
        email: '',
        id: 0,
        info_id: 0,
        name: '',
        phone: '',
        surname: ''
    });
    const [addressList, setAddressList] = useState([]);
    const [currentAddress, setCurrentAddress] = useState(-1);
    const [saveAddress, setSaveAddress] = useState(false);
    const [pickup, setPickup] = useState({
        name: '',
        surname: ''
    });
    const [departament, setDepartament] = useState('1');
    const [locality, setLocality] = useState('1');
    const [allDirections, setAllDirections] = useState([]);
    const [currentLocalities, setCurrentLocalities] = useState([]);
    const [newAddress, setNewAddress] = useState({
        street: '',
        indications: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [location, setLocation] = useLocation();
    const dataService = new DataService();

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {

            dataService.checkLoggedUser().then((response) => {
                setUserLogged(response);

            }).catch((e) => {

                setUserLogged(e.response.data.loggedIn);
                localStorage.removeItem('token');
                setLocation('/login');
            })

        } else {
            setLocation('/login');
        }

    }, [])

    useEffect(() => {
        dataService.getUser().then((response) => setCurrentUser(response));
        dataService.getUserDirections().then((response) => setAddressList(response));
        dataService.getDirections().then((response) => setAllDirections(response));

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);

    }, [userLogged])

    useEffect(() => {

        if (currentAddress !== -1) {
            setDeliveryCost(Object.values(allDirections).find((elem) => elem.departament_name === addressList[currentAddress - 1].departament_name).localities.find((loc) => loc.locality_name === addressList[currentAddress - 1].locality_name).delivery_cost)
        } else {
            setDeliveryCost(Object.values(allDirections).find((elem) => elem.departament_name === addressList[departament - 1].departament_name)?.localities?.find((loc) => loc.id === Number(newAddress.locality))?.delivery_cost);
        }

    }, [currentAddress, newAddress])

    useEffect(() => {
        setCurrentLocalities(allDirections.find((obj) => obj.id == departament)?.localities);
    }, [allDirections, departament])

    useEffect(() => {

        const local = JSON.parse(localStorage.getItem('cart'));

        if (local) {
            setCartProducts(local);
            cartCTX.items = local.items;
        } else {
            return;
        }

    }, [cartCTX])

    useEffect(() => {

        if (cartCTX.items.length === 0) {
            setLocation('/store');
        } else {
            return;
        }

    }, [cartCTX.items])

    function handleSaveAddress(e) {
        setSaveAddress(e.target.checked);
    }

    function handlePickupChange(e) {
        const { name, value } = e.target;

        setPickup((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleDepartment(value) {

        setDepartament(value);

        setNewAddress((prevValue) => {
            return {
                ...prevValue,
                ['department']: value
            }
        });
    }

    function handleLocality(value) {

        setLocality(value);

        setNewAddress((prevValue) => {
            return {
                ...prevValue,
                ['locality']: value
            }
        });
    }

    function handleNewAddress(e) {

        const { name, value } = e.target;

        setNewAddress((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleAddressCheck(e) {
        setCurrentAddress(Number(e.target.value));
    }

    function submitOrder(e) {
        e.preventDefault();

        setIsProcessing(true);

        if (currentAddress == -1) {

            // New Address

            if (saveAddress) {
                // Save Address before anything
                dataService.saveNewAddress(departament, locality, newAddress, currentUser.info_id).then((response) => {


                    if (cartProducts.paymentType === 1) {

                        dataService.postOrder(pickup, response.id, cartProducts, currentUser.info_id).then((response) => {
                            setLocation('/order');
                        });

                    } else {

                        dataService.postMPOrder(pickup, response.id, cartProducts, currentUser.info_id).then((response) => {
                            window.location.href = response.mp.init_point;
                        })
                    }
                })

            } else {

                // Using temporary address
                if (cartProducts.paymentType === 1) {

                    dataService.postOrder(pickup, newAddress, cartProducts, currentUser.info_id).then((response) => {
                        setLocation('/order');
                    });

                } else {

                    dataService.postMPOrder(pickup, newAddress, cartProducts, currentUser.info_id).then((response) => {
                        window.location.href = response.mp.init_point;
                    })
                }
            }

        } else {

            // Saved Address
            if (cartProducts.paymentType === 1) {

                dataService.postOrder(pickup, currentAddress, cartProducts, currentUser.info_id).then((response) => {
                    setLocation('/order');
                });

            } else {

                dataService.postMPOrder(pickup, currentAddress, cartProducts, currentUser.info_id).then((response) => {
                    window.location.href = response.mp.init_point;
                })
            }
        }
    }

    return (
        <>
            <div className='flex flex-col h-screen'>
                <NavBarComponent />
                {
                    isLoading ?

                        <div className='flex flex-col justify-center items-center p-5 grow'>
                            <Spinner className='h-16 w-16 text-gray-900/50' />
                        </div>

                        :

                        <div className='p-2 background lg:flex lg:justify-center grow'>
                            {/* Final Cart Details */}
                            <div className='flex flex-col my-4 bg-gray-300 p-5 lg:w-1/2'>
                                <Typography variant="h2" className='text-center'>Tu Carrito</Typography>
                                <div className='flex justify-between mt-5'>
                                    <div className='flex flex-col'>
                                        <Typography variant="lead" >Producto</Typography>
                                    </div>
                                    <Typography variant="lead" >Costo por Producto</Typography>
                                </div>
                                {
                                    cartProducts.items?.map((item, index) => (

                                        <div className='flex justify-between my-2' key={index}>
                                            <div className='flex flex-col'>
                                                <Typography variant="lead" >{item.title}</Typography>
                                                <Typography variant="lead" >Cantidad: {item.quantity}</Typography>
                                            </div>
                                            <Typography variant="lead" >${item.quantity * item.unit_price}</Typography>
                                        </div>
                                    ))
                                }

                                <div className='flex flex-col justify-between mt-5 grow lg:justify-end'>
                                    <div className='flex justify-between'>
                                        <Typography variant='lead'>Metodo de Pago:</Typography>
                                        {
                                            cartProducts.paymentType === 1 ?

                                                <Typography variant='lead'>Transferencia Bancaria</Typography>

                                                :

                                                <Typography variant='lead'>Mercado Pago</Typography>

                                        }
                                    </div>

                                    <div className='flex justify-between'>
                                        <Typography variant='lead'>Subtotal:</Typography>
                                        {
                                            cartProducts.paymentType === 1 ?

                                                <div className='flex'>
                                                    <Typography className='mr-2 line-through' variant='h5'>$ {cartProducts.total}</Typography>
                                                    <Typography className='ml-2' variant='h5'>$ {cartProducts.total - (cartProducts.total * 5 / 100)}</Typography>
                                                </div>

                                                :

                                                <Typography variant='h5'>$ {cartProducts.total}</Typography>
                                        }
                                    </div>

                                    <div className='flex justify-between'>
                                        <Typography variant='lead'>Costo de Envio:</Typography>
                                        {
                                            deliveryCost === 0 ?

                                                <Typography variant='lead'>TBD</Typography>

                                                :

                                                <Typography variant='lead'>$ {deliveryCost}</Typography>

                                        }
                                    </div>

                                    <div className='flex justify-between'>
                                        <Typography variant='lead'>Total:</Typography>
                                        {
                                            cartProducts.paymentType === 1 ?

                                                <div className='flex'>
                                                    <Typography className='ml-2' variant='h5'>$ {(cartProducts.total - (cartProducts.total * 5 / 100) + deliveryCost)}</Typography>
                                                </div>

                                                :

                                                <Typography variant='h5'>$ {cartProducts.total + deliveryCost}</Typography>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Details */}
                            <div className='flex flex-col my-4 bg-gray-300 p-5 lg:w-1/2'>
                                <div>
                                    <Typography variant="h2" className='text-center'>Informacion de Delivery</Typography>
                                    <Typography variant='paragraph' className='text-center mt-5'>A continuacion, provee los detalles para el envio de tu pedido, o selecciona uno previamente guardado!</Typography>
                                </div>

                                {/* Form Container */}
                                <form className='flex flex-col grow' onSubmit={submitOrder}>
                                    <Typography variant='paragraph' className='text-center mt-5'>Quien retira el envio?</Typography>
                                    <div className='flex flex-col items-center xl:flex-row'>
                                        <div className='w-full p-3'>
                                            <Input label='Nombre' className='bg-white' name='name' value={pickup.name} onChange={handlePickupChange} required />
                                        </div>
                                        <div className='w-full p-3'>
                                            <Input label='Apellido' className='bg-white' name='surname' value={pickup.surname} onChange={handlePickupChange} required />
                                        </div>
                                    </div>

                                    {/* My Directions Container */}
                                    <div className='bg-gray-300 flex flex-col items-center rounded my-3 lg:items-start lg:m-0 grow'>
                                        <div>
                                            <Typography variant='h5' className='p-3'>Mis Direcciones</Typography>
                                        </div>
                                        {/* Saved Directions Container*/}
                                        <div className='flex flex-row my-5 w-full lg:px-4'>
                                            <Card className="flex w-full lg:w-auto">
                                                <List className="flex flex-col lg:flex-wrap lg:flex-row lg:gap-0">
                                                    <ListItem className='flex p-0 lg:w-1/2'>
                                                        <label
                                                            htmlFor="address"
                                                            className="flex w-full cursor-pointer items-center lg:grow h-full"
                                                        >
                                                            <ListItemPrefix className="flex m-0 grow fill-space h-full">
                                                                <Radio
                                                                    name="address"
                                                                    ripple={false}
                                                                    defaultChecked
                                                                    className="hover:before:opacity-0"
                                                                    containerProps={{
                                                                        className: "flex",
                                                                    }}
                                                                    label={
                                                                        <Typography
                                                                            color="blue-gray"
                                                                            className="font-medium text-blue-gray-400 grow lg:self-center"
                                                                        >
                                                                            Nueva Dirección
                                                                        </Typography>
                                                                    }
                                                                    labelProps={{
                                                                        className: 'flex grow h-full p-5'
                                                                    }}
                                                                    onChange={handleAddressCheck}
                                                                    value={-1}
                                                                />
                                                            </ListItemPrefix>
                                                        </label>
                                                    </ListItem>
                                                    {
                                                        addressList.map((add, index) => (

                                                            <ListItem key={index} className='flex p-0 lg:w-1/2'>
                                                                <label
                                                                    htmlFor="address"
                                                                    className="flex w-full cursor-pointer items-center lg:grow h-full"
                                                                >
                                                                    <ListItemPrefix className="flex m-0 grow fill-space h-full">
                                                                        <Radio
                                                                            name="address"
                                                                            ripple={false}
                                                                            className="hover:before:opacity-0"
                                                                            containerProps={{
                                                                                className: "flex",
                                                                            }}
                                                                            label={
                                                                                <div className='flex flex-col justify-center h-full'>
                                                                                    <Typography
                                                                                        color="blue-gray"
                                                                                        className="font-medium text-blue-gray-400"
                                                                                    >
                                                                                        {add.street}
                                                                                    </Typography>
                                                                                    <Typography
                                                                                        color="blue-gray"
                                                                                        className="font-medium text-blue-gray-400"
                                                                                    >
                                                                                        {add.locality_name}
                                                                                    </Typography>
                                                                                    <Typography
                                                                                        color="blue-gray"
                                                                                        className="font-medium text-blue-gray-400"
                                                                                    >
                                                                                        {add.departament_name}
                                                                                    </Typography>
                                                                                    {
                                                                                        add.indications ?

                                                                                            <Typography
                                                                                                color="blue-gray"
                                                                                                className="font-medium text-blue-gray-400"
                                                                                            >
                                                                                                {add.indications}
                                                                                            </Typography>
                                                                                            :

                                                                                            null
                                                                                    }
                                                                                </div>
                                                                            }
                                                                            labelProps={{
                                                                                className: 'flex grow h-full p-5'
                                                                            }}
                                                                            onChange={handleAddressCheck}
                                                                            value={add.id}
                                                                        />
                                                                    </ListItemPrefix>
                                                                </label>
                                                            </ListItem>
                                                        ))
                                                    }
                                                </List>
                                            </Card>
                                        </div>
                                        {/* New Direction Container */}

                                        {
                                            currentAddress == -1 ?

                                                <div className='flex flex-col py-3 w-full px-4 grow'>
                                                    <div className='md:flex md:justify-between'>
                                                        <div className='py-2 md:w-full md:mr-1'>
                                                            <Select label="Departamento" className='bg-white' value={String(departament)} onChange={handleDepartment}>
                                                                {
                                                                    allDirections?.map((item, index) => (
                                                                        <Option value={String(item.id)} key={index}>{item.departament_name}</Option>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </div>
                                                        <div className='py-2 md:w-full md:ml-1'>
                                                            {
                                                                currentLocalities ?

                                                                    <Select label="Localidad" className='bg-white' value={String(locality)} onChange={handleLocality}>
                                                                        {

                                                                            currentLocalities?.map((loc, index) => (
                                                                                <Option value={String(loc.id)} key={index}>{loc.locality_name}</Option>
                                                                            ))
                                                                        }
                                                                    </Select>

                                                                    :

                                                                    null
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='py-2'>
                                                            <Input className="bg-white" label="Calle" type="text" variant="outlined" size='lg' name='street' value={newAddress.street} onChange={handleNewAddress} required />
                                                        </div>
                                                        <div className='py-2'>
                                                            <Textarea label="Indicaciones" className='bg-white' variant='outlined' size='md' name='indications' value={newAddress.indications} onChange={handleNewAddress} />
                                                        </div>
                                                    </div>

                                                    <div className='flex flex-col justify-center items-center md:flex-col md:items-center grow md:justify-end mt-5'>
                                                        <Checkbox label="Guardar direccion?" name="address" color='pink' value={saveAddress} checked={saveAddress} onChange={handleSaveAddress} />
                                                    </div>
                                                </div>

                                                :

                                                null
                                        }

                                    </div>
                                    <div className='flex flex-col justify-center items-center md:flex-col md:items-center grow md:justify-end'>
                                        {
                                            isProcessing ?

                                                <Button className='flex items-center md:py-6 md:px-32 lg:px-[7.5rem] rounded-none lg:text-lg' color='pink' variant="gradient" disabled>
                                                    <Spinner className='mr-1 h-5' color='blue' />
                                                    <span>Finalizando...</span>
                                                </Button>

                                                :

                                                <Button className='flex shadow-pop-br md:py-6 md:px-32 lg:px-1/2 rounded-none lg:text-lg' color='pink' variant="gradient" type='submit'>Finalizar Orden</Button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                }
                <FooterComponent />
            </div>
        </>
    )
}

export default DeliveryDetailsPage;