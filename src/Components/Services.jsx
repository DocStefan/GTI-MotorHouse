import React from 'react'
import "../Styles/Services.css"
import { useScroll } from './Scroller'
import { useNavigate } from 'react-router';



function Services() {

  const scrollToElement = useScroll();

  const navigate = useNavigate()

  return (

    <div className="MainServicesLand" id="ServicesScrollRef" onClick={() => { scrollToElement("ServicesScrollRef") }}>

      <div className='ServicesLandLogo'>

        <img loading='eager' decoding='async' className='ServicesLandLogoPic' src="serviceBack.webp"></img>

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

                <img loading='eager' decoding='async' className='ServicedLandPropContainerLogoPic' src='car.webp'></img>

              </div>

              <div className='ServicedLandPropContainerSpan'>

                <span className='ServicedLandPropContainerSpanFirst'>Compra de vehiculos</span>

                <span className='ServicedLandPropContainerSpanSecond'>Encontra tu proximo auto con nuestro equipo</span>

              </div>

            </div>

            <div className='ServicedLandPropContainer'>

              <div className='ServicedLandPropContainerLogo'>

                <img loading='eager' decoding='async' className='ServicedLandPropContainerLogoPic' src='deal.webp'></img>

              </div>

              <div className='ServicedLandPropContainerSpan'>

                <span className='ServicedLandPropContainerSpanFirst'>Financiacion</span>

                <span className='ServicedLandPropContainerSpanSecond'>Evaluaciones acorde a tu presupuesto</span>

              </div>

            </div>

            <div className='ServicedLandPropContainer'>

              <div className='ServicedLandPropContainerLogo'>

                <img loading='eager' decoding='async' className='ServicedLandPropContainerLogoPic' src='service.webp'></img>

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

                  <img loading='eager' decoding='async' className='LandServiceBottonLogoPicArrow' src="right.webp"></img>

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