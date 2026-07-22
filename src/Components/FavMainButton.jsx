import React from 'react'
import "../Styles/FavMainButton.css"
import { useId, useState, useEffect, useRef, useMemo, useContext, Fragment } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'
import axios from 'axios'



function FavMainButton() {

    const navigate = useNavigate()

    let [userOnline, setUserOnline] = useState(false)
    let [userData, serUserData] = useState(null)

    async function monitorAuthState() {

        await onAuthStateChanged(auth, user => {

            if (user) {

               setUserOnline(true)
               serUserData(user.data)
               console.log(user)

            } else {

               setUserOnline(false)

            }

        })

    }

    useEffect(() => { monitorAuthState() }, [])

    async function FavStarter() {

      try {

        const response = await axios.get("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/GetFavorites", {
            params: {
             fav_id: userData.email
            }
        })

        console.log(response)

      } catch(error) {}

    }

    return (

        <div className='ContainerFavButton' style={{display: userOnline ? "none" : "none"}} onClick={() => {navigate("/favorites")}}>

            <div className='TrueFavs'>5</div>

            <span class="material-symbols-outlined FavMainButtonClass">favorite</span>

        </div>

    )
}

export default FavMainButton