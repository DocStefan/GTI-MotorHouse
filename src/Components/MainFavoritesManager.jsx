import React from "react";
import { useContext, createContext, useState } from "react";

export const FavoritesContext = createContext()

export function MainFavorites({children}) {

   let [favoritesUpdate, setFavoritesUpdate] = useState(0)

  return (
    <FavoritesContext.Provider value={{favoritesUpdate, setFavoritesUpdate}}>
     {children}
    </FavoritesContext.Provider>
  )
}
