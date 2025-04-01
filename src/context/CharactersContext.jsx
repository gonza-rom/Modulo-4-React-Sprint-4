import { createContext, useState, useContext, useEffect } from "react";

export const CharactersContext = createContext()


export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([])
  const [favourites, setFavourites] = useState([])

  const toggleFavourite = (nuevoItem) => {

    const indiceExistente = favourites.findIndex(item => item.id === nuevoItem.id);

    // Si el item existe (índice >= 0),lo elimina del array
    if (indiceExistente >= 0) {
      const newFavourites = favourites.filter(item => item.id !== nuevoItem.id);
      setFavourites(newFavourites);
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    }
    else {
      // Si no existe, agrega el nuevo item al final del array
      setFavourites([...favourites, nuevoItem]);
      localStorage.setItem("favourites", JSON.stringify([...favourites, nuevoItem]));
    }
  }

  //devuelve un boolean que indica si el id del personaje ya esta en favoritos
  const isInFavourites = (id) => {
    return favourites.some(item => item.id === id);
  }

  //carga los favoritos del localstorage
  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || []
    setFavourites(savedFavourites)

  }, [])

  return (
    <CharactersContext.Provider value={{ characters, setCharacters, favourites, toggleFavourite, isInFavourites }} >
      {children}
    </CharactersContext.Provider>
  )
}

export const useCharacters = () => useContext(CharactersContext)

