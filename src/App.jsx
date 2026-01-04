import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import LandPag from './Components/LandPag'
import Vehicles from './Components/Vehicles'
import { ScrollProvider } from './Components/Scroller'
import { MainModelManager } from './Components/MainModelManager'

function App() {

  return (
    
    <BrowserRouter>
     <Routes>
       <Route path="/" element={[<ScrollProvider><MainModelManager><LandPag /><Vehicles /></MainModelManager></ScrollProvider>]} />
     </Routes>
    </BrowserRouter>

  )
}

export default App
