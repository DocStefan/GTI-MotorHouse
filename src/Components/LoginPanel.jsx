import React from 'react'
import { useState, useEffect, useRef, useId, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router'
import "../Styles/Login.css"
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, signInWithEmailLink, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { auth } from '../firebase'
import validator from "validator"
// import { userContext } from './UserStatus'

function LoginPanel() {

  const navigate = useNavigate()

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  let [ErrorHandler, setErrorHandler] = useState({state: false, code: ""})

  // const {isUserLogIn} = useContext(userContext)
  // const {setIsUserLogIn} = useContext(userContext)

  async function LogInEmailPass() {

    if(!email || !password) {

      setErrorHandler({state: true, code: "Error: el email o la contraseña son incorrectos"})
      return

    }

    if(!validator.isEmail(email)) {

      setErrorHandler({state: true, code: "Error: el email o la contraseña son incorrectos"})
      return

    }

    try {

      const userData = await signInWithEmailAndPassword(auth, email, password)
      console.log(userData.user) 


      if(!userData.user.emailVerified) {
        
        setErrorHandler({state: true, code: "Error: debe verificar su email"})
        await signOut(auth)
      
      } else {

        setErrorHandler({state: false, code: ""})
        // setIsUserLogIn(userData.user)
        navigate("/")

      }

      // este errorHandler solia estar fuera del if (arriba de este)

    } catch(error) {

      setErrorHandler({state: true, code: "Error: el email o la contraseña son incorrectos"})

    }

  }

  const provider = new GoogleAuthProvider()

  async function LogInGoogle() {

   try {

     const userData = await signInWithPopup(auth, provider)
    //  setIsUserLogIn(userData.user)
     navigate("/")

   } catch(error) {

    setErrorHandler({state: true, code: "Error: el email o la contraseña son incorrectos"})

   }

  }

  useEffect(() => {

    if(ErrorHandler) {

      setErrorHandler({state: false, code: ""})

    }

  }, [email, password])

  return (

    <div className="MainLogin">

      <div className='BackPickLogin'>

        <img loading='eager' decoding='async' fetchPriority='high' className='LoginPic' src="LogPic.webp"></img>

      </div>

      <div className='LoginPanelContainer'>

        <div className='LoginInput'>

          <div className='LogInLogo'>

            <img loading='eager' decoding='async' fetchPriority='high' className='LogInLogoPic' src="logoc.webp" ></img>

          </div>

          <div className='LogInWelcomeText'>

            <span className='FirstWelcomeText'>¡Bienvenido!</span>

            <span className='SecondWelcomeText'>Tu nuevo auto te esta esperando</span>

          </div>

          <div className='LogInSpanInput'>

            <span className='inpuText'>Email</span>

            <input placeholder='Ingrese su email' type="email" className='LogInput' onChange={(e) => {setEmail(e.target.value)}}></input>

          </div>

          <div className='LogInSpanInput'>

            <span className='inpuText'>Contraseña</span>

            <input placeholder='Ingrese su contraseña' type="password" className='LogInput' onChange={(e) => {setPassword(e.target.value)}}></input>

          </div>

          <div className='LogInForgotPassword'>

            <span className='ForgotSpan' onClick={() => {navigate("/forgotpass")}}>Olvide mi contraseña</span>

            <div className='LogInError' style={{ visibility: ErrorHandler.state ? "visible" : "hidden" }}>

            <span className='LogInErrorCode' style={{position:"absolute"}}>{ErrorHandler.code}</span>

            </div>

          </div>

          <div className='LogInButton'>

            <button type='button' className='LogInEmailPassButton' onClick={() => {LogInEmailPass()}}>Iniciar sesion</button>

          </div>

          <div className='LogInButton'>

            <button type='button' className='LogInGoogleButton' onClick={() => {LogInGoogle()}}><img loading='eager' decoding='async' fetchPriority='high' className='googleLogo' src="google.webp"></img>Iniciar sesion con Google</button>

          </div>

          <div className='LogInCreateAccount'>

            <span className='createFirstText'>¿No estas registrado?</span>

            <span className='createSecondText' onClick={() => {navigate("/createAccount")}}>Crea tu cuenta</span>

          </div>

        </div>

      </div>

    </div>
  )
}

export default LoginPanel