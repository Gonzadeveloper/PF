import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import MiPerfil from './Components/MyProfile/MyProfile';
import Favorites from './Components/Favorites/Favorites';
import MyShopping from './Components/MyShopping/My shopping';
import ShoppingCart from './Components/ShoppingCart/ShoppingCartI';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import Help from './Components/Help/Help';
import ProductDetail from './Components/Detail/Detail';
import NewProduct from './Components/NewProduct/NewProduct';
import Buy from './Components/Buy/Buy';
import Approved from './Components/Buy/approved/Approved';
import Disapproved from './Components/Buy/disapproved/Disapproved';
import Review from './Components/Review/Review';
import LoginForm from './Components/Admin/LoginForm'; // Importar el componente LoginForm
import Admin from './Components/Admin/Admin'; // Importar el componente Admin
import { useDispatch } from 'react-redux';
import { getAllProds } from './Redux/Actions/productActions';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    dispatch(getAllProds());
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');
    if (redirectPath === 'Buy/Approved') {
      navigate('/Buy/Approved');
    } else if (redirectPath === 'Buy/Disapproved') {
      navigate('/Buy/Disapproved');
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <ShoppingCart />
      <div className="container flex-grow-1">
        <Routes>
          <Route path="/Buy" element={<Buy />} />
          <Route path="/" element={<Home />} />
          <Route path="/Favoritos" element={<Favorites />} />
          <Route path="/MiPerfil" element={<MiPerfil />} />
          <Route path="/MisCompras" element={<MyShopping />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          {/* Ruta protegida para Admin */}
          {isLoggedIn ? (
            <Route path="/admin/*" element={<Admin />} />
          ) : (
            <Route path="/admin/*" element={<LoginForm onLogin={handleLogin} />} />
          )}
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="Buy/Approved" element={<Approved />} />
          <Route path="Buy/Disapproved" element={<Disapproved />} />
          <Route path="/review/:productId" element={<Review />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;