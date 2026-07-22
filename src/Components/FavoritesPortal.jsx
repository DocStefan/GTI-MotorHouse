import React from 'react'
import "../Styles/FavoritesPortal.css"
import { useScroll } from './Scroller'
import { useNavigate } from 'react-router'




function FavoritesPortal() {

  const scrollToElement = useScroll();

  const navigate = useNavigate()



  return (

    <div className='MainFavoritesPortal' onClick={() => { scrollToElement("BoxAref") }}>

      <div className='MainFavoritesTittleContainer'>

        <div className='MainTextFavorites'>

          <div className='FirstTextMainFavorites'>

            <span class="material-symbols-outlined FavoriteMainLogo">favorite</span>

            <span className='FavoritesTittle'>Favoritos</span>

          </div>

          <span className='SecondTextMainFavorits'>Explora tus vehiculos guardados como favoritos.</span>

        </div>

        <div className="MainActionButtonFavorites">

          <button type="button" className="ButtonMainFavorites" onClick={() => { navigate("/catalogue") }}>Volver al catalogo</button>

        </div>

      </div>

      {/* <div className='MainNoFavorites'>

         <img className='MainNoFavoritesLogo' src="noFavoritesLogo.webp"></img>

         <span className='MainNoFavoritesSpan'>Agrega tu primer favorito desde el catalogo</span>

      </div> */}

      <div className='FavoritePostBox'>

        <img className='FavoritePostImg' loading='eager' decoding='async' fetchPriority="high"></img>

        <div className='FavoritePostSpanContainer'>

          <span className='FavoritePostTittleSpan'>2020 Mercedes Benz C200</span>

          <div className="FavoritePostMainCharacteristics">

            <div className="FavoriteKmsInfo"><span class="material-symbols-outlined FavoriteCharacteristicLogo">
              speed
            </span><span className="FavoriteInternInfoFix">                
              {/* {val.kms.toLocaleString("es-AR").toString() + " Km"} */}
                20.000 Km</span></div>


            <div className="FavoriteTransmisionInfo"><span class="material-symbols-outlined FavoriteCharacteristicLogo">
              auto_transmission
            </span><span className="FavoriteInternInfoFix">Automatico</span></div>

            <div className="FavoriteEngineInfo">
              <span class="material-symbols-outlined FavoriteCharacteristicLogo">
                local_gas_station
              </span>
              <span className="FavoriteInternInfoFix">Gasolina</span>
            </div>

          </div>

        </div>

        <div className='FavoritePostPriceAndButtonsContainer'>

          <div className='FavoritePostPriceContainer'>

            <span className='FavoritePostPriceTittle'>
              {/* {val.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" }).toString()} */}
              S 20.000,00

            </span>

            <span class="material-symbols-outlined FavoritePostPriceLogo">favorite</span>

          </div>

          <div className="FavoritePostActionButton">

            <button type="button" className="FavoriteBuyNowButton">Mas informacion</button>

          </div>

        </div>

      </div>

            <div className='FavoritePostBox'>

        <img className='FavoritePostImg' loading='eager' decoding='async' fetchPriority="high"></img>

        <div className='FavoritePostSpanContainer'>

          <span className='FavoritePostTittleSpan'>2020 Mercedes Benz C200</span>

          <div className="FavoritePostMainCharacteristics">

            <div className="FavoriteKmsInfo"><span class="material-symbols-outlined FavoriteCharacteristicLogo">
              speed
            </span><span className="FavoriteInternInfoFix">                
              {/* {val.kms.toLocaleString("es-AR").toString() + " Km"} */}
                20.000 Km</span></div>


            <div className="FavoriteTransmisionInfo"><span class="material-symbols-outlined FavoriteCharacteristicLogo">
              auto_transmission
            </span><span className="FavoriteInternInfoFix">Automatico</span></div>

            <div className="FavoriteEngineInfo">
              <span class="material-symbols-outlined FavoriteCharacteristicLogo">
                local_gas_station
              </span>
              <span className="FavoriteInternInfoFix">Gasolina</span>
            </div>

          </div>

        </div>

        <div className='FavoritePostPriceAndButtonsContainer'>

          <div className='FavoritePostPriceContainer'>

            <span className='FavoritePostPriceTittle'>
              {/* {val.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" }).toString()} */}
              S 20.000,00

            </span>

            <span class="material-symbols-outlined FavoritePostPriceLogo">favorite</span>

          </div>

          <div className="FavoritePostActionButton">

            <button type="button" className="FavoriteBuyNowButton">Mas informacion</button>

          </div>

        </div>

      </div>

            <div className='FavoritePostBox'>

        <img className='FavoritePostImg' loading='eager' decoding='async' fetchPriority="high"></img>

        <div className='FavoritePostSpanContainer'>

          <span className='FavoritePostTittleSpan'>2020 Mercedes Benz C200</span>

          <div className="FavoritePostMainCharacteristics">

            <div className="FavoriteKmsInfo"><span class="material-symbols-outlined FavoriteCharacteristicLogo">
              speed
            </span><span className="FavoriteInternInfoFix">                
              {/* {val.kms.toLocaleString("es-AR").toString() + " Km"} */}
                20.000 Km</span></div>


            <div className="FavoriteTransmisionInfo"><span class="material-symbols-outlined FavoriteCharacteristicLogo">
              auto_transmission
            </span><span className="FavoriteInternInfoFix">Automatico</span></div>

            <div className="FavoriteEngineInfo">
              <span class="material-symbols-outlined FavoriteCharacteristicLogo">
                local_gas_station
              </span>
              <span className="FavoriteInternInfoFix">Gasolina</span>
            </div>

          </div>

        </div>

        <div className='FavoritePostPriceAndButtonsContainer'>

          <div className='FavoritePostPriceContainer'>

            <span className='FavoritePostPriceTittle'>
              {/* {val.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" }).toString()} */}
              S 20.000,00

            </span>

            <span class="material-symbols-outlined FavoritePostPriceLogo">favorite</span>

          </div>

          <div className="FavoritePostActionButton">

            <button type="button" className="FavoriteBuyNowButton">Mas informacion</button>

          </div>

        </div>

      </div>

      
      

    </div>

  )
}

export default FavoritesPortal