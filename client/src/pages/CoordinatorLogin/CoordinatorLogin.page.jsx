import React from 'react';
import { Typography, Card, Input, Button } from '@material-tailwind/react';

function CoordinatorLoginPage() {

    return (

        <div>
            {/* Background Image Container */}
            <div className="background w-screem h-screen absolute inset-0"></div>
            {/* Form Container */}
            <div className="absolute inset-0">
                <div className="h-full w-full flex justify-center items-center">
                    <div className='h-1/2 w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4'>
                        <div className='bg-gray-100 flex justify-center items-center rounded'>
                            <Card color="transparent" shadow={false} className='md: w-full'>
                                <div className="flex my-4 justify-center">
                                    <img className="h-24 w-24 rounded-full object-cover object-center" src="https://placehold.co/400" alt="logo" />
                                </div>
                                <Typography variant="h4" color="blue-gray" className='text-center text-base my-5'>
                                    Kilometro 12 - Administracion
                                </Typography>
                                <form className="my-5 mx-3 max-w-screen-lg">
                                    <div className="mb-1 flex flex-col gap-6">
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Email
                                        </Typography>
                                        <Input
                                            className="w-full"
                                            variant="standard"
                                            color="pink"
                                            size="lg"
                                            placeholder="nombre@email.com"
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Contraseña
                                        </Typography>
                                        <Input
                                            type="password"
                                            variant="standard"
                                            color="pink"
                                            size="lg"
                                            placeholder="********"
                                        />
                                    </div>
                                    <Button className="mt-6" fullWidth color="pink">
                                        Iniciar Sesion
                                    </Button>

                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoordinatorLoginPage;