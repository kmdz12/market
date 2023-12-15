import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Select, Option, Input } from '@material-tailwind/react';
import DataService from '../../service/dataService';

function OrderDialogComponent(props) {

    const [statusOption, setStatusOption] = useState('1');
    const [reasonStatus, setReasonStatus] = useState('');
    const dataService = new DataService();

    useEffect(() => {

        if (statusOption !== '3') {
            setReasonStatus('');
        }

    }, [statusOption])

    function handleOpen() {

        if (props.updateStatus) {
            props.setUpdateStatus(false);
            setStatusOption('1');
        }

        props.handleOpen(!props.open);
    }


    function handleRedirectMaps() {
        const street = props.order.delivery_details?.street;
        const locality = props.order.delivery_details?.locality_name;
        const departament = props.order.delivery_details?.departament_name;

        const address = street.concat(" ", locality, " ", departament).replaceAll(" ", "%20").replaceAll("-", "%2D");
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
    }

    function handleReason(e) {
        const { value } = e.target;
        setReasonStatus(value);
    }

    function handleStatusOrder(value) {
        setStatusOption(value);
    }

    function handleUpdateStatus(e) {
        e.preventDefault();

        dataService.updateOrderStatus(props.order.id, Number(statusOption), reasonStatus, props.order.id).then((response) => {
            props.setAlert({
                message: response.message,
                show: true
            });
        });

        props.setUpdateStatus(false);
        props.handleOpen(false);
    }


    return (
        <Dialog open={props.open} handler={handleOpen}>
            <DialogHeader>Orden #{props.order.order_number}</DialogHeader>
            <DialogBody>
                {
                    props.updateStatus ?

                        <div className='p-2'>
                            <Typography variant='h5' className='mb-5'>Actualizar Estado</Typography>

                            <form onSubmit={handleUpdateStatus}>
                                <div className='flex flex-col justify-center items-center'>

                                    <div className='w-full mb-5'>
                                        <Select label='Estado' value={statusOption} onChange={handleStatusOrder}>
                                            <Option value={'1'}>En Proceso</Option>
                                            <Option value={'2'}>Completada</Option>
                                            <Option value={'3'}>Rechazada</Option>
                                        </Select>
                                    </div>

                                    {
                                        statusOption === '3' ?

                                            <div className='my-5 w-full'>
                                                <Input label="Razón" value={reasonStatus} name="reasonStatus" onChange={handleReason} />
                                            </div>

                                            :

                                            null
                                    }

                                    <Button
                                        variant="gradient"
                                        color="green"
                                        type='submit'
                                        className="mr-1"
                                    >
                                        <span>Actualizar</span>
                                    </Button>
                                </div>
                            </form>
                        </div>

                        :

                        <div className='divide-y'>
                            <Typography>Fecha de Creación: {props.order.created?.split('T')[0]} {props.order.created?.split('T')[1]?.split('.')[0]}</Typography>
                            <div className='my-3'>
                                <Typography variant='h5' className='my-3'>Detalles de Pedido:</Typography>
                                {
                                    props.order.cart?.items.map((item, index) => {
                                        return (
                                            <div key={index} className='flex justify-between items-center p-2'>
                                                <div>
                                                    <Typography>{item.title}</Typography>
                                                    <Typography>Precio Unitario: ${item.unit_price}</Typography>
                                                    <Typography>Cantidad: {item.quantity}</Typography>
                                                </div>
                                                <div>
                                                    <Typography>Subtotal: ${item.unit_price * item.quantity}</Typography>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <Typography>Total: ${props.order.cart?.total}</Typography>
                                {
                                    props.order.cart?.paymentType === 1 ?

                                        <Typography>Tipo De Pago: Transferencia</Typography>

                                        :

                                        <div>
                                            <Typography>Tipo De Pago: Mercado Pago</Typography>
                                            <Typography>Numero de Transaccion: {props.order.mp_transaction_order}</Typography>
                                        </div>

                                }

                                {

                                    props.order.status === 'Rechazada' ?

                                        <div>
                                            <Typography>Estado: {props.order.status}</Typography>
                                            <Typography>Razón: {props.order.reason}</Typography>
                                        </div>

                                        :

                                        <Typography>Estado: {props.order.status}</Typography>
                                }
                            </div>

                            <div className='my-3'>

                                <Typography variant='h5' className='my-3'>Detalles de Entrega:</Typography>
                                <Typography>Recibe: {props.order.pickup}</Typography>
                                <Typography className='font-bold'>Direccion:</Typography>
                                <Typography>{props.order.delivery_details?.departament_name} - {props.order.delivery_details?.locality_name}</Typography>
                                <Typography>{props.order.delivery_details?.street}</Typography>
                                <Typography>{props.order.delivery_details?.indications}</Typography>
                                <Button
                                    variant="gradient"
                                    color="blue"
                                    onClick={handleRedirectMaps}
                                    className="my-2"
                                >
                                    <span>Ver en Google Maps</span>
                                </Button>

                            </div>

                            <div className='my-3'>

                                <Typography variant='h5' className='my-3'>Pedido Por:</Typography>
                                <Typography>Email: {props.order.user_details?.email}</Typography>
                                <Typography>Nombre: {props.order.user_details?.name} {props.order.user_details?.surname}</Typography>
                                <Typography>Telefono: {props.order.user_details?.phone}</Typography>
                            </div>


                        </div>
                }
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="gradient"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cerrar</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default OrderDialogComponent;