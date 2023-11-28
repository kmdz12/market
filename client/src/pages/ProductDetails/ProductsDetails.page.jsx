import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { Button, Input, Typography } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import DataService from '../../service/dataService';
import CartContext from '../../store/CartContext';

function ProductDetailsPage() {

    const { id } = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const cartCTX = useContext(CartContext)
    const dataService = new DataService();

    useEffect(() => {
        dataService.getStoreProductDetails(id).then((response) => setProduct(response))
    }, [])

    function quantityHandler(e) {

        if (isNaN(e.target.value)) {
            setQuantity(1)
        } else {
            setQuantity(parseInt(e.target.value));
        }
    }

    function addToCartHandler() {

        if (isNaN(quantity)) {
            alert('Por favor ingresa un numero')
        } else {
            cartCTX.addItem({
                id: product.id,
                name: product.name,
                sku: product.sku,
                quantity: quantity,
                price: product.price
            })
        }

    }

    return (

        <>
            <NavBarComponent />
            <div className="background md:p-5">
                <div className='p-5'>
                    <div className='flex justify-center md:justify-start'>
                        <Link to="/store">
                            <Button variant='text' className='p-0 m-0'>
                                <svg width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </Button>
                        </Link>
                    </div>
                    <div className='md:flex md:flex-row justify-center'>
                        <img
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="card-image"
                            className='w-full md:w-3/5 md:h-3/5 lg:w-1/2 xl:w-1/2'
                        />

                        <div className='bg-white flex flex-col self-stretch justify-center xl:w-1/5 xl:p-5'>
                            <div className='p-3 text-center lg:text-left'>
                                <Typography variant="h3" className='p-1 md:text-lg'>{product?.name}</Typography>
                                <Typography variant="h4" className='p-2 md:text-xl'>$ {product?.price}</Typography>
                                <Typography variant="paragraph" className='p-1'>{product?.description}</Typography>
                            </div>
                            <div className='flex justify-center items-center p-2'>
                                <Input label='Cantidad' variant="outlined" type='number' min={1} max={5} defaultValue={1} name="quantity" onChange={quantityHandler} />
                            </div>
                            <div className='p-5 self-center'>
                                <Button onClick={addToCartHandler} color='pink' className='shadow-pop-br'>Agregar al Carrito</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default ProductDetailsPage;