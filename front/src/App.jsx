import { useState } from 'react';
import { ethers } from 'ethers';
import { GetStarted } from './pages/GetStarted';
import { UploadModel } from './pages/UploadModel';
import { MyModels } from './pages/MyModels';
import { Sidebar } from './components/Sidebar';
import { ViewModels } from './pages/ViewModels';


export default function App() {
  const [address, setAdress] = useState("");
  const [page, setPage] = useState(0);

  if (!address) return (
    <div className='flex flex-row'>
      <Sidebar setPage={setPage} address={address}/>
      <GetStarted setAdress={setAdress} />
    </div>
  )

  else
    switch (page) {
      case 0:
        return (
          <div className='flex flex-row'>
            <Sidebar setPage={setPage} address={address} />
            <UploadModel address={address} className={"flex flex-col w-full items-center"} />
          </div>
        )

      case 1:
        return (
          <div className='flex flex-row'>
            <Sidebar setPage={setPage} address={address} />
            <MyModels className={"flex flex-col w-full items-center"} />
          </div>
        )

      case 2:
        return (
          <div className='flex flex-row'>
            <Sidebar setPage={setPage} address={address} />
            <ViewModels className={"flex flex-col w-full items-center"} />
          </div>
        )
    }

}


