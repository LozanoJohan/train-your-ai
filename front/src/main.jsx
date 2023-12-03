import React, { createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { MetaMaskProvider } from '@metamask/sdk-react';
import './index.css'



export const useContract = () => {
  return useContext(ContractContext);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
