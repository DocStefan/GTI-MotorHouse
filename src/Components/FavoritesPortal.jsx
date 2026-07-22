import React from 'react'
import "../Styles/FavoritesPortal.css"
import { useScroll } from './Scroller'
import { useNavigate } from 'react-router'




function FavoritesPortal() {

  const scrollToElement = useScroll();

  const navigate = useNavigate()



  return (

    <div className='MainFavoritesPortal' onClick={() => {scrollToElement("BoxAref")}}>

      <div className='MainFavoritesTittleContainer'>

        <div className='MainTextFavorites'>

           <div className='FirstTextMainFavorites'>
        
            <span class="material-symbols-outlined FavoriteMainLogo">favorite</span>

            <span className='FavoritesTittle'>Favoritos</span>

           </div>

           <span className='SecondTextMainFavorits'>Explora tus vehiculos guardados como favoritos.</span>

        </div>

            <div className="MainActionButtonFavorites">

                <button type="button" className="ButtonMainFavorites" onClick={() => {navigate("/catalogue")}}>Volver al catalogo</button>

            </div>

      </div>

      <div className='MainNoFavorites'>

         <img className='MainNoFavoritesLogo' src="noFavoritesLogo.webp"></img>

         <span className='MainNoFavoritesSpan'>Agrega tu primer favorito desde el catalogo</span>

      </div>



    </div>

  )
}

export default FavoritesPortal