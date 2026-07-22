import React from 'react'
import "../Styles/ServicesPortal.css"
import "../Styles/CataloguePortal.css"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useScroll } from './Scroller'

function CataloguePortal() {

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

    <div className='MainCataloguePortal'>            
    
    {isViewportMobile ?

                <div className="NavContainerMobileServices" id='BoxAref' style={{ height: FilterActiveNotPc ? "fit-content" : "100%", justifyContent: FilterActiveNotPc ? "start" : "center" }}>

                    <div className="LogoAndMenuServices">
                        <span class="material-symbols-outlined LogoAndMenuSpanClassServices" style={{ border: FilterActiveNotPc ? "solid 1.5px white" : "solid 1.5px rgb(255, 255, 255, 0)" }} onClick={() => { setFilterActiveNotPc(!FilterActiveNotPc) }}> menu </span>
                        <img loading='eager' decoding='async' fetchPriority="high" className="LogoNav" src={"logoc.webp"}></img>
                        {

                            userLogData.LogIn ?

                                <div className="BotoneraSegundaSignedIn">

                                    <img className='SignedInPic' alt='' loading='eager' decoding='async' fetchPriority="high" src={userLogData.userPic ? userLogData.userPic : "userDefaultPic.webp"}></img>

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
                        <div className="BotoneraMobile" onClick={() => { navigate("/services"), setFilterActiveNotPc(false) }}>Servicios</div>
                        <div className="BotoneraMobile" style={{borderBottom: "solid 2px white"}} onClick={() => { scrollToElement("FooterScrollRef"), setFilterActiveNotPc(false) }}>Contacto</div></>}
                </div>

                : <div className="NavContainerServices" id='BoxAref'>

                    <div className="FirstPartNav">

                        <div className="BotoneraPrimeraNav" onClick={() => { navigate("/") }}><button type="button" className="Botonera BotoneraLeft">Inicio</button></div>
                        <div className="BotoneraPrimeraNav" onClick={() => { navigate("/services") }}><button type="button" className="Botonera">Servicios</button></div>
                        <div className="BotoneraPrimeraNav" onClick={() => { scrollToElement("FooterScrollRef") }}><button type="button" className="Botonera BotoneraRight">Contacto</button></div>

                    </div>

                    <div className="SecondPartNav">

                        <div className="BotoneraLogoSegundaNav"><img loading='eager' decoding='async' fetchPriority="high" className="LogoNav" src={"logoc.webp"}></img></div>


                        {userLogData.LogIn ?

                            <div className="BotoneraSegundaSignedIn">

                                <img className='SignedInPic' loading='eager' decoding='async' fetchPriority="high" src={userLogData.userPic ? userLogData.userPic : "userDefaultPic.webp"}></img>

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

                 
                
                </div>
  )
}

export default CataloguePortal