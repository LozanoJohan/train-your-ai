import { useState } from "react"
import { DropFile } from "./dropFile"

export const MarketModelCard = ({ className, contract, address }) => {
    const [isTraining, setIsTraining] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState()

    const startTraining = () => {
        contract.methods.SubirSolucion("un ejemplo", "un archivo de modelo").send({
            from: address,
        })
            .on('transactionHash', (hash) => {
                console.log('Hash de transacción:', hash);
            })
            .on('receipt', (receipt) => {
                console.log('Recibo de transacción:', receipt);
            })
            .on('error', (error) => {
                console.error('Error:', error);
            });
    }

    const viewInfo = async () => {
        // Llama a la función LeerNecesidad en el contrato
  
        const result = await contract.methods.LeerNecesidad().send({
            gasLimit: 100, 
            from: address// Set an appropriate gas limit based on the estimate
          });
        // Actualiza los estados con los valores devueltos
        setInfo(result);
        // setBalance(web3.utils.fromWei(result[3], 'ether')); // Convierte el balance de wei a ether
    }

    return (
        <div className={className}>
            <h2>Modelo 1</h2>
            <hr />
            {
                !isTraining ? <>
                    <button onClick={viewInfo}>Ver información</button>
                    {info && <>
                        <p>{info[0]}</p>
                    </>}
                    <button onClick={() => setIsTraining(true)}>Entrenar</button>
                </>
                    : <>
                        <DropFile></DropFile>
                        <button onClick={() => setIsTraining(false)}>Subir</button>
                    </>
            }

        </div>
    )
}