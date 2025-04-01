import { createContext, useState, useContext, useEffect } from "react";
export const ModalContext = createContext()


export const ModalProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        < ModalContext.Provider value={{ modalOpen, toggleModal }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)

