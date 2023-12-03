import React, { useState } from 'react';
import axios from 'axios';


export function DropFile({ childer, className, setFileURL, text }) {
    const [message, setMessage] = useState('');

    const JWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YTY5YmQ5Yi0yMzg4LTRiYmYtOTI2MS1kNDFlNTUyOWMzZmYiLCJlbWFpbCI6Impsb3phbm9sQHVuYWwuZWR1LmNvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjBiNWFkYTM2OTA3MmRhOWYwZTYxIiwic2NvcGVkS2V5U2VjcmV0IjoiMDU0ZmJlMjBhMzRiNDc3MzU5YTRjYjZmMGViMzE2ZTY1ZDkxNDM5MzNiMDhmZjg5NWZmNzA0MWRlMjQwMDc1OCIsImlhdCI6MTcwMTU5NjAxOH0.dcu656I9ZYgzESO5rXTjFctJARpAJIuNb2www-fs7UU"

    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;

        if (files.length === 1) {
            // Aquí puedes realizar acciones con los archivos, como cargarlos o procesarlos.

            const formData = new FormData();
            formData.append('file', files[0]);

            try {
                const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: JWT
                    },
                });

                if (response.status === 200) {
                    setMessage('Archivo cargado con éxito en Pinata. Hash de IPFS: ' + response.data.IpfsHash);
                    setFileURL(`https://fuchsia-acceptable-mastodon-220.mypinata.cloud/ipfs/${response.data.IpfsHash}`);
                } else {
                    setMessage('Error al cargar el archivo en Pinata.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('Error al cargar el archivo en Pinata.');
            }
        };

    };

    return (
        <div
            className={`border-dashed border-2 border-gray-300 p-4 rounded-md text-center ${isDragOver ? 'border-blue-700' : ''
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label
                htmlFor="fileInput"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                </svg>
                Subir archivo
            </label>
            <input type="file" id="fileInput" name="fileInput" className="hidden" />
            <p className="mt-2">
                Arrastra y suelta un archivo aquí o haz clic para seleccionar uno.
            </p>
            <p>{message}</p>
        </div>
    );
}

