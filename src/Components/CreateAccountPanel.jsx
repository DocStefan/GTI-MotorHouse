import React from 'react'
import { useState, useEffect, useRef, useId, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router'
import "../Styles/CreateAccount.css"
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, signInWithEmailLink, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { auth } from '../firebase'
import validator from "validator"

function LoginPanel() {

  const navigate = useNavigate()

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  let [passwordBis, setPasswordBis] = useState("")

  let [ErrorHandler, setErrorHandler] = useState({state: false, code: ""})

  async function CreateAccountEmailPass() {

    if(!validator.isEmail(email)) {

      setErrorHandler({state: true, code: "Ingrese un email valido"})
      return

    }

    if(password != passwordBis) {

      setErrorHandler({state: true, code: "Verifique la contraseña"})
      return

    }

    if(!email || !password || !passwordBis) {

      setErrorHandler({state: true, code: "Verifique los datos ingresados"})
      return

    }

    try {

      const userData = await createUserWithEmailAndPassword(auth, email, password)

      await sendEmailVerification(userData.user)

      await signOut(auth)

      setErrorHandler({state: false, code: ""})

      navigate("/verification")

    } catch (error) {

      if(error.code == "auth/email-already-in-use") {

        setErrorHandler({state: true, code: "Direccion de email ya registrada"})
        return
      
      }

      setErrorHandler({state: true, code: "Ocurrio un error al crear la cuenta"})
      console.log(error.code)

    }

  }

  useEffect(() => {

    if(ErrorHandler.state) {

    setErrorHandler({state: false, code: ""})

    }


  }, [email, password, passwordBis])

  return (

    <div className="MainLoginCreate">

      <div className='BackPickLoginCreate'>

        <img loading='eager' decoding='async' fetchPriority='high' className='LoginPicCreate' src="LogPic.webp"></img>

      </div>

      <div className='LoginPanelContainerCreate'>

        <div className='LoginInputCreate'>

          <div className='LogInLogoCreate'>

            <img loading='eager' decoding='async' fetchPriority='high' className='LogInLogoPicCreate' src="logoc.webp" ></img>

          </div>

          <div className='LogInWelcomeTextCreate'>

            <span className='FirstWelcomeTextCreate'>¡Bienvenido!</span>

            <span className='SecondWelcomeTextCreate'>Crea tu nueva cuenta</span>

          </div>

          <div className='LogInSpanInputCreate'>

            <span className='inpuTextCreate'>Email</span>

            <input placeholder='Ingrese su email' type="email" className='LogInputCreate' onChange={(e) => { setEmail(e.target.value) }}></input>

          </div>

          <div className='LogInSpanInputCreate'>

            <span className='inpuTextCreate'>Contraseña</span>

            <input placeholder='Ingrese su contraseña' type="password" className='LogInputCreate' onChange={(e) => { setPassword(e.target.value) }}></input>

          </div>

          <div className='LogInSpanInputCreate'>

            <span className='inpuTextCreate'>Reingrese la contraseña</span>

            <input placeholder='Reingrese la contraseña' type="password" className='LogInputCreate' onChange={(e) => { setPasswordBis(e.target.value) }}></input>

          </div>
          
          <div className='LogInButtonCreate'>

            <button type='button' className='LogInEmailPassButtonCreate' onClick={() => { CreateAccountEmailPass() }}>Crear cuenta</button>

          </div>

          <div className='CreateAccountError'>

            <div className='CreateError' style={{ visibility: ErrorHandler.state ? "visible" : "hidden" }}>

              <span className='CreateErrorCode'>{ErrorHandler.code}</span>

            </div>

          </div>


        </div>

      </div>

    </div>
  )
}

export default LoginPanel