import Navbar from './Components/Navbar/Navbar'
import Favoritos from './Components/Favoritos/Favoritos'
import MiPerfil from './Components/MiPerfil/MiPerfil'
import MisCompras from './Components/MisCompras/Navbar'
import Notificaciones from './Components/Notificaciones/Notificaciones'
import CarritoDeCompras from './Components/CarritoDeCompras/CarritoDeCompras'
import Home from './Components/Home/Home'
// routes
import { Routes, Route } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store  from './Redux'

function App() {

  return (
    <div>
      <Provider store={store}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Favoritos" element={<Favoritos/>}/>
        <Route path="/MiPerfil" element={<MiPerfil/>}/>
        <Route path="/MisCompras" element={<MisCompras/>}/>
        <Route path='Notificaciones' element={<Notificaciones/>}/>
        <Route path="CarritoDeCompras" element={<CarritoDeCompras/>}/>
      </Routes>
      </Provider>
    </div>
  )
}

export default App
