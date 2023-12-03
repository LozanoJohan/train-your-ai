import React, { useState } from 'react';

export const Sidebar = ({ setPage, address }) => {
    return (
        <aside className='bg-slate-950 h-screen w-1/4 max-w-xs flex flex-col p-5 justify-between'>
            <div className='flex flex-col '>
                <p>Para quienes necesiten entrenar</p>
                <button className='my-1' onClick={() => setPage(0)}>Subir Modelo</button>
                <button className='my-1' onClick={() => setPage(1)}>Mis Modelos</button>
            </div>
            <div className='flex flex-col '>
                <p>Para quienes quieran entrenar</p>
                <button className='my-1' onClick={() => setPage(2)}>Ver modelos disponibles</button>
                {/* <button className='my-1' onClick={() => setPage(1)}>Mis Modelos</button> */}
            </div>
            <div className='flex flex-col '>
                <button className='my-1' onClick={() => setPage(3)}>Chat</button>
                {/* <button className='my-1' onClick={() => setPage(1)}>Mis Modelos</button> */}
                <p className='truncate'>{address ? address : "Wallet no conectada"}</p>
            </div>
        </aside>
    )
}

















const SwitchButton = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="flex items-center space-x-2 mb-20">
            <span className={isChecked ? "text-gray-100" : "text-green-500"}>Creador</span>
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        onChange={toggleSwitch}
                    />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform transform ${isChecked ? 'translate-x-6' : ''}`}></div>
                </div>
            </label>
            <span className={!isChecked ? "text-gray-100" : "text-green-500"}>Entrenador</span>
        </div>
    );
};

