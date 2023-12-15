import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Alert, Spinner, Button, Input, Typography, Select, Option, Textarea } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import DataService from '../../service/dataService';
import '../../animations/animista.css';

function AccountPage() {

    const [userLogged, setUserLogged] = useState();
    const [currentUser, setCurrentUser] = useState({
        email: '',
        id: 0,
        info_id: 0,
        name: '',
        phone: '',
        surname: ''
    });
    const [allUserDirections, setAllUserDirections] = useState([]);
    const [allUserOrders, setAllUserOrders] = useState([]);
    const [allDirections, setAllDirections] = useState([]);
    const [currentLocalities, setCurrentLocalities] = useState([]);
    const [departament, setDepartament] = useState('1');
    const [locality, setLocality] = useState('1');
    const [newAddress, setNewAddress] = useState({
        street: '',
        indications: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({
        message: '',
        show: false
    });
    const [location, setLocation] = useLocation();
    const dataService = new DataService();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {

            dataService.checkLoggedUser().then((response) => {
                setUserLogged(response)

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
        dataService.getUserDirections().then((response) => setAllUserDirections(response));
        dataService.getUserOrders().then((response) => setAllUserOrders(response));

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);

    }, [userLogged])

    useEffect(() => {
        dataService.getDirections().then((response) => setAllDirections(response));
    }, [])

    useEffect(() => {
        setCurrentLocalities(allDirections.find((obj) => obj.id == departament)?.localities);
    }, [allDirections, departament])

    function handleDataChange(e) {
        const { name, value } = e.target;

        setCurrentUser((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleDepartament(value) {
        setDepartament(value);
    }

    function handleLocality(value) {
        setLocality(value);
    }

    function handleNewAddressChange(e) {
        const { name, value } = e.target;

        setNewAddress((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleUserDataSubmit(e) {
        e.preventDefault();

        if (Object.values([currentUser.name, currentUser.surname, currentUser.phone]).some(o => o == '' || o == null)) {
            alert('Por favor completa el formulario antes de Guardar!');

        } else {

            setIsLoading(true);

            dataService.saveUserData(currentUser.name, currentUser.surname, currentUser.phone).then((response) => {
                setAlert({
                    message: response.message,
                    show: true
                });

                setTimeout(() => {

                    setAlert((prevValue) => ({
                        ...prevValue,
                        show: false
                    }));

                    setIsLoading(false);

                }, 3000);

            });
        }
    }

    function handleNewAddressDataSubmit(e) {
        e.preventDefault();

        if (Object.values([departament, locality, newAddress.street]).some(o => o == '' || o == null)) {
            alert('Por favor completa el formulario antes de Guardar!')

        } else {

            setIsLoading(true);

            dataService.saveNewAddress(departament, locality, newAddress, currentUser.info_id).then((response) => {

                setAlert({
                    message: response.message,
                    show: true
                });

                setTimeout(() => {

                    setAlert((prevValue) => ({
                        ...prevValue,
                        show: false
                    }));

                    setIsLoading(false);

                }, 3000);

            });

            dataService.getUserDirections().then((response) => setAllUserDirections(response));

            setNewAddress({
                street: '',
                indications: ''
            });
        }
    }

    return (
        <>
            <div className='h-screen'>
                <NavBarComponent />
                {
                    isLoading ?

                        <div className='flex flex-col justify-center items-center p-5 grow'>
                            <Spinner className='h-16 w-16 text-gray-900/50' />
                        </div>

                        :

                        <div className='background flex flex-col justify-center'>
                            <Alert className="flex justify-center absolute top-32 rounded-none" variant="gradient" color="amber" open={alert.show} animate={{ mount: { y: 0 }, unmount: { y: -100 } }}>{alert.message}</Alert>
                            <div className='py-5 mx-5 flex justify-center'>
                                <Typography variant='h1'>Mi Cuenta</Typography>
                            </div>
                            {/* Main Container */}
                            <div className='p-5 lg:flex'>
                                {/* My Data Container */}
                                <div className='lg:w-1/2 lg:flex lg:flex-col'>

                                    <div className='bg-gray-300 flex flex-col items-center rounded lg:items-start'>
                                        <Typography variant='h5' className='p-3'>Mis Datos</Typography>
                                        <div className='w-full py-3 px-4 lg:p-0'>
                                            <form onSubmit={handleUserDataSubmit}>
                                                <div className='md:flex justify-between lg:flex-col xl:flex-row'>
                                                    <div className='p-2 xl:w-full'>
                                                        <Input className="bg-white" label='Nombre' variant="outlined" size='lg' name='name' value={currentUser?.name ?? ''} onChange={handleDataChange} required />
                                                    </div>
                                                    <div className='p-2 xl:w-full'>
                                                        <Input className="bg-white" label='Apellido' variant="outlined" size='lg' name='surname' value={currentUser?.surname ?? ''} onChange={handleDataChange} required />
                                                    </div>
                                                    <div className='p-2 xl:w-full'>
                                                        <Input className="bg-white" label="Telefono" type="number" variant="outlined" size='lg' name='phone' value={currentUser?.phone ?? ''} onChange={handleDataChange} required />
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:items-center md:py-2'>
                                                    {
                                                        isLoading ?

                                                            <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient" type='submit'>
                                                                <Spinner className="h-4 w-4" color="blue" />
                                                            </Button>

                                                            :

                                                            <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient" type='submit'>Guardar Datos</Button>
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    {/* My Directions Container */}
                                    <div className='bg-gray-300 flex flex-col items-center rounded my-3 lg:items-start lg:m-0'>
                                        <Typography variant='h5' className='p-3'>Mis Direcciones</Typography>
                                        {/* Saved Directions Container*/}
                                        <div className='flex flex-row overflow-x-scroll py-2 w-full px-4 md:flex-col md:overflow-y-scroll'>
                                            {
                                                allUserDirections.map((dir, index) => (

                                                    <div key={index} className='bg-gray-500 rounded p-3 mx-1 md:my-2'>
                                                        <Typography className='whitespace-nowrap'>{dir.departament_name}</Typography>
                                                        <Typography className='whitespace-nowrap'>{dir.locality_name}</Typography>
                                                        <Typography className='whitespace-nowrap'>{dir.street}</Typography>
                                                        {
                                                            dir.indications ?

                                                                <Typography className='whitespace-wrap md:whitespace-nowrap'>{dir.indications}</Typography>

                                                                :

                                                                null
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {/* New Direction Container */}
                                        <div className='py-3 w-full px-4'>
                                            <Typography variant='h5' className='py-3'>Nueva Dirección</Typography>

                                            <form onSubmit={handleNewAddressDataSubmit}>

                                                <div className='md:flex md:justify-between'>
                                                    <div className='py-2 md:w-full md:mr-1'>
                                                        <Select label="Departamento" className='bg-white' value={departament} onChange={handleDepartament}>
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

                                                                <Select label="Localidad" className='bg-white' value={locality} onChange={handleLocality}>
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
                                                        <Input className="bg-white" label="Calle" type="text" variant="outlined" size='lg' name="street" value={newAddress.street} onChange={handleNewAddressChange} required />
                                                    </div>
                                                    <div className='py-2'>
                                                        <Textarea label="Indicaciones" className='bg-white' variant='outlined' size='md' name='indications' value={newAddress.indications} onChange={handleNewAddressChange} />
                                                    </div>
                                                </div>

                                                <div className='flex md:flex-col md:items-center'>
                                                    {
                                                        isLoading ?

                                                            <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient" type='submit'>
                                                                <Spinner className="h-4 w-4" color="blue" />
                                                            </Button>

                                                            :

                                                            <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient" type='submit'>Guardar Nueva Direccion</Button>

                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>


                                <div className='bg-gray-300 flex flex-col items-center rounded mb-5 px-4 lg:items-start lg:w-1/2 lg:m-0'>
                                    <Typography variant='h5' className='py-3'>Mis Ordenes</Typography>

                                    {
                                        allUserOrders.map((order, index) => {

                                            return (

                                                <div key={index} className='py-2 w-full bg-gray-100 rounded mb-5'>
                                                    <Typography className='text-center'>Orden #{order.order_number}</Typography>

                                                    {
                                                        order.cart?.items?.map((item, index) => {

                                                            return (
                                                                <div key={index} className='flex flex-row justify-between my-2 p-2 md:items-center'>
                                                                    <div className='flex flex-col md:justify-center'>
                                                                        <Typography variant="small">{item.title}</Typography>
                                                                        <div className='md:flex md:flex-col md:grow'>
                                                                            <Typography variant="small">Cantidad: {item.quantity}</Typography>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Typography variant="small">${item.quantity * item.unit_price}</Typography>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                    <div className='flex flex-col items-center mt-2 md:flex-row-reverse md:justify-between md:p-2'>
                                                        <Typography variant="small">Total: ${order.cart.total}</Typography>
                                                        {
                                                            order.status === 'Rechazada' ?

                                                                <div>
                                                                    <Typography variant="small">Estado: {order.status}</Typography>
                                                                    <Typography variant="small">Razón: {order.reason}</Typography>
                                                                </div>

                                                                :

                                                                <Typography variant="small">Estado: {order.status}</Typography>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                }
                <FooterComponent />
            </div>
        </>
    )
}

export default AccountPage;