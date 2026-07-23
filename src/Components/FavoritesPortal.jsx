import React from 'react'
import "../Styles/FavoritesPortal.css"
import { useScroll } from './Scroller'
import { useNavigate } from 'react-router'
import { useId, useState, useEffect, useRef, useMemo, useContext, Fragment } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import axios from 'axios'
import { FadeLoader } from 'react-spinners'



function FavoritesPortal() {

  const scrollToElement = useScroll();

  const navigate = useNavigate()

  let [userData, setUserData] = useState(null)
  let [favorites, setFavorites] = useState([])

  let [loading, setLoading] = useState(true)

  let [FavIDmanager, setFavIdmanager] = useState({ selected_id: 0 })

  async function monitorAuthState() {

    await onAuthStateChanged(auth, user => {

      if (user) {

        setUserData(user)

      } else {

        setUserData(null)

      }

    })

  }

  useEffect(() => { monitorAuthState() }, [])

  async function Starter() {

    if (userData) {

      try {

        const response = await axios.get("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/GetFavorites", {
          params: {
            fav_id: userData.email
          }
        })

        setFavorites(response.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    } else {

      setFavorites([])

    }

  }

  useEffect(() => {

    Starter()

  }, [userData])

  async function FavChosenDelete() {

    console.log(FavIDmanager)

    if (userData.email) {

      try {

        const response = await axios.delete("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/RemoveFavorite", {
          params: {
            tonotbe_fav_id: FavIDmanager.selected_id,
            user_email: userData.email
          }
        })

      } catch (error) {

        console.log(error)

      }
    }

    Starter()

  }

  useEffect(() => {

    FavChosenDelete()

  }, [FavIDmanager])

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

      {loading ? <div className='LoadingOnMainFavoritesPortal'>  <FadeLoader
        color="#1b0424"
        loading={true}
        height={40}
        width={5}
        radius={2}
        margin={20}
      /> </div> : favorites.length > 0 ? favorites.map((val) => {

        return (

          <div className='FavoritePostBox'>

            <img className='FavoritePostImg' loading='eager' decoding='async' fetchPriority="high" src={val.foto}></img>

            <div className='FavoritePostSpanContainer'>

              <span className='FavoritePostTittleSpan'>{val.año} {""} {val.marca} {""} {val.modelo}</span>

              <div className="FavoritePostMainCharacteristics">

                <div className="FavoriteKmsInfo"><span class="material-symbols-outlined FavoriteCharacteristicLogo">
                  speed
                </span><span className="FavoriteInternInfoFix">{val.kms.toLocaleString("es-AR").toString() + " Km"}</span></div>
                <div className="FavoriteTransmisionInfo"><span class="material-symbols-outlined FavoriteCharacteristicLogo">
                  auto_transmission
                </span><span className="FavoriteInternInfoFix">{val.caja}</span></div>

                <div className="FavoriteEngineInfo">
                  <span class="material-symbols-outlined FavoriteCharacteristicLogo">
                    local_gas_station
                  </span>
                  <span className="FavoriteInternInfoFix">{val.combustible}</span>
                </div>

              </div>

            </div>

            <div className='FavoritePostPriceAndButtonsContainer'>

              <div className='FavoritePostPriceContainer'>

                <span className='FavoritePostPriceTittle'>
                  {val.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" }).toString()}
                </span>

                <span class="material-symbols-outlined FavoritePostPriceLogo" onClick={() => { setFavIdmanager({ selected_id: val.catalogue_id }) }}>favorite</span>

              </div>

              <div className="FavoritePostActionButton">

                <button type="button" className="FavoriteBuyNowButton">Mas informacion</button>

              </div>

            </div>

          </div>

        )

      })

        : <div className='MainNoFavorites'>

          <img className='MainNoFavoritesLogo' src="noFavoritesLogo.webp"></img>

          <span className='MainNoFavoritesSpan'>Agrega tu primer favorito desde el catalogo</span>

        </div>

      }

    </div>

  )
}

export default FavoritesPortal