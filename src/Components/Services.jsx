import React from 'react'
import "../Styles/Services.css"
import { useScroll } from './Scroller'
import { useNavigate } from 'react-router';



function Services() {

  const scrollToElement = useScroll();

  const navigate = useNavigate()

  let ServicesData = [{ Img: "SaleLogo.webp", Tittle: "Compra en el momento", Description: "Comprá o vendé tu vehículo de manera rápida, segura y al mejor valor del mercado. Te ofrecemos tasaciones justas, opciones de pago flexibles y un acompañamiento profesional en cada paso para que la operación sea simple, ágil y sin complicaciones." }, { Img: "finance.webp", Tittle: "Financiacion", Description: "Accedé a planes de financiación flexibles y adaptados a tus necesidades, con cuotas accesibles y distintas opciones de pago. Te asesoramos para que elijas la mejor alternativa y puedas llevarte tu vehículo de forma rápida y sin complicaciones." }, { Img: "officialService.webp", Tittle: "Service Oficial", Description: "Realizá el mantenimiento de tu vehículo en nuestro service oficial, con técnicos especializados, repuestos originales y equipamiento de última tecnología. Cuidamos tu auto como corresponde para que mantenga su rendimiento, seguridad y valor a lo largo del tiempo." }]


  return (

    <div className="MainServicesLand" id="ServicesScrollRef" onClick={() => { scrollToElement("ServicesScrollRef") }}>

      <div className='ServicesLandLogo'>

        <img className='ServicesLandLogoPic' src="serviceBack.webp"></img>

      </div>

      <div className='ServicesLandText'>

        <div className='ServicesLandTextContainer'>

          <div className='ServiceLandFirstTextContainer'>

            <span className='FirstSpanServiceLand'>NUESTROS SERVICIOS</span>

            <span className='SecondSpanServiceLand'>Soluciones integrales para tu automotor</span>

            <span className='ThirdSpanServiceLand'>En GTI-MotorHouse te acompañamos en cada paso para que tengas la mejor experiencia.</span>

          </div>

          <div className='ServicesLandSecondTextContainer'>

            <div className='ServicedLandPropContainer'>

              <div className='ServicedLandPropContainerLogo'>

                <img className='ServicedLandPropContainerLogoPic' src='car.webp'></img>

              </div>

              <div className='ServicedLandPropContainerSpan'>

                <span className='ServicedLandPropContainerSpanFirst'>Compra de vehiculos</span>

                <span className='ServicedLandPropContainerSpanSecond'>Encontra tu proximo auto con nuestro equipo</span>

              </div>

            </div>

            <div className='ServicedLandPropContainer'>

              <div className='ServicedLandPropContainerLogo'>

                <img className='ServicedLandPropContainerLogoPic' src='deal.webp'></img>

              </div>

              <div className='ServicedLandPropContainerSpan'>

                <span className='ServicedLandPropContainerSpanFirst'>Financiacion</span>

                <span className='ServicedLandPropContainerSpanSecond'>Evaluaciones acorde a tu presupuesto</span>

              </div>

            </div>

            <div className='ServicedLandPropContainer'>

              <div className='ServicedLandPropContainerLogo'>

                <img className='ServicedLandPropContainerLogoPic' src='service.webp'></img>

              </div>

              <div className='ServicedLandPropContainerSpan'>

                <span className='ServicedLandPropContainerSpanFirst'>Servicio verificado</span>

                <span className='ServicedLandPropContainerSpanSecond'>Seguimiento del mantenimiento de tu vehiculo</span>

              </div>

            </div>

            <div className='ServicesLandButton'>

              <div className='LandServiceButton' onClick={() => { navigate("/services") }}>

                <div className='LandServiceButtonSpan'>

                  <span className='LandServiceButtonSpanFirst'>Ver servicios</span>

                </div>

                <div className='LandCatalogueBottonLogo'>

                  <img className='LandServiceBottonLogoPicArrow' src="right.webp"></img>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Services