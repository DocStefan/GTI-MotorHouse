import React from 'react'
import "../Styles/ServicesPortal.css"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useScroll } from './Scroller'

function ServicesPortal() {

    const navigate = useNavigate()

    const scrollToElement = useScroll();

    let [userLogData, setUserLogData] = useState({ LogIn: false, userPic: "", userName: "", userEmai: "" })

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isViewportMobile = width <= 999;
    const isViewportMobileB = width <= 500;

    let [FilterActiveNotPc, setFilterActiveNotPc] = useState(false)

    async function monitorAuthState() {

        await onAuthStateChanged(auth, user => {

            if (user) {

                if (user.providerData[0].providerId == "google.com") {

                    setUserLogData({ LogIn: true, userPic: user.photoURL, userName: user.displayName.slice(0, 15) })

                } else {

                    setUserLogData({ LogIn: true, userName: user.email.split("@")[0].slice(0, 15) })

                }

            } else {

                setUserLogData({ LogIn: false, userPic: "", userName: "", userEmai: "" })

            }

        })

    }

    useEffect(() => { monitorAuthState() }, [])

    async function LogOut() {

        await signOut(auth)

    }

    return (

        <div className='MainServicesPortal'>

            {isViewportMobile ?

                <div className="NavContainerMobileServices" id='BoxAref' style={{ height: FilterActiveNotPc ? "fit-content" : "100%", justifyContent: FilterActiveNotPc ? "start" : "center"  }}>

                    <div className="LogoAndMenuServices">
                        <span class="material-symbols-outlined LogoAndMenuSpanClassServices" style={{ border: FilterActiveNotPc ? "solid 1.5px white" : "solid 1.5px rgb(255, 255, 255, 0)" }} onClick={() => { setFilterActiveNotPc(!FilterActiveNotPc) }}> menu </span>
                        <img loading='eager' decoding='async' fetchPriority="high" className="LogoNav" src={"logoc.webp"}></img>
                        {

                            userLogData.LogIn ?

                                <div className="BotoneraSegundaSignedIn">

                                    <img className='SignedInPic' loading='eager' decoding='async' fetchPriority="high" src={userLogData.userPic ? userLogData.userPic : "userDefaultPic.webp"}></img>

                                    <div className='SignedInText'>

                                        <span className='SignedInName'>{userLogData.userName}</span>

                                        <span className='SignedOutBottonNav' onClick={() => { LogOut() }}>Cerrar sesion</span>

                                    </div>

                                </div>

                                :

                                <div className="BotoneraSegundaNav" onClick={() => { navigate("/login") }}><button type="button" className="Botonera BotoneraRightB"><div className="LogoSignIn"><div class="material-symbols-outlined NotSignIn">person</div></div>{isViewportMobileB ? "" : "Iniciar Sesion"}</button></div>


                        }    </div>

                    {FilterActiveNotPc && <>
                        <div className="BotoneraMobile" onClick={() => { navigate("/"), setFilterActiveNotPc(false) }}>Inicio</div>
                        <div className="BotoneraMobile" onClick={() => { navigate("/catalogue"), setFilterActiveNotPc(false) }}>Vehiculos</div>
                        <div className="BotoneraMobile"  style={{borderBottom: "solid 2px white"}} onClick={() => { scrollToElement("FooterScrollRef"), setFilterActiveNotPc(false) }}>Contacto</div></>}
                </div>

                : <div className="NavContainerServices" id='BoxAref'>

                    <div className="FirstPartNav">

                        <div className="BotoneraPrimeraNav" onClick={() => { navigate("/") }}><button type="button" className="Botonera BotoneraLeft">Inicio</button></div>
                        <div className="BotoneraPrimeraNav" onClick={() => { navigate("/catalogue") }}><button type="button" className="Botonera">Vehiculos</button></div>
                        <div className="BotoneraPrimeraNav" onClick={() => { scrollToElement("FooterScrollRef") }}><button type="button" className="Botonera BotoneraRight">Contacto</button></div>

                    </div>

                    <div className="SecondPartNav">

                        <div className="BotoneraLogoSegundaNav"><img loading='eager' decoding='async' fetchPriority="high" className="LogoNav" src={"logoc.webp"}></img></div>


                        {userLogData.LogIn ?

                            <div className="BotoneraSegundaSignedIn">

                                <img className='SignedInPic' alt='' loading='eager' decoding='async' fetchPriority="high" src={userLogData.userPic ? userLogData.userPic : "userDefaultPic.webp"}></img>

                                <div className='SignedInText'>

                                    <span className='SignedInName'>{userLogData.userName}</span>

                                    <span className='SignedOutBottonNav' onClick={() => { LogOut() }}>Cerrar sesion</span>

                                </div>

                            </div>

                            :
                            <div className="BotoneraSegundaNav" onClick={() => { navigate("/login") }}><button type="button" className="Botonera BotoneraRightB"><div className="LogoSignIn"><span class="material-symbols-outlined NotSignIn">person</span></div>Iniciar Sesion</button></div>

                        }
                    </div>

                </div>}

            <div className='ServicesPortalBoxA' onClick={() => {scrollToElement("BoxAref")}}>

                <div className='ServicesPortalIMGContainer'>

                    <img loading='eager' decoding='async' fetchPriority="high" className='ServicesPortalPic' src="serviceDealer.webp"></img>

                </div>

                <div className='ServicesPortalDataContainer'>

                    <div className='ServicesPortalTextContainer'>

                        <span className='ServicesPortalTittle'>SERVICIO DE COMPRA Y VENTA EN EL MOMENTO</span>

                        <span className='ServicesPortalSpanTittle'>TU AUTO, NUESTRA MISION</span>

                        <span className='ServicesPortalSpan'>Comprá o vendé tu vehículo de manera rápida, segura y al mejor valor del mercado. En GTI-MotorHouse entendemos que adquirir o vender un automóvil es una decisión importante, por eso trabajamos para que todo el proceso sea transparente, eficiente y libre de complicaciones. Nuestro compromiso es ofrecerte una experiencia de calidad, donde cada detalle esté cuidado para que puedas realizar la operación con total confianza y tranquilidad.</span>

                        <span className='ServicesPortalSpanTittle'>TE ACOMPAÑAMOS EN CADA MOMENTO</span>

                        <span className='ServicesPortalSpan'>Contamos con un equipo de profesionales que te acompañará en cada etapa, brindándote asesoramiento personalizado y resolviendo todas tus consultas para que tomes la mejor decisión según tus necesidades. Realizamos tasaciones objetivas y competitivas, basadas en las condiciones reales del mercado, garantizando una valoración justa para cada vehículo. Además, ofrecemos diversas alternativas de pago y financiación, adaptándonos a cada cliente para facilitar la concreción de la operación.</span>

                        <span className='ServicesPortalSpanTittle'>EL TIEMPO COMO PRIORIDAD</span>

                        <span className='ServicesPortalSpan'>Nos ocupamos de simplificar cada trámite, reduciendo tiempos de espera y gestionando todo el proceso con la mayor transparencia posible. Ya sea que estés buscando renovar tu vehículo, vender el actual o encontrar el auto ideal para vos y tu familia, nuestro objetivo es brindarte una atención cercana, profesional y de excelencia. En GTI-MotorHouse creemos que comprar o vender un vehículo debe ser una experiencia sencilla, segura y satisfactoria, respaldada por un servicio confiable que te acompañe antes, durante y después de cada operación.</span>

                    </div>

                </div>

            </div>

            <div className='ServicesPortalBoxB' id='BoxBref' onClick={() => {scrollToElement("BoxBref")}}>

                <div className='ServicesPortalIMGContainer'>

                    <img loading='eager' decoding='async' fetchPriority="high" className='ServicesPortalPic' src="serviceFinance.webp"></img>

                </div>

                <div className='ServicesPortalDataContainer'>

                    <div className='ServicesPortalTextContainer'>

                        <span className='ServicesPortalTittle'>FINANCIACION A MEDIDA DE TU NUEVO AUTO</span>

                        <span className='ServicesPortalSpanTittle'>PLANES ADAPTADOS A TU ALCANZE</span>

                        <span className='ServicesPortalSpan'>Accedé a planes de financiación flexibles y diseñados para ajustarse a tus posibilidades. En GTI MotorHouse entendemos que cada cliente tiene necesidades diferentes, por eso ofrecemos soluciones personalizadas que permiten acceder al vehículo ideal sin que la inversión represente un obstáculo. Trabajamos con distintas alternativas de pago, cuotas competitivas y condiciones transparentes para que puedas elegir la opción que mejor se adapte a tu presupuesto y planificar tu compra con total tranquilidad.</span>

                        <span className='ServicesPortalSpanTittle'>ASESORAMIENTO PERSONALIZADO</span>

                        <span className='ServicesPortalSpan'>Nuestro equipo de profesionales te acompañará durante todo el proceso, brindándote información clara y un asesoramiento cercano para que tomes la mejor decisión. Analizamos cada caso de manera individual, resolvemos todas tus consultas y te explicamos cada alternativa de financiación de forma sencilla, permitiéndote comparar opciones y elegir la que mejor se ajuste a tus objetivos y posibilidades económicas.</span>

                        <span className='ServicesPortalSpanTittle'>SIMPLE, RAPIDO Y SEGURO</span>

                        <span className='ServicesPortalSpan'>Nos encargamos de simplificar todos los trámites necesarios para que puedas disfrutar de una experiencia rápida y sin complicaciones. Desde la evaluación inicial hasta la aprobación y entrega del vehículo, gestionamos cada etapa con profesionalismo, transparencia y compromiso. Nuestro objetivo es que puedas concretar tu compra con confianza, respaldado por un equipo que estará a tu lado antes, durante y después de la operación para brindarte el mejor servicio posible.</span>

                    </div>

                </div>

            </div>

            <div className='ServicesPortalBoxC' id='BoxCref' onClick={() => {scrollToElement("BoxCref")}}>

                <div className='ServicesPortalIMGContainer'>

                    <img loading='eager' decoding='async' fetchPriority="high" className='ServicesPortalPic' src="serviceService.webp"></img>

                </div>

                <div className='ServicesPortalDataContainer'>

                    <div className='ServicesPortalTextContainer'>

                        <span className='ServicesPortalTittle'>SERVICE PREMIUM Y VERIFICADO</span>

                        <span className='ServicesPortalSpanTittle'>TECNICOS ESPECIALIZADOS</span>

                        <span className='ServicesPortalSpan'>Confiá el mantenimiento de tu vehículo a un equipo de profesionales altamente capacitados y con amplia experiencia. En GTI-MotorHouse realizamos cada servicio siguiendo los estándares recomendados por el fabricante, aplicando procedimientos precisos y controles de calidad que garantizan un trabajo confiable. Nuestro compromiso es que tu vehículo reciba la atención adecuada para conservar su rendimiento, seguridad y excelente estado a lo largo del tiempo.</span>

                        <span className='ServicesPortalSpanTittle'>REPUESTOS ORIGINALES Y TECNOLOGIA DE PUNTA</span>

                        <span className='ServicesPortalSpan'>Trabajamos con repuestos originales y equipamiento de diagnóstico de última tecnología para ofrecer un servicio de máxima calidad en cada intervención. Cada componente utilizado cumple con los más altos estándares de fabricación, permitiendo mantener las prestaciones originales del vehículo y asegurando reparaciones duraderas que protegen tanto su funcionamiento como su valor de reventa.</span>

                        <span className='ServicesPortalSpanTittle'>MANTENIMIENTO Y SEGUIMIENTO</span>

                        <span className='ServicesPortalSpan'>Desde los servicios de mantenimiento preventivo hasta las reparaciones más complejas, nos ocupamos de cada detalle con responsabilidad y profesionalismo. Nuestro objetivo es que vuelvas a conducir con la tranquilidad de saber que tu vehículo fue revisado por especialistas comprometidos con la excelencia. En GTI-MotorHouse creemos que un buen servicio técnico no solo prolonga la vida útil del automóvil, sino que también brinda confianza y seguridad en cada kilómetro recorrido.</span>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ServicesPortal