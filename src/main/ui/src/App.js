import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Product from './pages/Product/Product';
import Reserva from './pages/Reserva/Reserva';
import ProductoExitoso from './pages/ProductoExitoso/ProductoExitoso';
import ReservaExitosa from './pages/ReservaExitosa/ReservaExitosa';
import Administracion from './pages/Administracion/Administracion';
import Error from './pages/Error/Error';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/product/:id' element={<Product/>} />
            <Route path='/product/:id/reserva' element={<Reserva/>} />
            <Route path='/reserva-exitosa' element={<ReservaExitosa/>} />
            <Route path='/producto-exitoso' element={<ProductoExitoso/>} />
            <Route path='/administracion' element={<Administracion/>} />
            <Route path="*" element={<Error/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      </UserProvider>
  );
}

export default App;
