import { useState } from 'react';
import { ethers } from 'ethers';

export function GetStarted({setAdress}) {

  
    const connectMetamask = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Solicitar la conexión a la cuenta MetaMask
          await window.ethereum.request({ method: "eth_requestAccounts" });
  
          // Obtener la dirección después de que el usuario haya autorizado
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const _address = await signer.getAddress();
          setAdress(_address)
        } catch (err) {
          console.error(err);
  
          // Si el usuario cancela la autorización, puede manejarlo aquí
          if (err.code === 4001) {
            console.log("Usuario canceló la autorización.");
          }
        }
      } else {
        handleShow();
      }
    };
  
  
    return (
      <div className='flex flex-col items-center justify-center h-screen w-screen'>
        <img className="w-10" src="/flower.png" alt="flor" />
        <h1 className="mb-5">Entrena tu IA!</h1>
        <button onClick={connectMetamask}>Comenzar</button>
      </div>
    )
  }
  
  
  