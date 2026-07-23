import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import LandPag from './Components/LandPag'
import Vehicles from './Components/Vehicles'
import { ScrollProvider } from './Components/Scroller'
import { MainFavorites } from './Components/MainFavoritesManager'
import Services from './Components/Services'
// import News from './Components/News'
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
import FavMainButton from './Components/FavMainButton'
import FavoritesPortal from './Components/FavoritesPortal'

function App() {

  return (
    
    <BrowserRouter>
    <ScrollToTop />
    <MainFavorites>
     <Routes>
       <Route path="/" element={[<ScrollProvider><FavMainButton /><LandPag /><VehiclesB /><Services /><Footer /></ScrollProvider>]}/>
       <Route path="/login" element={[<LoginPanel />]} />
       <Route path="/createAccount" element={[<CreateAccountPanel />]} />
       <Route path="/verification" element={[<ToVerificate />]} />
       <Route path="/forgotpass" element={[<ForgotPassword />]}></Route>
       <Route path="/services" element={[<ScrollProvider><FavMainButton /><ServicesPortal /><Footer /></ScrollProvider>]}></Route>
       <Route path="/catalogue" element={[<ScrollProvider><FavMainButton /><CataloguePortal /><Vehicles /><Footer /></ScrollProvider>]}></Route>
       <Route path="/favorites" element={[<ScrollProvider><CataloguePortal /><FavoritesPortal /><Footer /></ScrollProvider>]}></Route> 
     </Routes>
     </MainFavorites>
    </BrowserRouter>

  )
}

export default App
