import React from 'react'
import { useModal } from '../context/ModalContext'
import { useCharacters } from '../context/CharactersContext'
import Card from './Card'

const Favourites = () => {
    const { toggleModal } = useModal()
    const { favourites } = useCharacters()

    const handleClick = () => {
        toggleModal()
    }

    React.useEffect(() => {
        // Deshabilitar el scroll en la capa subyacente cuando se monta el componente
        document.body.style.overflow = 'hidden';

        // Restaurar el scroll cuando el componente se desmonta
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div
            className=' absolute flex flex-col  center p-10 bg-gray-800/96 rounded-lg h- z-50 m-5 min-w-45/46 overflow-y-auto    '
            style={{ height: 'calc(100vh - 220px)' }}
        >

            <button
                onClick={handleClick}
                className='absolute top-2 right-3 m-4 text-green-600  w-6 h-6  hover:text-green-400 cursor-pointer '
            >
                <i className="bi bi-x-square text-3xl"></i>
            </button>

            <h1 className='text-yellow-300  creepster-regular text-5xl p-3 text-center'>Mis Favoritos</h1>
            <div className="flex flex-wrap justify-center gap-3 p-3 ">
                {favourites && favourites.map((favourite) => (
                    <Card id={favourite.id} key={favourite.id} name={favourite.name} image={favourite.image} />
                ))}
            </div>

        </div>


    )
}

export default Favourites