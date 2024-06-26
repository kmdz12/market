import React from 'react';
import { Link } from 'wouter';
import { Navbar, Typography, IconButton, Collapse } from "@material-tailwind/react";

function AdminNavbarComponent() {

    const [openNav, setOpenNav] = React.useState(false);
    const toggleOpen = () => setOpenNav((cur) => !cur);

    function handleLogout() {
        localStorage.removeItem('token');
    }

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 items-center lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/coordinator/admin/panel">
                    Panel
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/coordinator/admin/usuarios">
                    Usuarios
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/coordinator/admin/productos">
                    Productos
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/coordinator/admin/ordenes">
                    Ordenes
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                onClick={handleLogout}
            >
                <Link to='/coordinator/admin/login'>
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
                        <div className="mr-4 hidden lg:block">{navList}</div>
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
                <Collapse open={openNav} className="lg:invisible">
                    {navList}
                </Collapse>
            </Navbar>
        </div>
    )
}

export default AdminNavbarComponent;