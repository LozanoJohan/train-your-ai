import { DropFile } from "../components/dropFile"

export const UploadModel = ({address}) => {
    return (
        <div className="flex flex-col w-full items-center">
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