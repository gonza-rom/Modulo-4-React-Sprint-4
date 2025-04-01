import React, { useCallback, useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCharacters } from '../context/CharactersContext'
import { useModal } from '../context/ModalContext'
import Favourites from './Favourites'
import { RotatingLines } from 'react-loader-spinner'

const SearchForm = () => {
    const [nombre, setNombre] = useState('')
    const [cantidadPedida, setCantidadPedida] = useState('')
    const [loading, setLoading] = useState(false)
    const idToast = useRef(null)

    const [error, setError] = useState(null)
    const { setCharacters } = useCharacters()
    const { modalOpen } = useModal();


    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        setCharacters([])

        try {
            let url = `https://rickandmortyapi.com/api/character/?name=${nombre}`
            let personajesAMostrar = []
            let personajesMostrados = 0
            let mostrarMas = true

            while (mostrarMas) {
                const response = await axios.get(url)
                if (response.status !== 200) {
                    toast.update(idToast.current, { render: `No se encontraron  personajes`, type: "error", isLoading: false, autoClose: 5000 });
                } else {
                    const { count, next } = response.data.info //obtenemos la cantidad de personajes y la url para la siguiente paginacion

                    if (count > personajesMostrados) {
                        personajesAMostrar = [...personajesAMostrar, ...response.data.results] // va guardando los personajes en un array
                        personajesMostrados += response.data.results.length //incrementa la cantidad de personajes guardados paa mostrar
                        url = next //actualiza la url para la siguiente paginacion

                        if (cantidadPedida < personajesMostrados) { //si ya se guadaron mas personajes que los pedidos

                            personajesAMostrar = personajesAMostrar.slice(0, cantidadPedida) //re reduce el array a la cantidad de personajes pedidos
                            mostrarMas = false
                        }
                        if (count <= cantidadPedida) { //si la cantidad de personajes encontrados es menor a la cantidad pedida sale del bucle                            
                            mostrarMas = false
                        }
                    }
                    setCharacters(personajesAMostrar)

                    if (count >= cantidadPedida) {
                        toast.update(idToast.current, { render: `Se muestran los primeros ${cantidadPedida} personajes`, type: "success", isLoading: false, autoClose: 5000 });
                    }
                    else {
                        toast.update(idToast.current, { render: `Se encontraron ${response.data.results.length} personajes`, type: "success", isLoading: false, autoClose: 5000 });
                    }
                }
            }
        } catch (e) {
            setError(e.message)

            if (e.response.status === 404) {
                toast.update(idToast.current, { render: `No se encontraron  personajes`, type: "error", isLoading: false, autoClose: 5000 });
            } else {
                toast.update(idToast.current, { render: error, type: "error", isLoading: false, autoClose: 5000 });
            }

        }
        finally {
            setLoading(false)
        }
    }, [nombre, cantidadPedida])

    const handleSummit = async (e) => {
        e.preventDefault()

        //validaciones
        if (nombre.trim().length < 3) {
            toast.error('Debe indicar al menos 3 caracteres del nombre a buscar', {
                position: 'top-center'
            })
            return
        }

        if (!cantidadPedida > 0) {
            toast.error('Debe indicar la cantidad de personajes', {
                position: 'top-center'
            })
            return
        }

        // toast.info(`Buscando con el nombre ${nombre}`)
        idToast.current = toast.loading("Buscando...")
        fetchData()
    }
    return (
        <>
            {
                modalOpen && <Favourites />
            }


            {/* loader */}
            <div className='flex flex-content flex-col text-white p-4 w-full items-center'  >
                {loading && <div className='  absolute flex justify-center items-center z-50 '>
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
                }
                <div className='flex flex-col center p-10 bg-gray-800 opacity-90 rounded-lg justify-center items-center'>
                    <h1 className='text-3xl p-3'>Buscar</h1>
                    <form onSubmit={handleSummit}>

                        <input
                            type="text"
                            id="txtnombre"
                            name="txtnombre"
                            size={25}
                            placeholder="Escribe el nombre a buscar"
                            onChange={(e) => setNombre(e.target.value)}
                            className='border-1 border-green-400 p-2'
                        />

                        <input
                            type="number"
                            id="inputCantidad"
                            name="inputCantidad"
                            size={5}
                            placeholder="Cantidad de personajes"
                            onChange={(e) => setCantidadPedida(e.target.value)}
                            className='border-1 border-green-400 p-2'
                        />
                        <button
                            type="submit"
                            className='bg-green-700 m-4 p-2 rounded cursor-pointer hover:bg-green-500'
                        >
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SearchForm