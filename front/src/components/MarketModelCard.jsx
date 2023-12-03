import { useState } from "react"
import { DropFile } from "./dropFile"

export const MarketModelCard = ({ className }) => {
    const [isTraining, setIsTraining] = useState(false)

    return (
        <div className={className}>
            <h2>Modelo 1</h2>
            <hr />
            {
                !isTraining ? <>
                    <button>Descargar información</button>
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