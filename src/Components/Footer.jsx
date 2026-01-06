import React from 'react'
import "../Styles/Footer.css"
import { useScroll } from './Scroller'

function Footer() {

  const scrollToElement = useScroll();

  return (
    <div className="MainFooter" id="FooterScrollRef" onClick={() => { scrollToElement("FooterScrollRef") }}>

      <div className="ContainerFooter">

        <div className="ArticlesFooterContainer">

          <div className="FooterInfoBox">
            <div className="FooterBoxTittle">Informacion</div>
            <div className="FooterBoxData">Sobre nosotros</div>
            <div className="FooterBoxData">Nuestros servicios</div>
            <div className="FooterBoxData">Financiamiento</div>
            <div className="FooterBoxData">Vender con nosotros</div>

          </div>
          <div className="FooterInfoBox">
            <div className="FooterBoxTittle">Soporte</div>
            <div className="FooterBoxData">Contactanos</div>
            <div className="FooterBoxData">Preguntas</div>
            <div className="FooterBoxData">Terminos</div>
            <div className="FooterBoxData">Privacidad</div>

          </div>
          <div className="FooterInfoBox">
            <div className="FooterBoxTittle">Contacto</div>
            <div className="FooterBoxData">Telefono: (+12) 3456 7890</div>
            <div className="FooterBoxData">Whattsapp</div>
            <div className="FooterBoxData">Gmail</div>
            <div className="FooterBoxData">Instagram</div>

          </div>
          <div className="FooterInfoBox">
            <div className="FooterBoxTittle">Direccion</div>
            <div className="FooterBoxData">Calle 1234</div>
            <div className="FooterBoxData">Ciudad, Provincia</div>
            <div className="FooterBoxData">Abierto de lunes a sabados</div>
            <div className="FooterBoxData">08:00 a 18:00</div>

          </div>

        </div>

        <div className="BrandFooterContainer">© 2025 GTI MotorHouse. All rights reserved.</div>

      </div>

    </div>
  )
}

export default Footer