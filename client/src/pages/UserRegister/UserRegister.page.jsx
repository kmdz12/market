import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Typography, Card, Input, Button, Alert } from '@material-tailwind/react';
import DataService from '../../service/dataService';
import './UserRegister.style.css';

function UserRegisterPage() {

    const [location, setLocation] = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertStatus, setAlertStatus] = useState({
        code: 0,
        message: '',
        show: false
    })

    const dataService = new DataService();

    function handleEmail(e) {
        const { value } = e.target;
        setEmail(value);
    }

    function handlePassword(e) {
        const { value } = e.target;
        setPassword(value);
    }

    function handleRegister(e) {
        e.preventDefault();

        if (email.match("([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?") && password.match("[0-9a-zA-Z]{8,}")) {

            dataService.userRegistration(email, password).then((response) => {
                if (response.code === 200) {
                    setAlertStatus({ code: 200, message: 'Registro Completado, ahora te redigiremos para loguearte!', show: true })

                    setTimeout(() => {
                        setAlertStatus((prevValue) => ({
                            ...prevValue,
                            show: false
                        }))
                        setLocation("/login")
                    }, 5000);

                } else if (response.code === 302) {
                    setAlertStatus({ code: 302, message: 'Este correo ya esta en uso!', show: true })

                    setTimeout(() => {
                        setAlertStatus((prevValue) => ({
                            ...prevValue,
                            show: false
                        }))
                    }, 5000);
                }
            })
        }
    }

    return (
        <div>
            {/* Background Image Container */}
            <div className="w-screem h-screen register bg-auto bg-no-repeat bg-center absolute inset-0 blur-sm"></div>
            {
                alertStatus.show ?

                    <div>
                        <Alert className="flex justify-center" variant="gradient" color={alertStatus.code === 200 ? "green" : "red"} open={alertStatus.show} animate={{ mount: { y: 0 }, unmount: { y: -100 } }}>{alertStatus.message}</Alert>
                    </div>
                    :
                    null
            }
            {/* Form Container */}
            <div className="absolute inset-0">
                <div className="h-full w-full flex justify-center items-center">
                    <div className='h-1/2 w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4'>
                        <div className='bg-gray-300 flex justify-center items-center rounded'>
                            <Card color="transparent" shadow={false}>
                                <Typography variant="h4" color="blue-gray" className='text-center text-base my-5'>
                                    Registrate, es gratis!
                                </Typography>
                                <form className="my-5 mx-3 max-w-screen-lg" onSubmit={handleRegister}>
                                    <div className="mb-1 flex flex-col gap-6">
                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                            Tu email
                                        </Typography>
                                        <Input
                                            variant="standard"
                                            color="pink"
                                            size="lg"
                                            placeholder="nombre@email.com"
                                            onChange={handleEmail}
                                            type='email'
                                            required
                                            pattern="([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?"
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
                                            onChange={handlePassword}
                                            required
                                            pattern="[0-9a-zA-Z]{8,}"
                                        />
                                        <Typography variant="small" className="text-center">Contraseña debe tener minimo 8 caracteres</Typography>
                                    </div>
                                    <Button className="mt-6" fullWidth color="pink" type='submit'>
                                        Registrame!
                                    </Button>
                                    <Typography color="gray" className="mt-4 text-center font-normal">
                                        Ya tenes una cuenta?{" "}
                                        <Link href="/login">
                                            <Typography as={'a'} className="font-medium text-blue-900 inline-block">
                                                Inicia Sesion
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

export default UserRegisterPage;