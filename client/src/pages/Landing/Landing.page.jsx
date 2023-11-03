import React from 'react';
import { Typography } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import './Landing.style.css';

function LandingPage() {


    return (

        <>
            <NavBarComponent />
            <div className="h-[53rem]">

                <div className="h-full w-full bg-cover bg-no-repeat intro bg-center flex justify-center items-center">
                    <div className="select-none">
                        <Typography variant="h1" color="white" className="tracking-wide drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">Kilometro 12</Typography>
                        <Typography variant="lead" color="white" className="tracking-wide drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">Delivery de Frutas y Verduras</Typography>
                    </div>
                </div>
            </div>

                <div className="md:container md:mx-auto m-2 flex my-5 bg-white rounded-lg border-y-2 border-black">
                    <div className="p-5">
                        <Typography variant="h2" color="black">Como Funciona?</Typography>
                    </div>
                </div>

                <div className="md:container md:mx-auto m-2 flex flex-col bg-white rounded-lg sm:flex-row">
                    <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                        <img src="./images/fruit-basket.png" alt="Fruit basket" className="h-80 w-auto md:h-52" />
                        <Typography variant="lead">Paso 1</Typography>
                        <Typography variant="paragraph">Busca tus frutas y vegetales deseados, usando la barra de busqueda o explorando nuestra lista de productos.</Typography>
                    </div>

                    <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                        <img src="./images/cart.png" alt="Fruit basket" className="h-80 w-auto md:h-52" />
                        <Typography variant="lead">Paso 2</Typography>
                        <Typography variant="paragraph">Agrega los items seleccionados a tu carrito y completa con tus datos para el envio!</Typography>
                    </div>

                    <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                        <img src="./images/delivery.png" alt="Fruit basket" className="h-80 w-auto md:h-52" />
                        <Typography variant="lead">Paso 3</Typography>
                        <Typography variant="paragraph">Realiza tu orden, paga con tu medio preferido y listo! Relajate mientras preparamos tu pedido.</Typography>
                    </div>
                </div>
        </>
    )
}

export default LandingPage;