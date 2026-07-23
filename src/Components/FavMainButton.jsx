import React from 'react'
import "../Styles/FavMainButton.css"
import { useId, useState, useEffect, useRef, useMemo, useContext, Fragment } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { FavoritesContext } from './MainFavoritesManager'



function FavMainButton() {

    const navigate = useNavigate()

    let [userOnline, setUserOnline] = useState(false)
    let [userData, serUserData] = useState(null)

    let [favoritesAmount, setFavoritesAmount] = useState(0)

    const {favoritesUpdate, setFavoritesUpdate} = useContext(FavoritesContext)

    async function monitorAuthState() {

        await onAuthStateChanged(auth, user => {

            if (user) {

               setUserOnline(true)
               serUserData(user)

            } else {

               setUserOnline(false)
               serUserData(null)

            }

        })

    }

    useEffect(() => { monitorAuthState() }, [])

    async function FavStarter() {

        if(userData) {

      try {

        const response = await axios.get("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/GetFavorites", {
            params: {
             fav_id: userData.email
            }
        })

        setFavoritesAmount(response.data.length)

      } catch(error) {

        console.log(error)

      }

        } 

    }

      useEffect(() => {
    
        FavStarter()
    
      }, [userData, favoritesUpdate])

    return (

        <div className='ContainerFavButton' style={{display: (userOnline ? (favoritesAmount > 0 ? "flex" : "none") : "none")}} onClick={() => {navigate("/favorites")}}>

            <div className='TrueFavs'>{favoritesAmount}</div>

            <span class="material-symbols-outlined FavMainButtonClass">favorite</span>

        </div>

    )
}

export default FavMainButton