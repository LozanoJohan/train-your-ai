import { useState } from 'react';
import { ethers } from 'ethers';
import { GetStarted } from './pages/GetStarted';
import { UploadModel } from './pages/UploadModel';
import { MyModels } from './pages/MyModels';
import { Sidebar } from './components/Sidebar';


export default function App() {
  const [address, setAdress] = useState("");

  const [page, setPage] = useState(0)

  if (!address) return (
    <div className='flex flex-row'>
      <Sidebar setPage={setPage}/>
      <GetStarted setAdress={setAdress} />
    </div>
  )

  else
    switch (page) {
      case 0:
        return (
          <div className='flex flex-row'>
            <Sidebar setPage={setPage}/>
            <UploadModel address={address} />
          </div>
        )

      case 1:
        return (
          <div className='flex flex-row'>
            <Sidebar setPage={setPage}/>
            <MyModels />
          </div>
        )
    }

}


