import React from 'react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import { Input, Typography, Select, Option, Textarea, Button } from '@material-tailwind/react';

function DeliveryDetailsPage() {

    return (
        <>
            <div className='h-min-screen'>
                <NavBarComponent />
                <div className='h-full p-2 background lg:flex lg:justify-center'>
                    {/* Final Cart Details */}
                    <div className='flex flex-col my-4 bg-gray-300 p-5'>
                        <Typography variant="h2" className='text-center'>Tu Carrito</Typography>
                        <div className='flex justify-between mt-5'>
                            <div className='flex flex-col'>
                                <Typography variant="lead" >Producto</Typography>
                            </div>
                            <Typography variant="lead" >Subtotal</Typography>
                        </div>
                        <div className='flex justify-between my-2'>
                            <div className='flex flex-col'>
                                <Typography variant="lead" >Fresh fruits and vegetables</Typography>
                                <Typography variant="lead" >Cantidad: 1</Typography>
                            </div>
                            <Typography variant="lead" >$12.32</Typography>
                        </div>
                        <div className='flex justify-between my-2'>
                            <div className='flex flex-col'>
                                <Typography variant="lead" >Fresh fruits and vegetables</Typography>
                                <Typography variant="lead" >Cantidad: 1</Typography>
                            </div>
                            <Typography variant="lead" >$12.32</Typography>
                        </div>
                        <div className='flex justify-between my-2'>
                            <div className='flex flex-col'>
                                <Typography variant="lead" >Fresh fruits and vegetables</Typography>
                                <Typography variant="lead" >Cantidad: 1</Typography>
                            </div>
                            <Typography variant="lead" >$12.32</Typography>
                        </div>
                        <div className='flex justify-between my-2'>
                            <div className='flex flex-col'>
                                <Typography variant="lead" >Fresh fruits and vegetables</Typography>
                                <Typography variant="lead" >Cantidad: 1</Typography>
                            </div>
                            <Typography variant="lead" >$12.32</Typography>
                        </div>
                        <div className='flex flex-col justify-between mt-5 grow lg:justify-end'>
                            <div className='flex justify-between'>
                                <Typography variant='lead'>Metodo de Pago:</Typography>
                                <Typography variant='lead'>Transferencia Bancaria</Typography>
                            </div>

                            <div className='flex justify-between'>
                                <Typography variant='lead'>Total:</Typography>
                                <Typography variant='h5'>$ 1203.21</Typography>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className='flex flex-col my-4 bg-gray-300 p-5 lg:w-1/2'>
                        <Typography variant="h2" className='text-center'>Informacion de Delivery</Typography>
                        <Typography variant='paragraph' className='text-center mt-5'>A continuacion, provee los detalles para el envio de tu pedido, o selecciona uno previamente guardado!</Typography>

                        {/* Form Container */}
                        <div>
                            <Typography variant='paragraph' className='text-center mt-5'>Quien retira el envio?</Typography>
                            <div className='flex flex-col items-center xl:flex-row'>
                                <div className='w-full p-3'>
                                    <Input label='Nombre' className='bg-white' />
                                </div>
                                <div className='w-full p-3'>
                                    <Input label='Apellido' className='bg-white' />
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
                                        <Button className='flex grow justify-center shadow-pop-br' color='pink' variant="gradient">Finalizar Orden</Button>
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