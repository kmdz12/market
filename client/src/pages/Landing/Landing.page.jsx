import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import NavBarComponent from '../../components/NavBar/navbar.component';
import FooterComponent from '../../components/Footer/footer.component';
import './Landing.style.css';
import '../../animations/animista.css';

function LandingPage() {

    return (

        <>
            <div className="flex flex-col pb-2">
                <NavBarComponent />

                <div className="flex-none h-[32rem]">
                    <div className="h-full w-full bg-cover bg-no-repeat intro bg-center flex justify-center items-center" title='Foto de amoon.ra en Unsplash'>
                        <div className="select-none text-center">
                            <Typography variant="h1" color="white" className="text-3xl md:text-5xl tracking-wide focus-in-expand">Kilometro 12</Typography>
                            <div className='slide-in-top'>
                                <Typography variant="lead" color="white" className="tracking-wide drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,1)]">Delivery de Frutas y Verduras</Typography>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='background'>
                    <div>
                        <div className="md:container md:mx-auto m-2 flex my-5 bg-white rounded-lg border-y-2 border-black">
                            <div className="p-5">
                                <Typography variant="h2" color="black" className="sm:text-center">Como Funciona?</Typography>
                            </div>
                        </div>

                        <div className="md:container md:mx-auto flex flex-col sm:flex-row bg-white rounded-lg divide-y md:divide-x">
                            <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                                <img src="https://res.cloudinary.com/dsntcfui7/image/upload/v1702409721/landing/qyaarqfumyiic0jfrysu.webp" alt="Fruit basket" className="h-80 w-auto md:h-52" />
                                <Typography variant="lead">Paso 1</Typography>
                                <Typography variant="paragraph" className="text-center md:text-left">Busca tus frutas y vegetales deseados, usando la barra de busqueda o explorando nuestra lista de productos.</Typography>
                            </div>

                            <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                                <img src="https://res.cloudinary.com/dsntcfui7/image/upload/v1702409721/landing/ibsnv0xkktkrnbo0zqlw.webp" alt="cart" className="h-80 w-auto md:h-52" />
                                <Typography variant="lead">Paso 2</Typography>
                                <Typography variant="paragraph" className="text-center">Agrega los items seleccionados a tu carrito y completa con tus datos para el envio!</Typography>
                            </div>

                            <div className="mx-auto px-7 py-3 flex flex-col items-center md:w-1/3">
                                <img src="https://res.cloudinary.com/dsntcfui7/image/upload/v1702409721/landing/gvcvgnzybomrtx766vja.webp" alt="delivery" className="h-80 w-auto md:h-52" />
                                <Typography variant="lead">Paso 3</Typography>
                                <Typography variant="paragraph" className="text-center">Realiza tu orden, paga con tu medio preferido y listo! Relajate mientras preparamos tu pedido.</Typography>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="md:container md:mx-auto m-2 flex my-5 bg-white rounded-lg border-y-2 border-black">
                            <div className="p-5">
                                <Typography variant="h2" color="black" className="text-center md:text-left">Trabaja con Kilometro 12</Typography>
                            </div>
                        </div>

                        <div className="md:container md:mx-auto flex flex-col bg-white rounded-lg divide-y mb-5">
                            <div className="my-2 md:container md:mx-auto flex flex-col items-center md:flex-row md:justify-evenly">
                                <img src="https://res.cloudinary.com/dsntcfui7/image/upload/v1702409721/landing/hjwbdb5iyhxla6wi6rw5.webp" alt="Takeaway" className="h-80 w-auto md:w-64 md:h-64" />
                                <div className="flex flex-col items-center mx-4 basis-1/4">
                                    <Typography variant="lead" className="m-2 text-center">Como Delivery</Typography>
                                    <Typography variant="paragraph" className="m-2 text-center">Encargate de entregar nuestros pedidos, todo lo que necesitas es un vehiculo!</Typography>
                                    <Button variant="outlined" size="md" className="w-48 rounded-none border-2 border-black m-2 shadow-pop-br">
                                        <span>Viaja con Nosotros</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="my-2 md:container md:mx-auto flex flex-col items-center md:flex-row-reverse md:justify-evenly">
                                <img src="https://res.cloudinary.com/dsntcfui7/image/upload/v1702409721/landing/txbypov4zihvmyvmg3xg.webp" alt="Takeaway" className="h-80 w-auto md:w-64 md:h-64" />
                                <div className="flex flex-col items-center mx-4 basis-1/4">
                                    <Typography variant="lead" className="m-2 text-center">Como Partner</Typography>
                                    <Typography variant="paragraph" className="m-2 text-center">Ayudanos a proveer a las personas con las frutas y vegetables mas frescos.</Typography>
                                    <Button variant="outlined" size="md" className="w-48 rounded-none border-2 border-black m-2 shadow-pop-br">
                                        <span>Trabaja con Nosotros</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="my-2 md:container md:mx-auto flex flex-col items-center md:flex-row md:justify-evenly">
                                <img src="https://res.cloudinary.com/dsntcfui7/image/upload/v1702409721/landing/uewnu3tdmvinxlk9foax.webp" alt="Takeaway" className="h-80 w-auto md:w-64 md:h-64" />
                                <div className="flex flex-col items-center mx-4 basis-1/4">
                                    <Typography variant="lead" className="m-2 text-center">Como Equipo</Typography>
                                    <Typography variant="paragraph" className="m-2 text-center">Se parte del equipo que esta detras de esta gran plataforma.</Typography>
                                    <Button variant="outlined" size="md" className="w-48 rounded-none border-2 border-black m-2 shadow-pop-br">
                                        <span>Crea con Nosotros</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="my-2 md:container md:mx-auto flex flex-col items-center md:flex-row-reverse  md:justify-evenly">
                                <img src="https://res.cloudinary.com/dsntcfui7/image/upload/v1702409721/landing/ubbi9auj5aid4ot9jouw.webp" alt="Takeaway" className="h-80 w-auto md:w-64 md:h-64" />
                                <div className="flex flex-col items-center mx-4 my-4 basis-1/4">
                                    <Typography variant="lead" className="m-2 text-center">Aun con dudas?</Typography>
                                    <Typography variant="paragraph" className="m-2 text-center">Sabemos que podes tener alguna duda con respecto a medios de pago o cobertura, pero no temas, aqui vas a poder algunas preguntas frecuentes que puedes llegar a tener!</Typography>
                                    <Button variant="outlined" size="md" className="w-48 rounded-none border-2 border-black m-2 shadow-pop-br">
                                        <span>Preguntas Frecuentes</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        </>
    )
}

export default LandingPage;