import React, { useContext, useEffect, useState } from 'react';
import { Typography, Collapse, Button, Card, CardHeader, CardBody, CardFooter, Checkbox, Select, Option, Input } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import CartContext from '../../store/CartContext';
import DataService from '../../service/dataService';

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

    const cartCTX = useContext(CartContext);
    const [allProducts, setAllProducts] = useState(MOCK_DATA);
    const [filteredProducts, setFilteredProducts] = useState(allProducts)
    const [allCategories, setCategories] = useState();
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);
    const dataService = new DataService();

    useEffect(() => {
        dataService.getCategories().then((response) => setCategories(response))
    }, [])

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
            filterCategories()
        }
    }

    function handleCategory(e) {

        if (e.target.checked) {
            let tempValue = allCategories[parseInt(e.target.value) - 1].category;
            setFilteredCategories(prevValue => [...prevValue, tempValue])

        } else {
            setFilteredCategories(filteredCategories.filter((cat) => cat !== allCategories[parseInt(e.target.value) - 1].category))
        }
    }

    function filterCategories() {
        let tempValue = allProducts.filter(prod => filteredCategories.includes(prod.category_id))

        if (tempValue.length <= 0) {
            setFilteredProducts(allProducts)
        } else {
            setFilteredProducts(tempValue)
        }
    }

    function addToCartHandler(id, name, sku, amount, price) {
        cartCTX.addItem({
            id: id,
            name: name,
            sku: sku,
            quantity: amount,
            price: price
        })
    }

    useEffect(() => {

        if (filteredCategories.length <= 0) {
            setFilteredProducts(allProducts)
        } else {
            filterCategories();
        }

    }, [filteredCategories])

    return (
        <div className="background">
            <NavBarComponent />

            <div className='md:container md:mx-auto my-4'>
                <Typography variant="h2" className='text-center'>Nuestros Productos</Typography>
            </div>

            <div className="flex flex-col justify-center items-center">
                <Button variant='gradient' onClick={toggleOpen}>Categorias</Button>
                <div>
                    <Collapse open={open} >
                        <Card className="my-2 mx-auto w-2/3">
                            <CardBody className='md:flex md:flex-row flex-wrap justify-center'>
                                {
                                    allCategories?.map((cat, index) => (
                                        <Checkbox
                                            key={index}
                                            label={cat.category}
                                            color='pink'
                                            ripple={false}
                                            value={cat.id}
                                            onChange={handleCategory}
                                            className="h-8 w-8 rounded-full border-pink-900/20 bg-pink-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                        />
                                    ))
                                }
                                {/* <Checkbox
                                    label="En Oferta"
                                    color='pink'
                                    ripple={false}
                                    value={2}
                                    className="h-8 w-8 rounded-full border-pink-900/20 bg-pink-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                /> */}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center py-2 md:container md:mx-auto md:flex-row lg:justify-between">
                <div className="w-72 my-2 md:mx-5">
                    <Select label="Ordenar por" variant="outlined" size="lg" className="text-black-900 bg-white" onChange={handleSort}>
                        <Option value={'0'}>Precio mas bajo</Option>
                        <Option value={'1'}>Precio mas alto</Option>
                    </Select>
                </div>
                <div className='w-72 bg-white my-2 md:mx-5'>
                    <Input label="Buscar" icon={<i className="fas fa-heart" />} onChange={handleSearch} />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
                <div className='justify-center p-5 md:flex md:flex-row md:p-0 md:flex-wrap lg:w-full'>
                    {
                        filteredProducts.map((product, index) => (

                            product.available ?

                                <Card className="my-2 shadow-xl md:mx-10 md:w-1/3 lg:w-1/6 rounded-none" key={index}>
                                    <CardHeader color="blue-gray" className="mt-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                            alt="card-image"
                                            className='w-full'
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
                                        <Button variant='outlined' onClick={() => addToCartHandler(product.id, product.name, product.sku, 1, product.price)}>Agregar al Carrito</Button>
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