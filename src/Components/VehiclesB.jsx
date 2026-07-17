import React from 'react'
import "../Styles/VehiclesB.css"
import { useId, useState, useEffect, useRef, useMemo, useContext, Fragment } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useScroll } from './Scroller'
import { useNavigate } from 'react-router'
import axios from 'axios'
import VehiclesData from './VehiclesData'
import { FadeLoader } from "react-spinners"

function VehiclesB() {


  const scrollToElement = useScroll();

  const navigate = useNavigate()

  let [VehiclesData, setVehiclesData] = useState([])

  let [loading, setIsLoading] = useState(true)

 async function Starter() {

   try {

    let responseCatalogue = await axios.get("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/GetCatalogue", {})
    
    if(responseCatalogue) {setVehiclesData(responseCatalogue.data)}

   } catch {

   } finally {

     setIsLoading(false)

   }

}

useEffect(() => {Starter()}, [])

  return (

    <div className='LandVehicles' id="LandVehiclesRef" onClick={() => { scrollToElement("LandVehiclesRef") }}>

      <div className='LandVehiclesAds'>

        <div className='AdVehiclesLand'>

          <div className='AdLogoVehiclesLand'>

            <img className='AdPic' loading='eager' decoding='async' src='vehicleselected.webp'></img>

          </div>

          <div className='AdSpanVehiclesLand'>

            <span className='AdSpanFirst'>Vehiculos seleccionados</span>

            <span className='AdSpanSecond'>Revisados por nuestro equipo</span>

          </div>

        </div>

        <div className='AdVehiclesLand'>

          <div className='AdLogoVehiclesLand'>

            <img className='AdPic' loading='eager' decoding='async' src='guarantee.webp'></img>

          </div>

          <div className='AdSpanVehiclesLand'>

            <span className='AdSpanFirst'>Garantia</span>

            <span className='AdSpanSecond'>12 meses de seguridad</span>

          </div>

        </div>

        <div className='AdVehiclesLand'>

          <div className='AdLogoVehiclesLand'>

            <img className='AdPic' loading='eager' decoding='async' src='financeb.webp'></img>

          </div>

          <div className='AdSpanVehiclesLand'>

            <span className='AdSpanFirst'>Financiacion</span>

            <span className='AdSpanSecond'>A tu medida</span>

          </div>

        </div>

        <div className='AdVehiclesLand'>

          <div className='AdLogoVehiclesLand'>

            <img className='AdPic' loading='eager' decoding='async' src='exchange.webp'></img>

          </div>

          <div className='AdSpanVehiclesLand'>

            <span className='AdSpanFirst'>Tomamos tu usado</span>

            <span className='AdSpanSecond'>La mejor valuacion</span>

          </div>

        </div>

      </div>

      <div className="LandVehiclesMainSpanContainer">

        <div className='LandVehiclesMainSpanHeightController'>

          <span className='LandVehiclesMainTittle'>Ultimas novedades</span>

          <span className='LandVehiclesMainSubTittle'>Ingresos recientes destacados</span>

        </div>

      </div>

      <div className='LandVehiclesCatalogue'>

        <div className='LandVehicleCatalogueSpanContainer' onClick={() => {navigate("/catalogue")}}>

          <span className='LandVehicleCatalogueSpan'>Ver el catalogo completo<span class="material-symbols-outlined">keyboard_arrow_right</span></span>

        </div>

        <div className='LandVehiclesCataloguePostsContainer'>

          {loading ? 
          
          <div className='LoadingOn'>  <FadeLoader
    color="#1b0424"
    loading={true}
    height={40}
    width={5}
    radius={2}
    margin={20}
  /> </div>

          : VehiclesData.slice(-4).map((val, index) => {

              return (

                <div className="CataloguePostLand">
                  <div className="CalaloguePostBoxLand">

                    <img loading='eager' decoding='async' className="PostPicLand" src={val.foto}></img>

                    <div className="PostNameLand">
                      <span>{val.año.toString() + " " + val.marca + " " + val.modelo} </span>
                    </div>

                    <div className="PostKMSLand">
                      <span class="material-symbols-outlined">
                        speed
                      </span><span className="KmsTextLand">{val.kms.toLocaleString("es-AR").toString() + " Km"}</span>
                    </div>

                    <div className="PostTypeFilterLand">
                      <span className="PostTypeFilterContainerLand">{val.tipo}</span>
                    </div>

                    <div className="PostMainCharacteristicsLand">
                      <div className="TransmisionInfoLand"><span class="material-symbols-outlined">
                        auto_transmission
                      </span><span className="InternInfoFixLand">{val.caja}</span></div>
                      <div className="EngineInfoLand">
                        <span class="material-symbols-outlined">
                          local_gas_station
                        </span>
                        <span className="InternInfoFixLand">{val.combustible}</span>
                      </div>
                    </div>

                    <div className="PostActionSectionLand">

                      <div className="PostPriceLand">
                        <span>{val.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" }).toString()}</span>
                      </div>

                      <div className="PostActionButtonLand">
                        <button type="button" className="BuyNowButtonLand">Mas informacion</button>
                      </div>

                    </div>

                  </div> </div>

              )

          })}

        </div>

      </div>

    <div className='LandCatalogueButtonContainer'>

      <div className='LandCatalogueButton' onClick={() => {navigate("/catalogue")}}>

        <div className='LandCatalogueBottonLogo'>

          <img className='LandCatalogueBottonLogoPic' src="SaleLogo.webp"></img>

        </div>

        <div className='LandCatalogueButtonSpan'>

          <span className='LandCatalogueButtonSpanFirst'>Ver catalogo completo</span>

          <span className='LandCatalogueButtonSpanSecond'>Mas de 100 vehiculos disponibles</span>

        </div>

        <div className='LandCatalogueBottonLogo'>

          <img className='LandCatalogueBottonLogoPicArrow' src="right.webp"></img>

        </div>
        
      </div>

    </div>

    </div>

  )
}

export default VehiclesB