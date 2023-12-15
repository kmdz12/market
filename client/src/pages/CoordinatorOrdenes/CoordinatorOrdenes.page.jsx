import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Alert } from '@material-tailwind/react';
import AdminNavbarComponent from '../../components/AdminNavbar/AdminNavbar.component';
import OrderDialogComponent from '../../components/OrderDialog/OrderDialog.component';
import DataService from '../../service/dataService';

function CoordinatorOrdenesPage() {

    const TABLE_HEAD = ["ID", "Numero", "Creado", "Total", "Tipo Pago", "Estado", "Acciones"];
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [open, setOpen] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [alert, setAlert] = useState({
        message: '',
        show: false
    });
    const dataService = new DataService();

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');

            dataService.checkLoggedUser().then((response) => {

                if (response.user !== import.meta.env.VITE_OWNER_EMAIL && response.user !== import.meta.env.VITE_SUBOWNER_EMAIL && response.user !== import.meta.env.VITE_ENTERPRISE_EMAIL) {
                    setLocation('/');

                } else {

                    dataService.checkUserStatus(token).then((response) => {

                        if (response.auth === false) {
                            localStorage.removeItem('token');
                            setLocation('/coordinator/admin/login');
                        }
                    })
                }
            })

        } else {
            setLocation('/coordinator/admin/login');
        }

    }, [])

    useEffect(() => {
        dataService.getAllOrders().then((response) => setOrders(response));
    }, [setOrders])

    useEffect(() => {

        if (alert.show) {
            dataService.getAllOrders().then((response) => setOrders(response));

            setTimeout(() => {

                setAlert({
                    message: '',
                    show: false
                });

            }, 3000);
        }

    }, [alert.show])

    const handleOpen = () => setOpen(!open);

    function handleOrderDetails(order) {
        setOrderDetails(order);
        setOpen(true);
    }

    function handleUpdateStatus(order) {
        setOrderDetails(order);
        setOpen(true);
        setUpdateStatus(true);
    }

    return (
        <>
            <AdminNavbarComponent />
            <OrderDialogComponent order={orderDetails} open={open} handleOpen={handleOpen} updateStatus={updateStatus} setUpdateStatus={setUpdateStatus} setAlert={setAlert} />
            <Alert className="sticky top-32 z-10 max-h-[768px] w-[calc(100%)] overflow-none flex justify-center" variant="gradient" color="amber" open={alert.show} animate={{ mount: { y: 0 }, unmount: { y: -100 } }}>{alert.message}</Alert>
            <div className='md:container md:mx-auto p-2'>
                <div className="my-5 flex justify-between">
                    <Typography variant="h2">ABM Ordenes</Typography>
                </div>
                <div>
                    <Card className="h-full w-full overflow-scroll">
                        <table className="md:w-full md:min-w-max table-auto text-center">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {order.id}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {order.order_number}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {order.created}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {order.cart.total}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            {
                                                order.cart.paymentType === 1 ?

                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        Transferencia
                                                    </Typography>

                                                    :

                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        Mercado Pago
                                                    </Typography>
                                            }
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {order.status}
                                            </Typography>
                                        </td>
                                        <td className="p-4 flex justify-around">
                                            <Button variant="gradient" color="blue" onClick={() => handleOrderDetails(order)}>Detalles</Button>
                                            <Button variant="gradient" color="amber" onClick={() => handleUpdateStatus(order)}>Actualizar Estado</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>

        </>
    )
}

export default CoordinatorOrdenesPage;