import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import './Landing.style.css';
import FooterComponent from '../../components/Footer/footer.component';

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
                    <Typography variant="h2" color="black" className="sm:text-center">Como Funciona?</Typography>
                </div>
            </div>

            <div className="md:container md:mx-auto m-2 flex flex-col sm:flex-row bg-white rounded-lg divide-y md:divide-x">
                <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                    <img src="./images/fruit-basket.png" alt="Fruit basket" className="h-80 w-auto md:h-52" />
                    <Typography variant="lead">Paso 1</Typography>
                    <Typography variant="paragraph" className="text-center md:text-left">Busca tus frutas y vegetales deseados, usando la barra de busqueda o explorando nuestra lista de productos.</Typography>
                </div>

                <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                    <img src="./images/cart.png" alt="Fruit basket" className="h-80 w-auto md:h-52" />
                    <Typography variant="lead">Paso 2</Typography>
                    <Typography variant="paragraph" className="text-center">Agrega los items seleccionados a tu carrito y completa con tus datos para el envio!</Typography>
                </div>

                <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                    <img src="./images/delivery.png" alt="Fruit basket" className="h-80 w-auto md:h-52" />
                    <Typography variant="lead">Paso 3</Typography>
                    <Typography variant="paragraph" className="text-center">Realiza tu orden, paga con tu medio preferido y listo! Relajate mientras preparamos tu pedido.</Typography>
                </div>
            </div>

            <div className="md:container md:mx-auto m-2 flex my-5 bg-white rounded-lg border-y-2 border-black">
                <div className="p-5">
                    <Typography variant="h2" color="black" className="text-center md:text-left">Trabaja con Kilometro 12</Typography>
                </div>
            </div>

            <div className="md:container md:mx-auto m-2 flex flex-col bg-white rounded-lg divide-y">
                <div className="my-2 md:container md:mx-auto flex flex-col items-center md:flex-row md:justify-evenly">
                    <img src="./images/takeaway.png" alt="Takeaway" className="h-80 w-auto md:w-64 md:h-64" />
                    <div className="flex flex-col items-center mx-4 basis-1/4">
                        <Typography variant="lead" className="m-2 text-center">Como Delivery</Typography>
                        <Typography variant="paragraph" className="m-2 text-center">Encargate de entregar nuestros pedidos, todo lo que necesitas es un vehiculo!</Typography>
                        <Button variant="outlined" size="md" className="w-48 rounded-none border-2 border-black m-2">
                            <span>Viaja con Nosotros</span>
                        </Button>
                    </div>
                </div>
                <div className="my-2 md:container md:mx-auto flex flex-col items-center md:flex-row-reverse md:justify-evenly">
                    <img src="./images/partner.png" alt="Takeaway" className="h-80 w-auto md:w-64 md:h-64" />
                    <div className="flex flex-col items-center mx-4 basis-1/4">
                        <Typography variant="lead" className="m-2 text-center">Como Partner</Typography>
                        <Typography variant="paragraph" className="m-2 text-center">Ayudanos a proveer a las personas con las frutas y vegetables mas frescos.</Typography>
                        <Button variant="outlined" size="md" className="w-48 rounded-none border-2 border-black m-2">
                            <span>Trabaja con Nosotros</span>
                        </Button>
                    </div>
                </div>
                <div className="my-2 md:container md:mx-auto flex flex-col items-center md:flex-row md:justify-evenly">
                    <img src="./images/meeting.png" alt="Takeaway" className="h-80 w-auto md:w-64 md:h-64" />
                    <div className="flex flex-col items-center mx-4 basis-1/4">
                        <Typography variant="lead" className="m-2 text-center">Como Equipo</Typography>
                        <Typography variant="paragraph" className="m-2 text-center">Se parte del equipo que esta detras de esta gran plataforma.</Typography>
                        <Button variant="outlined" size="md" className="w-48 rounded-none border-2 border-black m-2">
                            <span>Crea con Nosotros</span>
                        </Button>
                    </div>
                </div>
                <div className="my-2 md:container md:mx-auto flex flex-col items-center md:flex-row-reverse  md:justify-evenly">
                    <img src="./images/questions.png" alt="Takeaway" className="h-80 w-auto md:w-64 md:h-64" />
                    <div className="flex flex-col items-center mx-4 my-4 basis-1/4">
                        <Typography variant="lead" className="m-2 text-center">Aun con dudas?</Typography>
                        <Typography variant="paragraph" className="m-2 text-center">Sabemos que podes tener alguna duda con respecto a medios de pago o cobertura, pero no temas, aqui vas a poder algunas preguntas frecuentes que puedes llegar a tener!</Typography>
                        <Button variant="outlined" size="md" className="w-48 rounded-none border-2 border-black m-2">
                            <span>Preguntas Frecuentes</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="md:container md:mx-auto m-2 flex flex-col bg-white rounded-lg divide-y">
                <FooterComponent />
            </div>
        </>
    )
}

export default LandingPage;