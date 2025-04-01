import React from 'react'
import { useCharacters } from '../context/CharactersContext'

const Card = ({ id, name, status, image }) => {
    const { toggleFavourite, isInFavourites } = useCharacters()

    return (
        <div className='flex flex-col justify-between border-1 border-green-400 rounded-lg p-5  bg-gray-800 opacity-85 m-3  basis-64 shadow-md shadow-green-700 relative'>
            <img src={image} alt={name} className='w-70 rounded-sm' />

            <p className='text-gray-100 text-xl pt-2 ' >{name} </p>
            <p className='text-gray-200 text-m pt-2 ' >Status: {status} </p>

            <div className='absolute top-1 right-1'>
                <i className={` text-xl bi ${isInFavourites(id) ? 'bi-heart-fill text-red-700' : 'bi-heart'}`} onClick={() => toggleFavourite({ id, name, image })}></i>
            </div>
        </div>
    )
}

export default Card