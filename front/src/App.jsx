import { useState, createContext, useContext } from 'react';
import { ethers } from 'ethers';
import { GetStarted } from './pages/GetStarted';
import { UploadModel } from './pages/UploadModel';
import { MyModels } from './pages/MyModels';
import { Sidebar } from './components/Sidebar';
import { ViewModels } from './pages/ViewModels';

import Web3 from 'web3';



export default function App() {

  const web3 = new Web3("https://celo-mainnet.infura.io/v3/353ed6e11e6b44029d331992d8bb387b");
  const contractAddress = '0x16c5594E7D47206AFDd1e303B9741CB1d36065d6';
  const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"prov","type":"address"}],"name":"CambiarProveedor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"LeerAceptar","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LeerCliente","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LeerNecesidad","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LeerProveedor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LeerSolucion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int256","name":"ace","type":"int256"}],"name":"RecibirGusta","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"ejem","type":"string"},{"internalType":"string","name":"mode","type":"string"}],"name":"SubirSolucion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"necesi","type":"string"},{"internalType":"string","name":"info","type":"string"},{"internalType":"string","name":"doc","type":"string"}],"name":"cargar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"}]
  const celoContract = new web3.eth.Contract(contractABI, contractAddress);

  const [address, setAdress] = useState("");
  const [page, setPage] = useState(0);

  if (!address) return (
    <div className='flex flex-row'>
      <Sidebar setPage={setPage} address={address} />
      <GetStarted setAdress={setAdress} />
    </div>
  )

  else
    switch (page) {
      case 0:
        return (
          <div className='flex flex-row'>
            <Sidebar setPage={setPage} address={address} />
            <UploadModel address={address} className={"flex flex-col w-full items-center"} contract={celoContract} />
          </div>
        )

      case 1:
        return (
          <div className='flex flex-row'>
            <Sidebar setPage={setPage} address={address} />
            <MyModels className={"flex flex-col w-full items-center"} contract={celoContract}/>
          </div>
        )

      case 2:
        return (
          <div className='flex flex-row'>
            <Sidebar setPage={setPage} address={address} />
            <ViewModels className={"flex flex-col w-full items-center"} contract={celoContract} address={address}/>
          </div>
        )
    }
}


