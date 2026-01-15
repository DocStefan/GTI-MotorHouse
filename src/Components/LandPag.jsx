import React from 'react'
import "../Styles/LandPag.css"
import { useState, useEffect, useRef, useMemo, useContext, Fragment } from 'react'
import { useScroll } from './Scroller'
import { ModelContext } from './MainModelManager'

function LandPag() {

  let BrandPicsArray = ["marca (1)", "marca (2)", "marca (3)", "marca (4)", "marca (5)", "marca (6)", "marca (7)", "marca (8)", "marca (9)", "marca (10)", "marca (11)"]

  let LandPagManager = [
    { Marca: "TOYOTA", Modelo: "Crown", Foto: "ToyotaHead.png", Frase: "El auto que siempre quisiste a un click de distancia", ColorModelo: "#a1151eff" },
    { Marca: "PORSCHE", Modelo: "718 Cayman", Foto: "PorscheHead.png", Frase: "El auto ideal para vos te esta esperando", ColorModelo: "#ff5722", Fix: true },
    { Marca: "AUDI", Modelo: "SportBack", Foto: "AudiHead.png", Frase: "El camino a tu nuevo auto empieza hoy", ColorModelo: "#0e7cf4" },
    { Marca: "BMW", Modelo: "M4 Coupe", Foto: "BMWHead.png", Frase: "El auto que deseas esta mas cerca que nunca", ColorModelo: "#2772db" },
    { Marca: "DODGE", Modelo: "Challenger", Foto: "DodgeHead.png", Frase: "Tu auto ideal, más cerca y más fácil que nunca", ColorModelo: "#0fc9e7" },
    { Marca: "FORD", Modelo: "Mustang", Foto: "FordHead.png", Frase: "Elegir tu próximo auto nunca fue tan emocionante", ColorModelo: "#eb2632" },
    { Marca: "NISSAN", Modelo: "GTR", Foto: "NissanHead.png", Frase: "Encontrá el auto ideal para vos con tan solo un click", ColorModelo: "#f96d00" },
  ]

  let [MainLogoAlternator, setMainLogoAlternator] = useState(0)

  const scrollToElement = useScroll();
  const {HomeModelSelected, setHomeModelSelected} = useContext(ModelContext)

  useEffect(() => {

    setMainLogoAlternator(Math.floor(Math.random() * LandPagManager.length))

  }, [])

  function MainLogoALternatorPlusButton() {

    switch (true) {

      case MainLogoAlternator >= 0 && MainLogoAlternator < 6:
        setMainLogoAlternator(preVal => preVal + 1)
        return;

      case MainLogoAlternator == 6:
        setMainLogoAlternator(0)
        return;
    }

  }

  function MainLogoALternatorMinusButton() {

    switch (true) {

      case MainLogoAlternator > 0 && MainLogoAlternator <= 6:
        setMainLogoAlternator(preVal => preVal - 1)
        return;

      case MainLogoAlternator == 0:
        setMainLogoAlternator(6)
        return;
    }

  }

  let SelectedCarMenu = useMemo(() => { return LandPagManager[MainLogoAlternator] }, [LandPagManager, MainLogoAlternator])

     const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
      const isViewportMobile = width <= 499;
  
      let [FilterActiveNotPc, setFilterActiveNotPc] = useState(false)

  return (

    <div className="MainLandPag" id="MainLandPagRef">

  {isViewportMobile ? 
  
  <div className="NavContainerMobile" style={{height: FilterActiveNotPc ? "385px" : "75px"}}>

    <div className="LogoAndMenu">
      <span class="material-symbols-outlined" style={{border: FilterActiveNotPc ? "solid 1.5px white" : "solid 1.5px rgb(255, 255, 255, 0)"}} onClick={() => {setFilterActiveNotPc(!FilterActiveNotPc)}}> menu </span>
      <div className="LogoNav" style={{backgroundImage: "url(./logoc.png)"}}></div>
    </div>

{FilterActiveNotPc && <>         
          <div className="BotoneraMobile" onClick={() => {scrollToElement("VehiclesScrollRef"), setFilterActiveNotPc(false)}}>Vehiculos</div>
          <div className="BotoneraMobile" onClick={() => {scrollToElement("ServicesScrollRef"), setFilterActiveNotPc(false)}}>Servicios</div>
          <div className="BotoneraMobile" onClick={() => {scrollToElement("NewsScrollRef"), setFilterActiveNotPc(false)}}>Noticias</div>
          <div className="BotoneraMobile" onClick={() => {scrollToElement("FooterScrollRef"), setFilterActiveNotPc(false)}}>Contacto</div></> }
     </div> 
  
  : <div className="NavContainer">

       <div className="FirstPartNav">

          <div className="BotoneraPrimeraNav" onClick={() => {scrollToElement("VehiclesScrollRef")}}><button type="button" className="Botonera BotoneraLeft">Vehiculos</button></div>
          <div className="BotoneraPrimeraNav" onClick={() => {scrollToElement("ServicesScrollRef")}}><button type="button" className="Botonera">Servicios</button></div>
          <div className="BotoneraPrimeraNav" onClick={() => {scrollToElement("NewsScrollRef")}}><button type="button" className="Botonera BotoneraRight">Noticias</button></div>

        </div>

        <div className="SecondPartNav">

          <div className="BotoneraLogoSegundaNav"><div className="LogoNav" style={{backgroundImage: "url(./logoc.png)"}}></div></div>
          <div className="BotoneraSegundaNav" onClick={() => {scrollToElement("FooterScrollRef")}}><button type="button" className="Botonera BotoneraRightB">Contacto</button></div>

        </div>

      </div>}

      <Fragment key={MainLogoAlternator}>
        <div className="MainLogo" onClick={() => {scrollToElement("MainLandPagRef")}}>

          <span className="TXTLogo" style={{ fontSize: SelectedCarMenu.Fix ? "22vw" : "26.5vw" }}>{SelectedCarMenu.Marca}</span>

          {/* solia ser 25vw el mayor */}

        </div>

        <div className="MainText" >

          <div className="MainContainer">

            <div className="MainTextContainer" onClick={() => {scrollToElement("MainLandPagRef")}}>

              {SelectedCarMenu.Frase}

            </div>

            <div className="ActionButton">

              <button type="button" className="ButtonMain" onClick={() => {setHomeModelSelected({ModeloSeleccionado: SelectedCarMenu.Marca.charAt(0).toUpperCase() + SelectedCarMenu.Marca.slice(1).toLowerCase()}), scrollToElement("VehiclesScrollRef")}}>Ver Modelos</button>

            </div>

          </div>

        </div>

        <div className="MainPic" onClick={() => {scrollToElement("MainLandPagRef")}}>

          <img src={SelectedCarMenu.Foto} className="MainPicPix"></img>

        </div>

        <div className="MainLogoBrandModel" onClick={() => {scrollToElement("MainLandPagRef")}}>

          <span className="LogoBrandModel" style={{ color: SelectedCarMenu.ColorModelo }}>{SelectedCarMenu.Modelo}</span>

        </div>

      </Fragment>

      <div className="MainBrands" onClick={() => {scrollToElement("MainLandPagRef")}}>

        <div className="UtilBrands">

          <div className="BrandsText">

            <button type="button" className="SliderActionButton" onClick={() => { MainLogoALternatorMinusButton() }}><span className="material-symbols-outlined PlusArrowSymbols">arrow_back</span></button>

            <div className="Separator"></div>

            <span className="SpanBrand">Destacados</span>

            <div className="Separator"></div>

            <button type="button" className="SliderActionButton" onClick={() => { MainLogoALternatorPlusButton() }}><span className="material-symbols-outlined PlusArrowSymbols">arrow_forward</span></button>

          </div>

          <div className="ContainerPicBrandsLogo" >

            {BrandPicsArray.map((val, index) => {

              return (

                <div className="PicBrandsLogo" style={{ animationDelay: index * -10 - 10 + "s" }}>

                  <img className="BrandsPics" src={val + ".png"} ></img>

                </div>

              )

            })}

          </div>

        </div>

      </div>

    </div>

  )
}

export default LandPag