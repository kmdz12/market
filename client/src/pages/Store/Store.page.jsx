import React, { useEffect, useState } from 'react';
import { Typography, Collapse, Button, Card, CardHeader, CardBody, CardFooter, Checkbox, Select, Option, Input } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';

const MOCK_DATA = [
    {
        id: 1,
        sku: "MZNRJ1KG",
        name: "Manzana Roja por Kilo",
        price: 2000,
        category_id: "Frutas",
        image_url: 'https://placehold.co/400',
        description: 'Manzana Roja por Kilogramo',
        available: true
    },
    {
        id: 2,
        sku: "MZNVRD1KG",
        name: "Manzana Verde por Kilo",
        price: 2500,
        category_id: "Frutas",
        image_url: 'https://placehold.co/400',
        description: 'Manzana Verde por Kilogramo',
        available: true
    },
    {
        id: 3,
        sku: "NRJ1KG",
        name: "Naranja por Kilo",
        price: 1700,
        category_id: "Frutas",
        image_url: 'https://placehold.co/400',
        description: 'Naranja por Kilogramo',
        available: true
    },
    {
        id: 4,
        sku: "PR1KG",
        name: "Pera por Kilo",
        price: 2700,
        category_id: "Frutas",
        image_url: 'https://placehold.co/400',
        description: 'Pera por Kilogramo',
        available: false
    },
    {
        id: 5,
        sku: "LCHG1KG",
        name: "Lechuga por Kilo",
        price: 1950,
        category_id: "Verduras",
        image_url: 'https://placehold.co/400',
        description: 'Lechuga por Kilogramo',
        available: true
    }
]

function StorePage() {

    const [allProducts, setAllProducts] = useState(MOCK_DATA);
    const [filteredProducts, setFilteredProducts] = useState(allProducts)
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);

    function handleSort(e) {

        if (e === '0') {
            let tempValue = [...filteredProducts.sort((a, b) => a.price - b.price)]
            setFilteredProducts(tempValue)
        } else {
            let tempValue = [...filteredProducts.sort((a, b) => b.price - a.price)]
            setFilteredProducts(tempValue)
        }

    }

    function handleSearch(e) {

        let query = e.target.value;

        if (query !== "") {
            let tempValue = filteredProducts.filter((element) => element.name.toLowerCase().includes(query));
            setFilteredProducts(tempValue)
        } else {
            setFilteredProducts(allProducts)
        }
    }

    useEffect(() => {
        // console.log(products)
    }, [filteredProducts])

    return (
        <div className="background">
            <NavBarComponent />

            <div className='md:container md:mx-auto my-4'>
                <Typography variant="h2" className='text-center'>Nuestros Productos</Typography>
            </div>

            <div className="flex flex-col justify-center items-center py-5">
                <Button variant='gradient' onClick={toggleOpen}>Categorias</Button>
                <div>
                    <Collapse open={open}>
                        <Card className="my-2 mx-auto w-8/12">
                            <CardBody>
                                <Checkbox
                                    label="Frutas"
                                    color='pink'
                                    ripple={false}
                                    className="h-8 w-8 rounded-full border-pink-900/20 bg-pink-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                />
                                <Checkbox
                                    label="Vegetales"
                                    color='pink'
                                    ripple={false}
                                    className="h-8 w-8 rounded-full border-pink-900/20 bg-pink-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                />
                                <Checkbox
                                    label="En Oferta"
                                    color='pink'
                                    ripple={false}
                                    className="h-8 w-8 rounded-full border-pink-900/20 bg-pink-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                />
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center py-2">
                <div className="w-72">
                    <Select label="Ordenar por" variant="outlined" size="lg" className="text-black-900 bg-white" onChange={handleSort}>
                        <Option value={'0'}>Precio mas bajo</Option>
                        <Option value={'1'}>Precio mas alto</Option>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center py-2">
                <div className='w-72 bg-white'>
                    <Input label="Buscar" icon={<i className="fas fa-heart" />} onChange={handleSearch} />
                </div>
            </div>

            <hr />

            <div className="flex flex-col justify-center items-center py-2">
                <div className='w-72'>
                    {
                        filteredProducts.map((product, index) => (

                            product.available ?

                                <Card className="w-full my-2 shadow-xl" key={index}>
                                    <CardHeader color="blue-gray" className="mt-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                            alt="card-image"
                                        />
                                    </CardHeader>
                                    <CardBody>
                                        <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                                            {product.name}
                                        </Typography>
                                        <Typography variant='h5' className='text-center'>
                                            $ {product.price} c/u
                                        </Typography>
                                    </CardBody>
                                    <CardFooter className="pt-0 text-center">
                                        <Button variant='outlined'>Agregar al Carrito</Button>
                                    </CardFooter>
                                </Card>

                                :

                                null
                        ))
                    }
                </div>
            </div>

            <div className='bg-white'>

                <FooterComponent />
            </div>
        </div>
    )
}

export default StorePage;