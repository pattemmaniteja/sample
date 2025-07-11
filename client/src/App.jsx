import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import Inform from './pages/inform';
import Donate from './pages/donate';
import DashBoard from './pages/dashboard';
import Shop from './pages/shop';
import Payment from './pages/payment';
import Profile from './pages/profile';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
function App() {
  return (
    <>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inform" element={<Inform />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/dashboard" element={<DashBoard/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/payment" element={<Payment/>}/>   
            <Route path="/profile" element={<Profile/>}/>    
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
