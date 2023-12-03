import { DropFile } from "../components/dropFile"

export const MyModels = () => {
    return (
        <>
            <h1>Mis modelos</h1>
            <DropFile className="my-2">Subir archivo docker</DropFile>
            <br />
            <DropFile className="my-2">Subir archivo python</DropFile>
            <br />
            <button>Entrenar modelo</button>
        </>
    )
}