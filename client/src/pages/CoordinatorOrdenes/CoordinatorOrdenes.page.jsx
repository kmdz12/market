import React from 'react';
import AdminNavbarComponent from '../../components/AdminNavbar/AdminNavbar.component';
import { Button, Card, Typography } from '@material-tailwind/react';

function CoordinatorOrdenesPage() {

    const TABLE_HEAD = ["ID", "Numero", "Creado", "Total", "Tipo Pago", "Estado", "Acciones"];

    const TABLE_ROWS = [
        {
            id: 1,
            number: "#213411233123",
            createdAt: '2024-01-30T18:35:16.307Z',
            total: 3000,
            payment: 'Transferencia',
            status: 'Pagado'
        },
        {
            id: 2,
            number: "#213411233123",
            createdAt: '2024-01-30T18:35:16.307Z',
            total: 3000,
            payment: 'Transferencia',
            status: 'Pagado'
        },
        {
            id: 3,
            number: "#213411233123",
            createdAt: '2024-01-30T18:35:16.307Z',
            total: 3000,
            payment: 'Transferencia',
            status: 'Pagado'
        },
    ];

    return (
        <>
            <AdminNavbarComponent />

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
                                {TABLE_ROWS.map(({ id, number, createdAt, total, payment, status }, index) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {id}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {number}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {createdAt}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {total}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {payment}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {status}
                                            </Typography>
                                        </td>
                                        <td className="p-4 flex justify-around">
                                            <Button variant="outlined" color="blue">Detalles</Button>
                                            <Button variant="outlined" color="amber">Editar</Button>
                                            <Button variant="outlined" color="red">Eliminar</Button>
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