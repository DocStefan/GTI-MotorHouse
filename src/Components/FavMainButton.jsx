import React from 'react'
import "../Styles/FavMainButton.css"
import { useId, useState, useEffect, useRef, useMemo, useContext, Fragment } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'



function FavMainButton() {

    const navigate = useNavigate()

    let [userOnline, setUserOnline] = useState(false)

    async function monitorAuthState() {

        await onAuthStateChanged(auth, user => {

            if (user) {

               setUserOnline(true)

            } else {

               setUserOnline(false)

            }

        })

    }

    useEffect(() => { monitorAuthState() }, [])

    return (

        <div className='ContainerFavButton' style={{display: userOnline ? "none" : "none"}} onClick={() => {navigate("/favorites")}}>

            <div className='TrueFavs'>5</div>

            <span class="material-symbols-outlined FavMainButtonClass">favorite</span>

        </div>

    )
}

export default FavMainButton