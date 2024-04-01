import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Home from './Pages/HomePage/HomePage';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import MyCart from './Pages/MyCart/MyCart';
import Checkout from './Pages/Checkout/Checkout';
import Success from './Components/Success/Success';
import Invoices from './Pages/Invoices/Invoices';
import InvoicesDetails from './Components/InvoicesDetails/InvoicesDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:userId' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='/product/:userId/:productId' element={<ProductDetails />} />
          <Route path='/mycart/:userId' element={<MyCart />} />
          <Route path='/checkout/:userId' element={<Checkout />} />
          <Route path='/ordersuccess/:userId' element={<Success />} />
          <Route path='/invoices/:userId' element={<Invoices />} />
          <Route path='/invoices/:userId/:invoiceId' element={<InvoicesDetails />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

