import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Navbar, Typography, Button, IconButton, Collapse } from "@material-tailwind/react";
import DataService from '../../service/dataService';
import '../../animations/animista.css';

function NavBarComponent() {

    const [openNav, setOpenNav] = React.useState(false);
    const toggleOpen = () => setOpenNav((cur) => !cur);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [location, setLocation] = useLocation();
    const dataService = new DataService();

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');

            dataService.checkUserStatus(token).then((response) => {

                if (response.auth === false) {
                    localStorage.removeItem('token');
                    setLocation('/')
                } else {
                    setUserLoggedIn(response.auth)
                }
            })
        }

    }, [])

    function handleLogout() {
        localStorage.removeItem('token');
        setUserLoggedIn(false);
    }

    const nonUserNavList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 items-center lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/store'>
                    Tienda
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/cart'>
                    Carrito
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/faq'>
                    FAQ
                </Link>
            </Typography>
        </ul>
    );

    const userNavList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 items-center lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/store'>
                    Tienda
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/cart'>
                    Carrito
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/faq'>
                    FAQ
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/account'>
                    Mi Cuenta
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                onClick={handleLogout}
            >
                <Link to='/'>
                    Salir
                </Link>
            </Typography>
        </ul>
    );

    return (

        <div className="sticky top-0 z-10 max-h-[768px] w-[calc(100%)] overflow-none">
            <Navbar className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <img
                        className="h-24 w-24 rounded-full object-cover object-center"
                        src="https://placehold.co/400"
                        alt="logo"
                    />
                    <div className="flex items-center gap-4">
                        {
                            userLoggedIn !== true ?

                                <div className="flex items-center gap-x-5">
                                    <div className="mr-4 hidden lg:block">{nonUserNavList}</div>
                                    <Link href="/register">
                                        <Button
                                            variant="filled"
                                            size="md"
                                            className="hidden lg:inline-block rounded-none border-2 border-black shadow-pop-br"
                                            style={{ backgroundColor: "#FF5FAA" }}
                                        >
                                            <span className="text-black">Registrate</span>
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button
                                            variant="filled"
                                            size="md"
                                            className="hidden lg:inline-block rounded-none border-2 border-black shadow-pop-br"
                                            style={{ backgroundColor: "#66FF7B" }}
                                        >
                                            <span className="text-black">Inicia Sesion</span>
                                        </Button>
                                    </Link>
                                </div>

                                :

                                <div className="mr-4 hidden lg:block">{userNavList}</div>
                        }
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={toggleOpen}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {
                        userLoggedIn ?

                            { userNavList }

                            :

                            <div>
                                {nonUserNavList}
                                <div className="flex justify-around gap-x-2 mt-4">
                                    <Link to="/register">
                                        <Button
                                            variant="filled"
                                            size="md"
                                            className="w-48 rounded-none border-2 border-black"
                                            style={{ backgroundColor: "#FF5FAA" }}
                                        >
                                            <span className="text-black">Registrate</span>
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button
                                            variant="filled"
                                            size="md"
                                            className="w-48 rounded-none border-2 border-black"
                                            style={{ backgroundColor: "#66FF7B" }}
                                        >
                                            <span className="text-black">Inicia Sesion</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                    }
                </Collapse>
            </Navbar>
        </div>

    )
}

export default NavBarComponent;