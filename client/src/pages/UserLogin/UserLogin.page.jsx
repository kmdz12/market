import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Typography, Card, Input, Button, Spinner, Alert } from '@material-tailwind/react';
import DataService from '../../service/dataService';
import './UserLogin.style.css';

function UserLoginPage() {

    const [location, setLocation] = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

    function handleLogin(e) {
        e.preventDefault();

        setIsLoading(true);

        if (email.match("([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?") && password.match("[0-9a-zA-Z]{8,}")) {

            dataService.userLogin(email, password).then((response) => {

                if (response.code === 200) {
                    setAlertStatus({ code: 200, message: response.message, show: true })
                    localStorage.setItem('token', response.token)

                    setTimeout(() => {
                        setAlertStatus((prevValue) => ({
                            ...prevValue,
                            show: false
                        }))
                        setLocation("/store")

                    }, 4000);

                } else if (response.code !== 200) {
                    setAlertStatus({ code: response.code, message: response.message, show: true })

                    setTimeout(() => {
                        setAlertStatus((prevValue) => ({
                            ...prevValue,
                            show: false
                        }))
                        setIsLoading(false);
                    }, 4000);
                }
            })
        }

    }

    return (
        <div>
            {/* Background Image Container */}
            <div className="w-screem h-screen login bg-auto bg-no-repeat bg-center absolute inset-0 blur-sm lg:bg-cover"></div>
            <Alert className="flex justify-center rounded-none" variant="gradient" color={alertStatus.code === 200 ? "green" : "red"} open={alertStatus.show} animate={{ mount: { y: 0 }, unmount: { y: -100 } }}>{alertStatus.message}</Alert>
            {/* Form Container */}
            <div className="absolute inset-0">
                <div className="h-full w-full flex justify-center items-center">
                    <div className='h-1/2 w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4'>
                        <div className='bg-gray-300 flex justify-center items-center rounded'>
                            <Card color="transparent" shadow={false}>
                                <Typography variant="h4" color="blue-gray" className='text-center text-base my-5'>
                                    Bienvenido!
                                </Typography>
                                <form className="my-5 mx-3 max-w-screen-lg" onSubmit={handleLogin}>
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
                                            placeholder="Ingresa tu contraseña"
                                            onChange={handlePassword}
                                            required
                                            pattern="[0-9a-zA-Z]{8,}"
                                        />
                                    </div>
                                    {
                                        isLoading ?

                                            <Button className="mt-6 flex items-center justify-center" disabled fullWidth color="pink" type='submit' children={

                                                <Spinner className="h-4 w-4" color="blue" />
                                            }>
                                            </Button>

                                            :

                                            <Button className="mt-6" fullWidth color="pink" type='submit'>
                                                Iniciar Sesion!
                                            </Button>

                                    }
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