import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit';
import { ProductSlice } from './Redux/ProductSlice.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CartSlice } from './Redux/CartSlice.js';

const store = configureStore({
  reducer: {
    prodReducer: ProductSlice.reducer,
    CartReducer: CartSlice.reducer,

  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>


)
