import React from 'react'
import { useState, useEffect, useRef, useId, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router'
import "../Styles/ForgotPassword.css"
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, signInWithEmailLink, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { auth } from '../firebase'
import validator from "validator"

function LoginPanel() {

  const navigate = useNavigate()

  let [email, setEmail] = useState("")

  let [ErrorHandler, setErrorHandler] = useState({ state: false, code: "" })

  async function ForgotPassword() {

    if (!validator.isEmail(email)) {

      setErrorHandler({ state: true, code: "Ingrese un email valido" })
      return

    }

    if (!email) {

      setErrorHandler({ state: true, code: "Verifique los datos ingresados" })
      return

    }


    try {

      await sendPasswordResetEmail(auth, email)

      setErrorHandler({ state: true, code: "Se envio un correo de recuperacion al email ingresado", success: true })


    } catch (error) {}

  }

  useEffect(() => {

    if (ErrorHandler.state) {

      setErrorHandler({ state: false, code: "" })

    }


  }, [email])

  return (

    <div className="MainLogin">

      <div className='BackPickLogin'>

        <img loading='eager' decoding='async' fetchPriority='high' className='LoginPic' src="LogPic.webp"></img>

      </div>

      <div className='LoginPanelContainer'>

        <div className='ForgotInput'>

          <div className='LogInLogo'>

            <img loading='eager' decoding='async' fetchPriority='high' className='LogInLogoPic' src="logoc.webp" ></img>

          </div>

          <div className='LogInWelcomeText'>

            <span className='FirstWelcomeText'>¿Olvidaste tu contraseña?</span>

            <span className='SecondWelcomeText'>Recuperala</span>

          </div>

          <div className='LogInSpanInput'>

            <span className='inpuText'>Email</span>

            <input placeholder='Ingrese su email' type="email" className='LogInput' onChange={(e) => { setEmail(e.target.value) }}></input>

          </div>

          <div className='CreateAccountError'>

            <div className='CreateError' style={{ visibility: ErrorHandler.state ? "visible" : "hidden"}}>

              <span className='ForgotErrorCode' style={{color: ErrorHandler.success ? "#1b0424" : "red"}}>{ErrorHandler.code}</span>

            </div>

          </div>

          <div className='LogInButton'>

            <button type='button' className='LogInEmailPassButton' onClick={() => { ForgotPassword() }}>Recuperar contraseña</button>

          </div>

          <div className='LogInButton'>

            <button type='button' className='LogInEmailPassButton' onClick={() => { navigate("/login") }}>Volver a iniciar sesion</button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default LoginPanel