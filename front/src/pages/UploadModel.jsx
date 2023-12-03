import { useState } from "react";
import { DropFile } from "../components/dropFile"
import Web3 from 'web3';
const web3 = new Web3();


export const UploadModel = ({ address, className, contract }) => {
    const [price, setPrice] = useState();
    const [inputText, setInputText] = useState('');
    const [fileURL1, setFileURL1] = useState();
    const [fileURL2, setFileURL2] = useState();

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const handleUpload = () => {
        contract.methods.deposit(price).send({
            from: address,
            value: web3.utils.toWei(price, 'ether')

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

        contract.methods.cargar(inputText, fileURL1, fileURL2).send({
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

    const getPrice = () => {
        setPrice(Math.random() * 4);
    }

    return (
        <div className={`${className}`}>
            <h1>Entrena Tu IA</h1>
            <DropFile className="my-2" setFileURL={setFileURL1} id="1">Subir archivo docker</DropFile>
            <br />
            <DropFile className="my-2" setFileURL={setFileURL2} id="2">Subir archivo python</DropFile>
            <br />
            <div className="w-full max-w-md mx-auto">
                <label htmlFor="iaRequest" className="block text-gray-700 text-sm font-bold mb-2">
                    ¿Qué necesitas de tu modelo de IA?
                </label>
                <input
                    type="text"
                    id="iaRequest"
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
                    placeholder="Escribe tu solicitud aquí..."
                    value={inputText}
                    onChange={handleChange}
                />
            </div>
            <button onClick={getPrice}>Entrenar modelo</button>
            {price && <> <p>Precio a pagar: <span className="text-green-600">{price}</span></p>
                <button onClick={handleUpload}>Pagar</button>
            </>}
        </div>
    )
}