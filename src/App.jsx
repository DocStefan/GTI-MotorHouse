import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import LandPag from './Components/LandPag'
import Vehicles from './Components/Vehicles'
import { ScrollProvider } from './Components/Scroller'
import { MainModelManager } from './Components/MainModelManager'
import Services from './Components/Services'
import News from './Components/News'
import Footer from './Components/Footer'
import LoginPanel from './Components/LoginPanel'
import CreateAccountPanel from "./Components/CreateAccountPanel"
import ToVerificate from "./Components/ToVerificate"
// import { UserProvider } from './Components/UserStatus'
import ForgotPassword from "./Components/ForgotPassword"
import ServicesPortal from './Components/ServicesPortal'
import ScrollToTop from './Components/ScrollToTop'
import CataloguePortal from './Components/CataloguePortal'
import VehiclesB from './Components/VehiclesB'

function App() {

  return (
    
    <BrowserRouter>
    <ScrollToTop />
     <Routes>
       <Route path="/" element={[<ScrollProvider><MainModelManager><LandPag /><VehiclesB /><Services /><Footer /></MainModelManager></ScrollProvider>]}/>
       <Route path="/login" element={[<LoginPanel />]} />
       <Route path="/createAccount" element={[<CreateAccountPanel />]} />
       <Route path="/verification" element={[<ToVerificate />]} />
       <Route path="/forgotpass" element={[<ForgotPassword />]}></Route>
       <Route path="/services" element={[<ScrollProvider><ServicesPortal /><Footer /></ScrollProvider>]}></Route>
        <Route path="/catalogue" element={[<MainModelManager><ScrollProvider><CataloguePortal /><Vehicles /><Footer /></ScrollProvider></MainModelManager>]}></Route>
     </Routes>
    </BrowserRouter>

  )
}

export default App
