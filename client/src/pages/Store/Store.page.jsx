import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Typography, Collapse, Button, Card, CardHeader, CardBody, CardFooter, Checkbox, Select, Option, Input, Spinner } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import CartContext from '../../store/CartContext';
import DataService from '../../service/dataService';
import '../../animations/animista.css';

function StorePage() {

    const cartCTX = useContext(CartContext);
    const [allProducts, setAllProducts] = useState();
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [allCategories, setCategories] = useState();
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);
    const dataService = new DataService();

    useEffect(() => {

        dataService.getAllStoreProducts().then((response) => setAllProducts(response));
        dataService.getCategories().then((response) => setCategories(response));
    }, [])

    useEffect(() => {

        setFilteredProducts(allProducts);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

    }, [allProducts])

    function handleSort(e) {

        if (e === '0') {

            let tempValue = [...filteredProducts.sort((a, b) => a.price - b.price)];
            setFilteredProducts(tempValue);

        } else {

            let tempValue = [...filteredProducts.sort((a, b) => b.price - a.price)];
            setFilteredProducts(tempValue);
        }
    }

    function handleSearch(e) {

        let query = e.target.value;

        if (query !== "") {

            let tempValue = filteredProducts.filter((element) => element.name.toLowerCase().includes(query));
            setFilteredProducts(tempValue);

        } else {
            filterCategories();
        }
    }

    function handleCategory(e) {

        if (e.target.checked) {

            let tempValue = allCategories[parseInt(e.target.value) - 1].category;
            setFilteredCategories(prevValue => [...prevValue, tempValue]);

        } else {
            setFilteredCategories(filteredCategories.filter((cat) => cat !== allCategories[parseInt(e.target.value) - 1].category));
        }
    }

    function filterCategories() {
        let tempValue = allProducts.filter(prod => filteredCategories.includes(prod.category));

        if (tempValue.length <= 0) {
            setFilteredProducts(allProducts);

        } else {
            setFilteredProducts(tempValue);
        }
    }

    function addToCartHandler(id, name, sku, amount, price) {

        cartCTX.addItem({
            id: id,
            title: name,
            sku: sku,
            quantity: amount,
            unit_price: price
        })
    }

    useEffect(() => {

        if (filteredCategories.length <= 0) {
            setFilteredProducts(allProducts);

        } else {
            filterCategories();
        }

    }, [filteredCategories])

    return (
        <div className='flex flex-col'>
            <NavBarComponent />
            <div className="flex flex-col background grow">
                <div className='md:container md:mx-auto my-8'>
                    <Typography variant="h2" className='text-center'>Nuestros Productos</Typography>
                </div>

                {
                    isLoading ?

                        <div className='flex flex-col justify-center items-center p-5 grow'>
                            <Spinner className='h-16 w-16 text-gray-900/50' />
                        </div>

                        :

                        <div>
                            <div className="flex flex-col justify-center items-center">
                                <Button variant='gradient' color="pink" onClick={toggleOpen} className='shadow-pop-br'>Categorias</Button>
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
                                                            name={cat.category}
                                                        />
                                                    ))
                                                }
                                            </CardBody>
                                        </Card>
                                    </Collapse>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center py-2 md:container md:mx-auto md:flex-row lg:justify-between">
                                <div className="w-72 my-2 md:mx-5">
                                    <Select name='Selector Ordenar por' labelProps={{ className: 'text-black-900' }} label="Ordenar por" variant="outlined" size="lg" className="text-black-900 bg-white" onChange={handleSort}>
                                        <Option value={'0'}>Precio mas bajo</Option>
                                        <Option value={'1'}>Precio mas alto</Option>
                                    </Select>
                                </div>
                                <div className='w-72 bg-white my-2 md:mx-5'>
                                    <Input name='Buscar' label="Buscar" icon={<i className="fas fa-heart" />} onChange={handleSearch} />
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className='justify-center p-10 md:flex md:flex-row md:p-0 md:flex-wrap lg:w-full'>
                                    {
                                        filteredProducts?.map((product, index) => (

                                            product.available ?

                                                <Card className="my-2 md:mx-1 md:w-1/3 lg:w-1/4 xl:w-1/6 rounded-none shadow-pop-br cursor-pointer" key={index}>
                                                    <Link to={`/store/product/${product.id}`}>
                                                        <CardHeader color="blue-gray" className="mt-4">
                                                            <img
                                                                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                                                alt="card-image"
                                                                className='w-full'
                                                            />
                                                        </CardHeader>
                                                        <CardBody className='py-6'>
                                                            <Typography variant="h4" color="blue-gray" className="mb-2 text-center lg:text-2xl">
                                                                {product.name}
                                                            </Typography>
                                                            <Typography variant='h5' className='text-center'>
                                                                $ {product.price}
                                                            </Typography>
                                                        </CardBody>
                                                    </Link>
                                                    <CardFooter className="pt-0 text-center">
                                                        <Button color='pink' variant='gradient' onClick={() => addToCartHandler(product.id, product.name, product.sku, 1, Number(product.price))}>Agregar al Carrito</Button>
                                                    </CardFooter>
                                                </Card>

                                                :

                                                null
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
            <FooterComponent />
        </div>
    )
}

export default StorePage;