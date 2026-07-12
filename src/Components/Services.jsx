import React from 'react'
import "../Styles/Services.css"
import { useScroll } from './Scroller'
import { useNavigate } from 'react-router';



function Services() {

  const scrollToElement = useScroll();

  const navigate = useNavigate()

 let ServicesData = [{Img: "SaleLogo.webp", Tittle:"Compra en el momento", Description: "Comprá o vendé tu vehículo de manera rápida, segura y al mejor valor del mercado. Te ofrecemos tasaciones justas, opciones de pago flexibles y un acompañamiento profesional en cada paso para que la operación sea simple, ágil y sin complicaciones."}, {Img: "finance.webp", Tittle:"Financiacion", Description: "Accedé a planes de financiación flexibles y adaptados a tus necesidades, con cuotas accesibles y distintas opciones de pago. Te asesoramos para que elijas la mejor alternativa y puedas llevarte tu vehículo de forma rápida y sin complicaciones."}, {Img: "officialService.webp", Tittle:"Service Oficial", Description: "Realizá el mantenimiento de tu vehículo en nuestro service oficial, con técnicos especializados, repuestos originales y equipamiento de última tecnología. Cuidamos tu auto como corresponde para que mantenga su rendimiento, seguridad y valor a lo largo del tiempo."}]


  return (
    <div className="MainServices" id="ServicesScrollRef" onClick={() => {scrollToElement("ServicesScrollRef")}}>

      <div className="ContainerTittleServices">

          <div className="SeparatorServices"></div>

          <span className="SpanBrandServices" onClick={() => {navigate("/services")}}>Servicios</span>

          <div className="SeparatorServices"></div>

      </div>

      <div className="ContainerDataService">


        {ServicesData.map((val) => {return        <div onClick={() => {navigate("/services")}} className="DataServiceBox">
          <img className="DataServiceLogo" src={val.Img}></img>
          <div className="DataServiceTittle"><span>{val.Tittle}</span></div>
          <div className="DataServiceDescription"><span>{val.Description}</span></div>
        </div> })}

      </div>

    </div>
  )
}

export default Services