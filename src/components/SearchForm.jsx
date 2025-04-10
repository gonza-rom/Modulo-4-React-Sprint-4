import React, { useCallback, useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCharacters } from '../context/CharactersContext'
import { useModal } from '../context/ModalContext'
import Favourites from './Favourites'
import { RotatingLines } from 'react-loader-spinner'

const SearchForm = () => {
    // Estados para los inputs del formulario
    const [nombre, setNombre] = useState('')
    const [cantidadPedida, setCantidadPedida] = useState('')
    
    // Estado para mostrar spinner de carga
    const [loading, setLoading] = useState(false)
    
    // Referencia para el toast que se actualiza
    const idToast = useRef(null)

    // Estado para almacenar errores
    const [error, setError] = useState(null)

    // Funciones y estados del contexto
    const { setCharacters } = useCharacters()
    const { modalOpen } = useModal();

    // Función para buscar personajes usando la API
    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        setCharacters([]) // limpiamos personajes anteriores

        try {
            let url = `https://rickandmortyapi.com/api/character/?name=${nombre}`
            let personajesAMostrar = []
            let personajesMostrados = 0
            let mostrarMas = true

            // Bucle para paginar los resultados hasta obtener la cantidad deseada
            while (mostrarMas) {
                const response = await axios.get(url)

                if (response.status !== 200) {
                    // Si la respuesta no es exitosa, mostrar error
                    toast.update(idToast.current, { render: `No se encontraron personajes`, type: "error", isLoading: false, autoClose: 5000 });
                } else {
                    const { count, next } = response.data.info

                    // Si hay más personajes por mostrar
                    if (count > personajesMostrados) {
                        personajesAMostrar = [...personajesAMostrar, ...response.data.results]
                        personajesMostrados += response.data.results.length
                        url = next

                        // Si ya se obtuvieron suficientes personajes
                        if (cantidadPedida < personajesMostrados) {
                            personajesAMostrar = personajesAMostrar.slice(0, cantidadPedida)
                            mostrarMas = false
                        }

                        // Si no hay más personajes para seguir buscando
                        if (count <= cantidadPedida) {
                            mostrarMas = false
                        }
                    }

                    // Guardar los personajes en el contexto global
                    setCharacters(personajesAMostrar)

                    // Mostrar mensaje de éxito según la cantidad obtenida
                    if (count >= cantidadPedida) {
                        toast.update(idToast.current, { render: `Se muestran los primeros ${cantidadPedida} personajes`, type: "success", isLoading: false, autoClose: 5000 });
                    } else {
                        toast.update(idToast.current, { render: `Se encontraron ${response.data.results.length} personajes`, type: "success", isLoading: false, autoClose: 5000 });
                    }
                }
            }
        } catch (e) {
            setError(e.message)

            // Manejo de errores específicos (como 404)
            if (e.response && e.response.status === 404) {
                toast.update(idToast.current, { render: `No se encontraron personajes`, type: "error", isLoading: false, autoClose: 5000 });
            } else {
                toast.update(idToast.current, { render: error, type: "error", isLoading: false, autoClose: 5000 });
            }

        } finally {
            setLoading(false) // Ocultar spinner
        }
    }, [nombre, cantidadPedida])

    // Manejador del submit del formulario
    const handleSummit = async (e) => {
        e.preventDefault()

        // Validación: nombre debe tener al menos 3 letras
        if (nombre.trim().length < 3) {
            toast.error('Debe indicar al menos 3 caracteres del nombre a buscar', {
                position: 'top-center'
            })
            return
        }

        // Validación: cantidad pedida debe ser mayor a 0
        if (!cantidadPedida > 0) {
            toast.error('Debe indicar la cantidad de personajes', {
                position: 'top-center'
            })
            return
        }

        // Mostrar un toast mientras se realiza la búsqueda
        idToast.current = toast.loading("Buscando...")

        // Ejecutar la función que busca los personajes
        fetchData()
    }

    return (
        <>
            {/* Mostrar el componente de favoritos si el modal está abierto */}
            {
                modalOpen && <Favourites />
            }

            {/* Loader mientras se realiza la búsqueda */}
            <div className='flex flex-content flex-col text-white p-4 w-full items-center'>
                {loading && <div className='absolute flex justify-center items-center z-50'>
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                    />
                </div>
                }

                {/* Formulario principal */}
                <div className='flex flex-col center p-10 bg-gray-800 opacity-90 rounded-lg justify-center items-center'>
                    <h1 className='text-3xl p-3'>Buscar</h1>
                    <form onSubmit={handleSummit}>
                        {/* Input para el nombre */}
                        <input
                            type="text"
                            id="txtnombre"
                            name="txtnombre"
                            size={25}
                            placeholder="Escribe el nombre a buscar"
                            onChange={(e) => setNombre(e.target.value)}
                            className='border-1 border-green-400 p-2'
                        />

                        {/* Input para la cantidad de personajes */}
                        <input
                            type="number"
                            id="inputCantidad"
                            name="inputCantidad"
                            size={5}
                            placeholder="Cantidad de personajes"
                            onChange={(e) => setCantidadPedida(e.target.value)}
                            className='border-1 border-green-400 p-2'
                        />

                        {/* Botón de búsqueda */}
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
