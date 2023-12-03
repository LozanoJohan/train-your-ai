import { MyModelCard } from "../components/MyModelCard"

export const MyModels = ({className}) => {
    return (
        <div className={`${className}`}>
            <h1>Mis modelos</h1>
            <MyModelCard></MyModelCard>
        </div>
    )
}