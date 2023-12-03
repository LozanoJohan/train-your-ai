import React, { useState } from 'react';


export function DropFile({childer, className}) {
    const [isDragOver, setIsDragOver] = useState(false);
  
    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };
  
    const handleDragLeave = () => {
      setIsDragOver(false);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
  
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        // Aquí puedes realizar acciones con los archivos, como cargarlos o procesarlos.
        console.log(files);
      }
    };
  
    return (
      <div
        className={`border-dashed border-2 border-gray-300 p-4 rounded-md text-center ${
          isDragOver ? 'border-blue-700' : ''
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
      </div>
    );
  }
  
  