import React from 'react'
import "../Styles/LandPag.css"
import { useState, useEffect, useRef, useMemo, useContext, Fragment } from 'react'
import { useScroll } from './Scroller'
import { useNavigate } from 'react-router'
// import { userContext } from './UserStatus'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'


function LandPag() {

  const navigate = useNavigate()

  let BrandPicsArray = ["marca (1)", "marca (2)", "marca (3)", "marca (4)", "marca (5)", "marca (6)", "marca (7)", "marca (8)", "marca (9)", "marca (10)", "marca (11)"]

  let LandPagManager = [
    { Marca: "TOYOTA", Modelo: "GR SUPRA", Foto: "ToyotaHead.webp", Frase: "Tu próximo auto te está esperando", ColorModelo: "#a1151eff" },
    { Marca: "PORSCHE", Modelo: "718 CAYMAN", Foto: "PorscheHead.webp", Frase: "El auto ideal para vos te esta esperando", ColorModelo: "#ff5722", Fix: true },
    { Marca: "AUDI", Modelo: "SPORTBACK", Foto: "AudiHead.webp", Frase: "El camino a tu nuevo auto empieza hoy", ColorModelo: "#0e7cf4" },
    { Marca: "BMW", Modelo: "M4 COUPE", Foto: "BMWHead.webp", Frase: "El auto que deseas esta mas cerca que nunca", ColorModelo: "#2772db" },
    { Marca: "DODGE", Modelo: "CHALLENGER", Foto: "DodgeHead.webp", Frase: "Tu auto ideal, más cerca y más fácil que nunca", ColorModelo: "#0fc9e7" },
    { Marca: "FORD", Modelo: "MUSTANG", Foto: "FordHead.webp", Frase: "Más que un auto, tu proxima experiencia", ColorModelo: "#eb2632" },
    { Marca: "NISSAN", Modelo: "GTR", Foto: "NissanHead.webp", Frase: "Encontrá el auto ideal para vos con tan solo un click", ColorModelo: "#f96d00" },
  ]

  let [MainLogoAlternator, setMainLogoAlternator] = useState(0)

  const scrollToElement = useScroll();
  // const {HomeModelSelected, setHomeModelSelected} = useContext(ModelContext)

  let [userLogData, setUserLogData] = useState({LogIn: false, userPic: "", userName: "", userEmai: ""})

  // const {isUserLogIn} = useContext(userContext)
  // const {setIsUserLogIn} = useContext(userContext)

  // useEffect(() => {

  //  if(isUserLogIn) {

  //    if(isUserLogIn.providerId == "google.com") {

  //     setUserLogData({LogIn: true, userPic: isUserLogIn.photoUrl, userName: isUserLogIn.displayName})

  //    } else {

  //     setUserLogData({LogIn: true, userName: isUserLogIn.email.split("@")[0].slice(0, 15)})
  //     console.log("aaaa")

  //    }

  //  }

  // }, [])

  async function monitorAuthState() {

   await onAuthStateChanged(auth, user => {

    if(user) {
 
      if(user.providerData[0].providerId == "google.com") {

        setUserLogData({LogIn: true, userPic: user.photoURL, userName: user.displayName.slice(0, 15)})

      } else {

        setUserLogData({LogIn: true, userName: user.email.split("@")[0].slice(0, 15)})

      }

    } else {

      setUserLogData({LogIn: false, userPic: "", userName: "", userEmai: ""})

    }

   })

  }

  useEffect(() => {monitorAuthState()}, [])

  async function LogOut() {

   await signOut(auth)

  }

  useEffect(() => {

    setMainLogoAlternator(Math.floor(Math.random() * LandPagManager.length))

  }, [])

  // function MainLogoALternatorPlusButton() {

  //   switch (true) {

  //     case MainLogoAlternator >= 0 && MainLogoAlternator < 6:
  //       setMainLogoAlternator(preVal => preVal + 1)
  //       return;

  //     case MainLogoAlternator == 6:
  //       setMainLogoAlternator(0)
  //       return;
  //   }

  // }

  // function MainLogoALternatorMinusButton() {

  //   switch (true) {

  //     case MainLogoAlternator > 0 && MainLogoAlternator <= 6:
  //       setMainLogoAlternator(preVal => preVal - 1)
  //       return;

  //     case MainLogoAlternator == 0:
  //       setMainLogoAlternator(6)
  //       return;
  //   }

  // }

  let SelectedCarMenu = useMemo(() => { return LandPagManager[MainLogoAlternator] }, [LandPagManager, MainLogoAlternator])

     const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
      const isViewportMobile = width <= 999;
      const isViewportMobileB = width <= 500;

      const isViewportMobileStyleRef = width <= 1300
  
      let [FilterActiveNotPc, setFilterActiveNotPc] = useState(false)

  return (

    <div className="MainLandPag" id="MainLandPagRef">

  {isViewportMobile ? 
  
  <div className="NavContainerMobile" style={{height: FilterActiveNotPc ? "308px" : "75px"}}>

    <div className="LogoAndMenu">
      <span class="material-symbols-outlined LogoAndMenuSpanClass" style={{border: FilterActiveNotPc ? "solid 1.5px white" : "solid 1.5px rgb(255, 255, 255, 0)"}} onClick={() => {setFilterActiveNotPc(!FilterActiveNotPc)}}> menu </span>
      <img loading='eager' decoding='async' fetchPriority="high" className="LogoNav" src={"logoc.webp"}></img>
{

userLogData.LogIn ? 

 <div className="BotoneraSegundaSignedIn">

    <img className='SignedInPic' alt='' loading='eager' decoding='async' fetchPriority="high" src={userLogData.userPic ? userLogData.userPic : "userDefaultPic.webp"}></img>

    <div className='SignedInText'>

    <span className='SignedInName'>{userLogData.userName}</span>

    <span className='SignedOutBottonNav' onClick={() => {LogOut()}}>Cerrar sesion</span>

    </div>

 </div> 

:

<div className="BotoneraSegundaNav" onClick={() => {navigate("/login")}}><button type="button" className="Botonera BotoneraRightB"><div className="LogoSignIn"><div class="material-symbols-outlined NotSignIn">person</div></div>{isViewportMobileB ? "" : "Iniciar Sesion"}</button></div> 


}    </div>

{FilterActiveNotPc && <>         
          <div className="BotoneraMobile" onClick={() => {navigate("/catalogue"), setFilterActiveNotPc(false)}}>Vehiculos</div>
          <div className="BotoneraMobile" onClick={() => {navigate("/services"), setFilterActiveNotPc(false)}}>Servicios</div>
          <div className="BotoneraMobile" onClick={() => {scrollToElement("FooterScrollRef"), setFilterActiveNotPc(false)}}>Contacto</div></> }
     </div> 
  
  : <div className="NavContainer">

       <div className="FirstPartNav">

          <div className="BotoneraPrimeraNav" onClick={() => {navigate("/catalogue")}}><button type="button" className="Botonera BotoneraLeft">Vehiculos</button></div>
          <div className="BotoneraPrimeraNav" onClick={() => {navigate("/services")}}><button type="button" className="Botonera">Servicios</button></div>
          <div className="BotoneraPrimeraNav" onClick={() => {scrollToElement("FooterScrollRef")}}><button type="button" className="Botonera BotoneraRight">Contacto</button></div>

        </div>

        <div className="SecondPartNav">

          <div className="BotoneraLogoSegundaNav"><img loading='eager' decoding='async' fetchPriority="high" className="LogoNav" src={"logoc.webp"}></img></div>


{userLogData.LogIn ? 

 <div className="BotoneraSegundaSignedIn">

    <img className='SignedInPic' loading='eager' decoding='async' fetchPriority="high" src={userLogData.userPic ? userLogData.userPic : "userDefaultPic.webp"}></img>

    <div className='SignedInText'>

    <span className='SignedInName'>{userLogData.userName}</span>

    <span className='SignedOutBottonNav' onClick={() => {LogOut()}}>Cerrar sesion</span>

    </div>

 </div> 

:
<div className="BotoneraSegundaNav" onClick={() => {navigate("/login")}}><button type="button" className="Botonera BotoneraRightB"><div className="LogoSignIn"><span class="material-symbols-outlined NotSignIn">person</span></div>Iniciar Sesion</button></div>

}
        </div>

      </div>}

      <Fragment key={MainLogoAlternator}>
        <div className="MainLogo" onClick={() => {scrollToElement("MainLandPagRef")}}>

          <span className="TXTLogo" style={{ fontSize: SelectedCarMenu.Fix ? "22vw" : "26.5vw" }}>{SelectedCarMenu.Marca}</span>

          {/* solia ser 25vw el mayor */}

        </div>

        <div className="MainText" >

            <div className="MainTextContainer" onClick={() => {scrollToElement("MainLandPagRef")}}>

              <span className='MainBrandAndModel'>{SelectedCarMenu.Marca}{" "}{SelectedCarMenu.Modelo}</span>

              <span className='MainModelText'>{SelectedCarMenu.Frase}</span>

              <span className='MainModelParagraph'>Descubrí tu próximo auto en nuestro distinguido catalogo</span>

              <div className="ActionButton">

                <button type="button" className="ButtonMain" onClick={() => {navigate("/catalogue")}}>Ir al catalogo</button>

              </div>

            </div>

        </div>

        <div className="MainPic" onClick={() => {scrollToElement("MainLandPagRef")}}>

          <img loading='eager' decoding='async' fetchPriority="high" src={SelectedCarMenu.Foto} className="MainPicPix" ></img>

        </div>

        {/* <div className="MainLogoBrandModel" onClick={() => {scrollToElement("MainLandPagRef")}}>

          <span className="LogoBrandModel" style={{ color: SelectedCarMenu.ColorModelo }}>{SelectedCarMenu.Modelo}</span>

        </div> */}

      </Fragment>

      <div className="MainBrands" onClick={() => {scrollToElement("MainLandPagRef")}}>

        <div className="UtilBrands">

          <div className="BrandsText">

            {/* <button type="button" className="SliderActionButton" onClick={() => { MainLogoALternatorMinusButton() }}><span className="material-symbols-outlined PlusArrowSymbols">arrow_back</span></button> */}

            <div className="Separator"></div>

            <span className="SpanBrand">Destacados</span>

            <div className="Separator"></div>

            {/* <button type="button" className="SliderActionButton" onClick={() => { MainLogoALternatorPlusButton() }}><span className="material-symbols-outlined PlusArrowSymbols">arrow_forward</span></button> */}

          </div>

          <div className="ContainerPicBrandsLogo" >

            {BrandPicsArray.map((val, index) => {

              if(isViewportMobileStyleRef) {

                if(index != 10) {

              return (

                <div className="PicBrandsLogo">

                  <img className="BrandsPics" loading='eager' decoding='async' fetchPriority="high" src={val + ".webp"} ></img>

                </div>

              )

                }

              } else {


              return (

                <div className="PicBrandsLogo" style={{ animationDelay: index * -10 - 10 + "s" }}>

                  <img className="BrandsPics" loading='eager' decoding='async' fetchPriority="high" src={val + ".webp"} ></img>

                </div>

              )


              }


            })}

          </div>

        </div>

      </div>

    </div>

  )
}

export default LandPag