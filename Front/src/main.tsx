import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom' // routes
import 'bootstrap/dist/css/bootstrap.min.css' // bootstrap 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from "react-redux";
import store from "./Redux/index.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>,
  </Provider>
)
