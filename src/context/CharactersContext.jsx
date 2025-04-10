// Importa los hooks necesarios de React
import { createContext, useState, useContext, useEffect } from "react";

// Crea el contexto llamado CharactersContext
export const CharactersContext = createContext()

// Define un componente proveedor del contexto
export const CharactersProvider = ({ children }) => {

  // Estado para guardar todos los personajes
  const [characters, setCharacters] = useState([])

  // Estado para guardar los personajes marcados como favoritos
  const [favourites, setFavourites] = useState([])

  // Función para agregar o quitar un personaje de favoritos
  const toggleFavourite = (nuevoItem) => {

    // Busca si el personaje ya está en la lista de favoritos
    const indiceExistente = favourites.findIndex(item => item.id === nuevoItem.id);

    // Si ya existe en favoritos (índice >= 0), lo elimina
    if (indiceExistente >= 0) {
      const newFavourites = favourites.filter(item => item.id !== nuevoItem.id);
      setFavourites(newFavourites); // actualiza el estado
      localStorage.setItem("favourites", JSON.stringify(newFavourites)); // guarda en localStorage
    }
    else {
      // Si no está en favoritos, lo agrega al array
      setFavourites([...favourites, nuevoItem]); // actualiza el estado con el nuevo item
      localStorage.setItem("favourites", JSON.stringify([...favourites, nuevoItem])); // guarda en localStorage
    }
  }

  // Función que verifica si un personaje (por ID) está en favoritos
  const isInFavourites = (id) => {
    return favourites.some(item => item.id === id);
  }

  // Hook que se ejecuta una sola vez al montar el componente
  // Carga los favoritos guardados desde localStorage
  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || []
    setFavourites(savedFavourites)
  }, [])

  // El componente proveedor expone los valores y funciones del contexto
  return (
    <CharactersContext.Provider value={{ characters, setCharacters, favourites, toggleFavourite, isInFavourites }} >
      {children}
    </CharactersContext.Provider>
  )
}

// Hook personalizado para acceder fácilmente al contexto desde otros componentes
export const useCharacters = () => useContext(CharactersContext)