import React from 'react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import { Button, Input, Typography, Select, Option } from '@material-tailwind/react';
import '../../animations/animista.css';

function AccountPage() {

    return (
        <>
            <NavBarComponent />
            <div className='background'>
                <div className='py-5 mx-5 flex justify-center'>
                    <Typography variant='h1'>Mi Cuenta</Typography>
                </div>
                {/* Main Container */}
                <div className='px-5'>
                    {/* My Data Container */}
                    <div className='bg-gray-300 flex flex-col items-center rounded'>
                        <Typography variant='h5' className='py-3'>Mis Datos</Typography>
                        <div className='py-3 w-64'>
                            <div className='py-2'>
                                <Input className="bg-white" label='Nombre' variant="outlined" size='lg' />
                            </div>
                            <div className='py-2'>

                                <Input className="bg-white " label='Apellido' variant="outlined" size='lg' />
                            </div>
                            <div className='py-2'>
                                <Input className="bg-white " label="Telefono" type="number" variant="outlined" size='lg' />
                            </div>

                            <div className='flex'>
                                <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient">Guardar Datos</Button>
                            </div>
                        </div>
                    </div>

                    {/* My Directions Container */}
                    <div className='bg-gray-300 flex flex-col items-center rounded my-3'>
                        <Typography variant='h5' className='py-3'>Mis Direcciones</Typography>
                        {/* Saved Directions Container*/}
                        <div className='flex flex-row overflow-x-scroll py-2 w-64'>
                            <div className='bg-gray-500 rounded p-3 mx-1'>
                                <Typography className='whitespace-nowrap'>Godoy Cruz</Typography>
                                <Typography className='whitespace-nowrap'>Las Tortugas</Typography>
                                <Typography className='whitespace-nowrap'>Calle Falsa 123</Typography>
                                <Typography className='whitespace-wrap'>Pasando el puente, al lado del rotonda</Typography>
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
                        <div className='py-3 w-64'>
                            <div className='py-2'>
                                <Select label="Departamento" className='bg-white'>
                                    <Option>Material Tailwind HTML</Option>
                                    <Option>Material Tailwind React</Option>
                                    <Option>Material Tailwind Vue</Option>
                                    <Option>Material Tailwind Angular</Option>
                                    <Option>Material Tailwind Svelte</Option>
                                </Select>
                            </div>
                            <div className='py-2'>
                                <Select label="Localidad" className='bg-white whitespace-nowrap'>
                                    <Option>Material Tailwind HTML</Option>
                                    <Option>Material Tailwind React</Option>
                                    <Option>Material Tailwind Vue</Option>
                                    <Option>Material Tailwind Angular</Option>
                                    <Option className='whitespace-nowrap'>Material Tailwind Svelte</Option>
                                </Select>
                            </div>
                            <div className='py-2'>
                                <Input className="bg-white " label="Calle" type="text" variant="outlined" size='lg' />
                            </div>
                            <div className='py-2'>
                                <Input className="bg-white " label="Indicaciones" type="text" variant="outlined" size='lg' />
                            </div>

                            <div className='flex'>
                                <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient">Guardar Nueva Direccion</Button>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-300 flex flex-col items-center rounded mb-5'>
                        <Typography variant='h5' className='py-3'>Mis Ordenes</Typography>

                        <div className='py-2 my-3 w-64 bg-gray-100 rounded mb-2'>
                            <Typography className='text-center'>Orden #318947u91283791379</Typography>
                            <div className='flex justify-between items-center my-2 p-2'>
                                <div>
                                    <Typography variant="small" >Producto</Typography>
                                    <Typography variant="small" >Cantidad: 2</Typography>
                                </div>
                                <Typography variant="small" >$10.40</Typography>

                            </div>
                            <div className='flex justify-between items-center my-2 p-2'>
                                <div>
                                    <Typography variant="small" >Producto</Typography>
                                    <Typography variant="small" >Cantidad: 2</Typography>
                                </div>
                                <Typography variant="small" >$10.40</Typography>

                            </div>
                            <div className='flex flex-col items-center mt-2'>
                                <Typography variant="small">Total: $24.34</Typography>
                                <Typography variant="small">Estado: Completado</Typography>
                            </div>
                        </div>

                        <div className='py-2 my-3 w-64 bg-gray-100 rounded mb-2'>
                            <Typography className='text-center'>Orden #318947u91283791379</Typography>
                            <div className='flex justify-between items-center my-2 p-2'>
                                <div>
                                    <Typography variant="small" >Producto</Typography>
                                    <Typography variant="small" >Cantidad: 2</Typography>
                                </div>
                                <Typography variant="small" >$10.40</Typography>
                            </div>
                            <div className='flex flex-col items-center mt-2'>
                                <Typography variant="small">Total: $24.34</Typography>
                                <Typography variant="small">Estado: Completado</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>

        </>
    )
}

export default AccountPage;