import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import AdminNavbarComponent from '../../components/AdminNavbar/AdminNavbar.component';
import { Card, CardBody, CardFooter, Button, Typography } from '@material-tailwind/react';
import DataService from '../../service/dataService';

function CoordinatorPanelPage(props) {

    const [location, setLocation] = useLocation();
    const dataService = new DataService();

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');

            dataService.checkLoggedUser().then((response) => {

                if (response.user !== import.meta.env.VITE_OWNER_EMAIL && response.user !== import.meta.env.VITE_SUBOWNER_EMAIL && response.user !== import.meta.env.VITE_ENTERPRISE_EMAIL) {
                    setLocation('/')
                } else {

                    dataService.checkUserStatus(token).then((response) => {

                        if (response.auth === false) {
                            localStorage.removeItem('token');
                            setLocation('/coordinator/admin/login')
                        }
                    })
                }
            })
        } else {
            setLocation('/coordinator/admin/login')
        }

    }, [])

    return (
        <div className='bg-white'>
            <AdminNavbarComponent />
            <div className='pb-5'>
                <div className='md:container md:mx-auto flex justify-center py-12 mt-10'>
                    <Typography variant="h2" className='text-center'>Panel de Administracion</Typography>
                </div>

                <div className='md:container md:mx-auto flex justify-center items-center flex-col lg:flex-row h-fit'>
                    <Card className="mt-2 w-80 border lg:mx-2 md:w-full">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Ordenes ABM
                            </Typography>
                            <Typography variant="small">
                                Aqui podras ver todas las ordenes generadas y su estado.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 flex justify-center">
                            <Link to="/coordinator/admin/ordenes">
                                <Button>INGRESAR</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    <Card className="mt-2 w-80 border lg:mx-2 md:w-full">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Productos ABM
                            </Typography>
                            <Typography variant="small">
                                Aqui podras ver la lista completa de productos.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 flex justify-center">
                            <Link to="/coordinator/admin/productos">
                                <Button>INGRESAR</Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    <Card className="mt-2 w-80 border lg:mx-2 md:w-full">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Usuarios ABM
                            </Typography>
                            <Typography variant="small">
                                Aqui podras ver todos los usuarios registrados.
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0 flex justify-center">
                            <Link to="/coordinator/admin/usuarios">
                                <Button>INGRESAR</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CoordinatorPanelPage;