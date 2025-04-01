
const Footer = () => {

    return (

        < div className={`flex flex-col h-50 bottom-0 bg-green-900 px-20 pt-5  text-gray-200 `} >
            <ul className='space-y-5'>
                <li> <span className='hover:text-white hover:underline cursor-pointer '>Quienes somos</span></li>
                <li> <span className='hover:text-white hover:underline cursor-pointer '>Avisos legales</span></li>
                <li> <span className='hover:text-white hover:underline cursor-pointer '>Contactanos</span></li>
            </ul>

            <div className='flex  flex-row w-full justify-center content-stretch gap-5 text-xl'>

                <i className="bi bi-instagram"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-twitter-x"></i>


            </div>

        </div>
    )
}

export default Footer