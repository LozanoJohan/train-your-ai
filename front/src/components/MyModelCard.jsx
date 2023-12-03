import { useState } from "react";

export const MyModelCard = ({ address, contract }) => {
    const [showDemostration, setShowDemostration] = useState(false)
    const [modelLink, setModelLink] = useState('')
    const [img, setImg] = useState("")


    const handleLike = async (num) => {
        // setIsTraining(false)
        const result2 = await contract.methods.RecibirGusta(num).send({
            from: address,
        });
        const result = await contract.methods.RecibirGusta(num).call({
            from: address,
        })
        setModelLink(result)
    }

    const viewDemostration = async () => {
        setShowDemostration(true)
        // Llama a la función LeerNecesidad en el contrato

        const result = await contract.methods.LeerSolucion().call()
        // Actualiza los estados con los valores devueltos
        setImg(result);
        // setBalance(web3.utils.fromWei(result[3], 'ether')); // Convierte el balance de wei a ether
    }
    return (
        <>
            <h2>Modelo 1</h2>
            <hr />
            {showDemostration ? <>
                <img className="max-w-2xl my-3" src={img} alt="imagen de demostracion" />
                <div className="flex flex-row space-x-6">
                    <button onClick={() => handleLike(1)}>¡Me gustó! 👍 | Descargar modelo</button>
                    <button onClick={() => handleLike(0)}>¡No me gustó! 😡 | Recivir devolución</button>
                </div>
            </> : <button onClick={viewDemostration}>Ver demostracion</button>}
            {modelLink && <a href={modelLink}>Descargar modelo entrenado</a>}
        </>
    )
}