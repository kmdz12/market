import React from 'react';
import { Link } from 'wouter';
import { Typography, Card, Input, Button } from '@material-tailwind/react';

function UserLoginPage() {

    return (
        <div>
            {/* Background Image Container */}
            <div className="w-screem h-screen bg-[url('./images/login.jpg')] bg-auto bg-no-repeat bg-center absolute inset-0 blur-sm"></div>
            {/* Form Container */}
            <div className="absolute inset-0">
                <div className="h-full w-full flex justify-center items-center">
                    <div className='h-1/2 w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4'>
                        <div className='bg-gray-300 flex justify-center items-center rounded'>
                            <Card color="transparent" shadow={false}>
                                <Typography variant="h4" color="blue-gray" className='text-center text-base my-5'>
                                    Bienvenido!
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
                                            placeholder="Ingresa tu correo"
                                        />
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Contraseña
                                        </Typography>
                                        <Input
                                            type="password"
                                            variant="standard"
                                            color="pink"
                                            size="lg"
                                            placeholder="Ingresa tu contraseña"
                                        />
                                    </div>
                                    <Button className="mt-6" fullWidth color="pink">
                                        Iniciar Sesion!
                                    </Button>
                                    <Typography color="gray" className="mt-4 text-center font-normal">
                                        No tenes una cuenta?{" "}
                                        <Link href="/login">
                                            <Typography as={'a'} className="font-medium text-blue-900 inline-block">
                                                Registrate!
                                            </Typography>
                                        </Link>
                                    </Typography>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLoginPage;