import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button, Input, Typography, Select, Option, Textarea } from '@material-tailwind/react';
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
    const [location, setLocation] = useLocation();
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
    }, [userLogged])

    // useEffect(() => {
    // console.log(userLogged)
    // console.log(currentUser)
    // }, [setCurrentUser])

    function handleDataChange(e) {
        const { name, value } = e.target;

        setCurrentUser((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleUserDataSubmit(e) {
        e.preventDefault();

        if (Object.values([currentUser.name, currentUser.surname, currentUser.phone]).some(o => o == '' || o == null)) {
            alert('Por favor completa el formulario antes de Guardar!')
        } else {
            dataService.saveUserData(currentUser.name, currentUser.surname, currentUser.phone);
        }
    }

    return (
        <>
            <NavBarComponent />
            <div className='background py-5'>
                <div className='py-5 mx-5 flex justify-center'>
                    <Typography variant='h1'>Mi Cuenta</Typography>
                </div>
                {/* Main Container */}
                <div className='px-5 lg:flex'>
                    {/* My Data Container */}
                    <div className='lg:w-1/2'>

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
                                        <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient" type='submit'>Guardar Datos</Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* My Directions Container */}
                        <div className='bg-gray-300 flex flex-col items-center rounded my-3 lg:items-start lg:m-0'>
                            <Typography variant='h5' className='p-3'>Mis Direcciones</Typography>
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
                            <div className='py-3 w-full px-4'>
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

                                <div className='flex md:flex-col md:items-center'>
                                    <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient">Guardar Nueva Direccion</Button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='bg-gray-300 flex flex-col items-center rounded mb-5 px-4 lg:items-start lg:w-1/2 lg:m-0'>
                        <Typography variant='h5' className='py-3'>Mis Ordenes</Typography>

                        <div className='py-2 w-full bg-gray-100 rounded mb-5'>
                            <Typography className='text-center'>Orden #318947u91283791379</Typography>

                            <div className='flex flex-row justify-between my-2 p-2'>
                                <div className='flex flex-col md:flex-row md:grow md:justify-between'>
                                    <Typography variant="small">Producto</Typography>
                                    <div className='md:flex md:grow md:justify-center'>
                                        <Typography variant="small">Cantidad: 2</Typography>
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="small">$10.40</Typography>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between my-2 p-2'>
                                <div className='flex flex-col md:flex-row md:grow md:justify-between'>
                                    <Typography variant="small">Producto</Typography>
                                    <div className='md:flex md:grow md:justify-center'>
                                        <Typography variant="small">Cantidad: 2</Typography>
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="small">$10.40</Typography>
                                </div>
                            </div>

                            <div className='flex flex-col items-center mt-2 md:flex-row-reverse md:justify-between md:p-2'>
                                <Typography variant="small">Total: $24.34</Typography>
                                <Typography variant="small">Estado: Completado</Typography>
                            </div>
                        </div>

                        <div className='py-2 w-full bg-gray-100 rounded mb-5'>
                            <Typography className='text-center'>Orden #318947u91283791379</Typography>

                            <div className='flex flex-row justify-between my-2 p-2'>
                                <div className='flex flex-col md:flex-row md:grow md:justify-between'>
                                    <Typography variant="small">Producto</Typography>
                                    <div className='md:flex md:grow md:justify-center'>
                                        <Typography variant="small">Cantidad: 2</Typography>
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="small">$10.40</Typography>
                                </div>
                            </div>

                            <div className='flex flex-col items-center mt-2 md:flex-row-reverse md:justify-between md:p-2'>
                                <Typography variant="small">Total: $24.34</Typography>
                                <Typography variant="small">Estado: Completado</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />

        </>
    )
}

export default AccountPage;