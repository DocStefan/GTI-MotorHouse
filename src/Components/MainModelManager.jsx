import React from "react";
import { useContext, createContext, useState } from "react";

export const ModelContext = createContext()

export function MainModelManager({children}) {

   let [HomeModelSelected, setHomeModelSelected] = useState({ModeloSeleccionado: ""})

  return (
    <ModelContext.Provider value={{HomeModelSelected, setHomeModelSelected}}>
     {children}
    </ModelContext.Provider>
  )
}
