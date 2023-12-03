import React, { useState } from 'react';

export const Sidebar = ({ setPage, address }) => {
    return (
        <aside className='bg-slate-950 h-screen w-1/4 max-w-xs flex flex-col p-5 justify-between'>
            <div className="flex flex-row items-center">
                <img src="/logo.png" alt="logo" className="w-20" />
                <h2 className="text-4xl font-bold">TrainYourAI</h2>
            </div>
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
                <button className='my-1 flex flex-row items-center justify-around' onClick={() => setPage(3)}>
                    <p>Chat     powered by</p>
                    <img className="h-fit" src="data:image/webp;base64,UklGRtoDAABXRUJQVlA4WAoAAAAQAAAAbQAAKQAAQUxQSBYCAAABgFVbWxDri0AEIhCBCEYgghH+BkYgghGIQAQiEOE8iMjMddZ9jYgJ0NjtlVOPd9rh9cbW6Tk8c0eD7F7HVVrS4ljo4WVc5XBav9PDq7hKkhRyiU9cOTdJoffwJicmuRNqGFjr2Q1OKEGK1BeJFMlXStDwAKgXyR/0IBn2HgUvV9k1TgxtIMXeg9S6ewtPlg5Mw9S47TZQpEiJdBfK5O6/ogAzO5scVVdfmK7hokyU47yLzPb0fSdSIl1C52EPF0+WSlsD6etKlTJOkus87kGSapUOZloZ1gv+27ZNOpskFRbWS25S2Kc2DX0F8rdNJpaankfAD+Q69D9T1/RF+0gZkMwsDbyZxcFmZsl/xLN4W2M3xwAogwiYpNgY2p2zBjVN7auOz7RFgfvjpjOsbsJWlY9k4FxRgHYUgDC6LxNlVV1TzMyOBrCtAJqTEt3cXasX0sdYM3tq0SlJQddLj1LowPnHTrekA+Z1e0mSFIHyp2rS9dnBtZ/J3Wn4d0zzz1y9AC38BCm1Ad3/BimkDJDfqEIfpBlJAahvdAImyTUgSv6oTpIa9DeKAOe2N6BJCahR3oDyRipMbpJnNr2Sq3eHJKWJrGWB5fs3yFm/tE3DWAfdtMhtR19HTn7Om1l8JCnGGDTpo21RwxBjHMUYwyXz4Tb3huePcfZh/zb/5VAm0y/YmTx/gWsT4Rco9FFP+o0udyB7vTRWUDggngEAADAMAJ0BKm4AKgA+ZSiRRaQiohYXYEAGRLEAaPYhPL+Jr6XxV6Pnoc7hfdAP6r1CnoAeVP+0XwOfuP6WGYjfhBTMgex5pv+fajS3AedtTSyk/ulWx9EadpGDsRV1+Cd8pXOM9G7P1hJYfgAA+TFJH5GNTKN//xMMEipOvUZUFE2Wg2Xe/C+E72v7DVx094j/6u7FSVWk4Z0Av/y+5t+Mfk5zEVFcTdWyVRaXchtZOcDkYQyo6pk7vMQUuV174jW/nXrw79L9oiA3CWE+Wm5WhTDGtv2jf//XQLHeMPi8nw3RgFLDCahmggk4KsDLZNtJqtD/oAn1jC/jBnC///4QSL3eZ0R0QLK9HF7h+zqnEu4dwPL3M+rBUuux2mjL7QpfPfo9/1MK5qo3IxDk8JTN/OKU5hlW6ExNV9wP4/9dpsBggWstQcxdiO+FrNsguJLjvH55GRbH+mr6/5K2t8Z3gOjkt75e+yAGsSw1qDMXvel/LFryeXV9f8C1yCefIrq/aYcaa2DHtj+f9+K5nyF4LkgqkXTGfhUXtAVETcgAAA==" srcset="data:image/webp;base64,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 2x, data:image/webp;base64,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 3x" alt="Push Logo" />
                </button>
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

