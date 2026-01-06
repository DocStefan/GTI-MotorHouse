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

function App() {

  return (
    
    <BrowserRouter>
     <Routes>
       <Route path="/" element={[<ScrollProvider><MainModelManager><LandPag /><Vehicles /><Services /><News /><Footer /></MainModelManager></ScrollProvider>]} />
     </Routes>
    </BrowserRouter>

  )
}

export default App
