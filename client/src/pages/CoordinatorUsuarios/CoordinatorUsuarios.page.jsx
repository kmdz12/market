import React from 'react';
import AdminNavbarComponent from '../../components/AdminNavbar/AdminNavbar.component';
import { Card, Typography } from '@material-tailwind/react';

function CoordinatorUsuariosPage() {

    const TABLE_HEAD = ["ID", "Email", "Rol"];

    return (
        <>
            <AdminNavbarComponent />

            <div className='md:container md:mx-auto p-2'>
                <div className="my-5 flex justify-between">
                    <Typography variant="h2">ABM Usuarios</Typography>
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
                                {/* {TABLE_ROWS.map(({ id, email, role }, index) => (
                                    <tr key={id} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {id}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {role == 1 ? 'Cliente' : 'Admin'}
                                            </Typography>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default CoordinatorUsuariosPage;