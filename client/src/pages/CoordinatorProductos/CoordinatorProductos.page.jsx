import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import DatePicker from "react-datepicker";
import { Button, Card, Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Textarea, Checkbox, Spinner } from '@material-tailwind/react';
import AdminNavbarComponent from '../../components/AdminNavbar/AdminNavbar.component';
import DataService from '../../service/dataService';
import './CoordinatorProductos.style.css';
import "react-datepicker/dist/react-datepicker.css";

const TABLE_HEAD = ["ID", "SKU", "Nombre", "Precio", "Disponibilidad", "Acciones"];
const initialProductState = {
    sku: '',
    name: '',
    price: 0,
    category: '1',
    image_url: '',
    public_id: '',
    description: '',
    offer: false,
    offer_duration: new Date(),
    offer_price: 0,
    available: false
}

function CoordinatorProductosPage() {

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [producto, setProducto] = useState(initialProductState);
    const [allProducts, setAllProducts] = useState();
    const [allCategories, setAllCategories] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useLocation();
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
        dataService.getAllProducts().then((response) => setAllProducts(response));
        dataService.getCategories().then((response) => setAllCategories(response));

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);

    }, [setAllProducts])

    function handleOpen() {
        setOpen(!open);

        if (open === false) {
            setProducto(initialProductState);
            setEdit(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        if (name == 'offer' || name == 'available') {
            let newValue = e.target.checked;

            setProducto((prevValue) => {
                return {
                    ...prevValue,
                    [name]: newValue
                }
            });

        } else {

            setProducto((prevValue) => {
                return {
                    ...prevValue,
                    [name]: value
                }
            });
        }
    }

    function handleSelect(value) {

        setProducto((prevValue) => {
            return {
                ...prevValue,
                ['category']: value
            }
        });
    }

    async function handleCreate() {

        setIsLoading(true);

        if (edit) {
            await dataService.updateProduct(id, producto);
        } else {
            await dataService.createProduct(producto);
        }

        await dataService.getAllProducts().then((response) => setAllProducts(response)).finally(() => setIsLoading(false));
        setOpen(false);
    }

    async function handleEdit(e) {

        const editID = e.target.value;
        setId(editID);

        const tempProduct = allProducts.filter((product) => product.id == editID)[0];

        setProducto({
            sku: tempProduct.sku,
            name: tempProduct.name,
            price: tempProduct.price,
            category: tempProduct.category_id.toString(),
            image_url: tempProduct.image_url,
            public_id: tempProduct.public_id,
            description: tempProduct.description,
            offer: tempProduct.offer,
            offer_duration: new Date(tempProduct.offer_duration),
            offer_price: tempProduct.offer_price,
            available: tempProduct.available
        });

        setOpen(true);
        setEdit(true);
    }

    async function handleDelete(e) {

        const id = e.target.value;

        if (window.confirm(`Esta seguro de eliminar el producto ${id}?`)) {
            setIsLoading(true);
            await dataService.deleteProduct(id);
            await dataService.getAllProducts().then((response) => setAllProducts(response)).finally(() => setIsLoading(false));
        }
    }

    function handleImageUpload(e) {

        const data = new FormData();
        data.append('image', e.target.files[0]);

        dataService.imageUpload(data).then((response) => {

            setProducto((prevValue) => {
                return {
                    ...prevValue,
                    ['image_url']: response.url,
                    ['public_id']: response.public_id
                }
            });
        })
    }

    function handleDeleteImage() {

        if (window.confirm('Esta seguro de eliminar esta imagen?')) {

            setIsLoading(true);
            dataService.deleteImage(producto.public_id).then((response) => {

                if (response.result == 'ok') {

                    setProducto((prevValue) => {
                        return {
                            ...prevValue,
                            ['image_url']: initialProductState.image_url,
                            ['public_id']: initialProductState.public_id
                        }
                    });
                }

            }).finally(() => setIsLoading(false));
        }
    }

    return (
        <>
            <AdminNavbarComponent />

            <div className='md:container md:mx-auto p-2'>
                <div className="my-5 flex justify-between items-center">
                    <Typography variant="h2">ABM Productos</Typography>
                    <Button variant="gradient" size="sm" color="green" onClick={handleOpen} disabled={isLoading ? true : false}>Nuevo</Button>
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
                                                className="font-normal leading-none"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isLoading ?

                                        <tr key={id} className="even:bg-blue-gray-50/50 animate-pulse">
                                            <td className='p-4'>
                                                <div>
                                                    <div className="h-4 bg-gray-600 rounded"></div>
                                                </div>
                                            </td>
                                            <td className='p-4'>
                                                <div>
                                                    <div className="h-4 bg-gray-600 rounded"></div>
                                                </div>
                                            </td>
                                            <td className='p-4'>
                                                <div>
                                                    <div className="h-4 bg-gray-600 rounded"></div>
                                                </div>
                                            </td>
                                            <td className='p-4'>
                                                <div>
                                                    <div className="h-4 bg-gray-600 rounded"></div>
                                                </div>
                                            </td>
                                            <td className='p-4'>
                                                <div>
                                                    <div className="h-4 bg-gray-600 rounded"></div>
                                                </div>
                                            </td>
                                            <td className='p-4'>
                                                <div className='flex justify-between'>
                                                    <div className="h-4 w-1/2 mx-1 bg-gray-600 rounded"></div>
                                                    <div className="h-4 w-1/2 mx-1 bg-gray-600 rounded"></div>
                                                </div>
                                            </td>
                                        </tr>

                                        :

                                        allProducts?.map(({ id, sku, name, price, available }, index) => (
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
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {price}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {available ? 'Si' : 'No'}
                                                    </Typography>
                                                </td>
                                                <td className="p-4 flex justify-around">
                                                    <Button variant="gradient" size="sm" color="amber" onClick={handleEdit} value={id}>Editar</Button>
                                                    <Button variant="gradient" size="sm" color="red" onClick={handleDelete} value={id}>Eliminar</Button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>

            <Dialog open={open} handler={handleOpen} size="lg">
                <DialogHeader className='justify-center'>Nuevo Producto</DialogHeader>
                <DialogBody className='flex justify-center'>
                    <form className="w-full" encType='multipart/form-data'>
                        <div className="mb-1 flex flex-col gap-6">
                            <div className='flex flex-col md:flex-col lg:flex-row lg:flex-wrap lg:grow'>
                                <div className='my-1 mx-1 lg:w-1/3 lg:grow'>
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Nombre
                                    </Typography>
                                    <Input
                                        type="text"
                                        size="md"
                                        placeholder="Nombre del Producto"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        name="name"
                                        value={producto.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='my-1 mx-1 lg:w-1/3 lg:grow'>
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        SKU
                                    </Typography>
                                    <Input
                                        type="text"
                                        size="md"
                                        placeholder="Codigo SKU"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        name="sku"
                                        value={producto.sku}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='lg:w-1/3 lg:grow my-1 mx-1'>
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Precio
                                    </Typography>
                                    <Input
                                        type="number"
                                        min={0}
                                        size="md"
                                        placeholder="$ XX"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        name="price"
                                        value={producto.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='lg:w-1/3 lg:grow my-1 mx-1'>
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Categoria
                                    </Typography>
                                    <Select label="Selecciona" value={producto.category} onChange={handleSelect}>
                                        {
                                            allCategories?.map((cat, index) => (

                                                <Option key={index} value={String(cat.id)}>{cat.category}</Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                                <div className='md:w-1/2 my-1 mx-1'>
                                    <Typography variant="h6" color="blue-gray" className="mb-3 select-all">
                                        Cloudinary Image URL
                                    </Typography>
                                    <Input
                                        type="text"
                                        size="md"
                                        placeholder="URL Generada"
                                        className="select-all !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        disabled
                                        name="image_url"
                                        value={producto.image_url}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='md:w-1/2 my-1 mx-1'>
                                    <Typography variant="h6" color="blue-gray" className="mb-3">
                                        Cloudinary Public Image ID
                                    </Typography>
                                    <Input
                                        type="text"
                                        size="md"
                                        placeholder="Public ID"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        disabled
                                        name="public_id"
                                        value={producto.public_id}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                                <div className='md:w-1/2 my-1 mx-1'>
                                    <Input variant="static" name='image' type="file" accept="image/*" className='border-none' onChange={handleImageUpload} />
                                </div>
                                {
                                    isLoading ?

                                        <div className='md:w-1/2 my-1 mx-1 flex justify-center'>
                                            <Button color="red" disabled className='w-52 flex justify-center items-center'>
                                                <Spinner className="h-4" />
                                            </Button>
                                        </div>

                                        :

                                        <div className='md:w-1/2 my-1 mx-1 flex justify-center'>
                                            <Button color="red" onClick={handleDeleteImage} className='w-52'>Eliminar Imagen Actual</Button>
                                        </div>
                                }
                            </div>
                            <div className='flex flex-col md:flex-col md:justify-between'>
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    Descripcion Producto
                                </Typography>
                                <Textarea size="md" placeholder='Describe el producto' name="description" value={producto.description} onChange={handleChange} />
                            </div>

                            <div className='flex flex-col md:flex-row md:justify-center items-center'>
                                <Checkbox label="Esta en oferta?" name="offer" disabled value={producto.offer} onChange={handleChange} />
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                                <div className='flex flex-col md:w-1/2 my-1 mx-1'>
                                    <Typography>Duracion de la Oferta</Typography>
                                    <DatePicker
                                        className='w-full border border-blue-gray-200 rounded py-1' disabled selected={producto.offer_duration} name="offer_duration" onChange={(date) => setProducto((prevValue) => {
                                            return {
                                                ...prevValue,
                                                ['offer_duration']: date
                                            }
                                        })} />
                                </div>
                                <div className='md:w-1/2 my-1 mx-1'>
                                    <Typography>Precio de la Oferta</Typography>
                                    <Input
                                        type="number"
                                        min={0}
                                        size="md"
                                        placeholder="$ XX"
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        disabled
                                        name="offer_price"
                                        value={producto.offer_price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:justify-center items-center'>
                                <Checkbox label="Disponible para compra?" name="available" value={producto.available} checked={producto.available} onChange={handleChange} />
                            </div>
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="filled"
                        color="red"
                        onClick={handleOpen}
                        className='mr-2'
                    >
                        <span>Salir</span>
                    </Button>
                    {
                        isLoading ?

                            <Button variant="gradient" color="green" className='w-28' disabled>
                                <Spinner className="h-4 w-full" />
                            </Button>

                            :

                            <Button variant="gradient" color="green" className='w-28' onClick={handleCreate}>
                                <span>Confirmar</span>
                            </Button>
                    }
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default CoordinatorProductosPage;