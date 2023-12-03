import { MyModelCard } from "../components/MyModelCard"

export const MyModels = ({ address, className, contract }) => {
    return (
        <div className={`${className}`}>
            <h1>Mis modelos</h1>
            <MyModelCard address={address} contract={contract}></MyModelCard>
        </div>
    )
}