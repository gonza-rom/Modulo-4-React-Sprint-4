import React from 'react'
import { useModal } from '../context/ModalContext';

const Header = () => {
    const { toggleModal } = useModal()

    return (
        <div className='relative bg-gradient-to-b from-cyan-900 to-cyan-400 p-4 md:pl-40 min-h-24 text-yellow-200'>

            <div className=" inset-0 flex items-center justify-center">
                <img src="rick.png" alt="Rick and Morty" className='h-30' />
            </div>

            <button className='text-yellow text-2xl creepster-regular hover:text-blue-200 cursor-pointer' onClick={() => toggleModal()}>Mis Favoritos</button>
        </div>
    )
}

export default Header;


