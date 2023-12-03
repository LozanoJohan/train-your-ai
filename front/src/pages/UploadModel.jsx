import { DropFile } from "../components/dropFile"

export const UploadModel = ({address, className}) => {
    return (
        <div className={`${className}`}>
            <h1>Entrena Tu IA</h1>
            <p>{address}</p>
            <DropFile className="my-2">Subir archivo docker</DropFile>
            <br />
            <DropFile className="my-2">Subir archivo python</DropFile>
            <br />
            <button>Entrenar modelo</button>
        </div>
    )
}