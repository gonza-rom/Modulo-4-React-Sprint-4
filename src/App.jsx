
import SearchForm from './components/SearchForm'
import Characters from './components/Characters';
import { ToastContainer } from 'react-toastify';
import { CharactersProvider } from './context/CharactersContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { ModalProvider } from './context/ModalContext';


function App() {


  return (
    <>
      <ToastContainer position='top-center' />
      <CharactersProvider>
        <ModalProvider>
          <div
            className='min-h-screen h-full relative'
            style={{ backgroundImage: 'url(/fondo.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black opacity-80"></div>
            <div className="relative z-10">
              <Header />
              <SearchForm />
              <Characters />
            </div>
          </div>
          <Footer />
        </ModalProvider>
      </CharactersProvider>
    </>
  )
}

export default App
