import React from 'react';
import AdminNavbarComponent from '../../components/AdminNavbar/AdminNavbar.component';
import { Button, Card, Typography } from '@material-tailwind/react';

function CoordinatorProductosPage() {

    const TABLE_HEAD = ["ID", "SKU", "Nombre", "Precio", "Disponibilidad", "Acciones"];

    const TABLE_ROWS = [
        {
            id: 1,
            sku: 12321,
            nombre: 'Manzana Verde x KG',
            precio: 1200,
            isAvailable: true
        },
        {
            id: 2,
            sku: 12321,
            nombre: 'Manzana Verde x KG',
            precio: 1200,
            isAvailable: true
        },
        {
            id: 3,
            sku: 12321,
            nombre: 'Manzana Verde x KG',
            precio: 1200,
            isAvailable: true
        }
    ];

    return (
        <>
            <AdminNavbarComponent />

            <div className='md:container md:mx-auto p-2'>
                <div className="my-5 flex justify-between">
                    <Typography variant="h2">ABM Productos</Typography>
                    <Button variant="outlined" size="sm" color="green">Nuevo</Button>
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
                                {TABLE_ROWS.map(({ id, sku, nombre, precio, isAvailable }, index) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {id}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {sku}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {nombre}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {precio}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {isAvailable ? 'Si' : 'No'}
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

export default CoordinatorProductosPage;