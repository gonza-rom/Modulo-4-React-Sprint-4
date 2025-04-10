// Importa los hooks de React necesarios
import { createContext, useState, useContext, useEffect } from "react";

// Crea el contexto que será usado para manejar el estado del modal
export const ModalContext = createContext()

// Componente proveedor del contexto Modal
export const ModalProvider = ({ children }) => {

    // Estado que indica si el modal está abierto (true) o cerrado (false)
    const [modalOpen, setModalOpen] = useState(false)

    // Función para alternar el estado del modal (abrir/cerrar)
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    // Devuelve el proveedor del contexto, compartiendo el estado y la función
    return (
        < ModalContext.Provider value={{ modalOpen, toggleModal }}>
            {children}
        </ModalContext.Provider>
    )
}

// Hook personalizado para acceder fácilmente al contexto desde otros componentes
export const useModal = () => useContext(ModalContext)
