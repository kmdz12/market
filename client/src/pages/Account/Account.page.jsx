import React from 'react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import { Button, Input, Typography, Select, Option, Textarea } from '@material-tailwind/react';
import '../../animations/animista.css';

function AccountPage() {

    return (
        <>
            <NavBarComponent />
            <div className='background py-5'>
                <div className='py-5 mx-5 flex justify-center'>
                    <Typography variant='h1'>Mi Cuenta</Typography>
                </div>
                {/* Main Container */}
                <div className='px-5'>
                    {/* My Data Container */}
                    <div className='bg-gray-300 flex flex-col items-center rounded'>
                        <Typography variant='h5' className='py-3'>Mis Datos</Typography>
                        <div className='w-full py-3 px-4'>
                            <div className='md:flex justify-between'>
                                <div className='py-2'>
                                    <Input className="bg-white" label='Nombre' variant="outlined" size='lg' />
                                </div>
                                <div className='py-2'>

                                    <Input className="bg-white" label='Apellido' variant="outlined" size='lg' />
                                </div>
                                <div className='py-2'>
                                    <Input className="bg-white" label="Telefono" type="number" variant="outlined" size='lg' />
                                </div>
                            </div>

                            <div className='flex md:flex-col md:items-center md:py-2'>
                                <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient">Guardar Datos</Button>
                            </div>
                        </div>
                    </div>

                    {/* My Directions Container */}
                    <div className='bg-gray-300 flex flex-col items-center rounded my-3'>
                        <Typography variant='h5' className='py-3'>Mis Direcciones</Typography>
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

                    <div className='bg-gray-300 flex flex-col items-center rounded mb-5 px-4'>
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