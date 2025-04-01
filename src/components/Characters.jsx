import React from 'react'
import { useCharacters } from '../context/CharactersContext'
import Card from './Card'


const Characters = () => {
    const { characters } = useCharacters()
    return (
        <>

            <div className="flex flex-wrap justify-center gap-3 p-3 ">

                {
                    characters && characters.map((character) => (

                        <Card key={character.id} id={character.id} name={character.name} status={character.status} image={character.image} />

                    ))
                }
            </div>
        </>
    )

}

export default Characters