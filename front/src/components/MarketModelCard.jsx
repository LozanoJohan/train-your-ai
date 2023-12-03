import { useState } from "react"
import { DropFile } from "./dropFile"

export const MarketModelCard = ({ className, contract, address }) => {
    const [isTraining, setIsTraining] = useState(false)
    const [info, setInfo] = useState()
    const [fileURL1, setFileURL1] = useState();
    const [fileURL2, setFileURL2] = useState();

    const [dockerfileUrl, setDockerfileUrl] = useState(''); // URL de IPFS del Dockerfile
    const [codeUrl, setCodeUrl] = useState(''); // URL de IPFS del código

    const downloadFile = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], 'file', { type: blob.type });
    };

    const startTraining = async (e) => {
        e.preventDefault();

        setIsTraining(true)

        setDockerfileUrl(info[2]);
        setCodeUrl(info[1]);

        try {
            const dockerfile = await downloadFile(dockerfileUrl);
            const code = await downloadFile(codeUrl);

            console.log(dockerfile);

            const formData = new FormData();
            formData.append('dockerfile', dockerfile);
            formData.append('code', code);

            const response = await fetch(' https://78d0-190-60-231-2.ngrok-free.app/build-and-run', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error al enviar los archivos:', error);
        }
    };

    const handleSubmit = () => {
        setIsTraining(false)

        contract.methods.SubirSolucion(fileURL1, fileURL2).send({
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

        const result = await contract.methods.LeerNecesidad().call()
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
                        <a target="_blank" href={info[1]}>Descargar imagen docker</a>
                        <br />
                        <a target="_blank" href={info[2]}>Descargar código</a>
                        <br />
                    </>}
                    <button onClick={startTraining}>Entrenar</button>
                </>
                    : <>
                        <DropFile className="my-2" setFileURL={setFileURL1} id="1">Subir imagen de demostración</DropFile>
                        <br />
                        <DropFile className="my-2" setFileURL={setFileURL2} id="2">Subir modelo</DropFile>
                        <button onClick={handleSubmit}>Subir</button>
                    </>
            }

        </div>
    )
}