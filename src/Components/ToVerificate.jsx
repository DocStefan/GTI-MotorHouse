import React from 'react'
import { useState, useEffect, useRef, useId, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router'
import "../Styles/ToVerificate.css"
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, signInWithEmailLink, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { auth } from '../firebase'
import validator from "validator"

function LoginPanel() {

  const navigate = useNavigate()

  return (

    <div className="MainLoginVerificate">

      <div className='BackPickLoginVerificate'>

        <img loading='eager' decoding='async' fetchPriority='high' className='LoginPicVerificate' src="LogPic.webp"></img>

      </div>

      <div className='VerificationPanelContainer'>

        <div className='VerificationInput'>

          <div className='LogInLogoVerificate'>

            <img loading='eager' decoding='async' fetchPriority='high' className='LogInLogoPicVerificate' src="logoc.webp" ></img>

          </div>

          <div className='VerificationWelcomeText'>

            <span className='FirstVerificationText'>¡Cuenta creada con éxito!</span>

            <span className='SecondVerificationText'>Te enviamos un correo de verificación a tu email. <br></br> Para activar tu cuenta, abrí ese correo y hacé clic en el enlace de verificación para poder iniciar sesion.</span>

          </div>
          
          <div className='LogInButtonVerificate'>

            <button type='button' className='LogInEmailPassButtonVerificate' onClick={() => { navigate("/login") }}>Volver a iniciar sesion</button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default LoginPanel