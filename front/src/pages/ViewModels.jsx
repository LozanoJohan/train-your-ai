import { MarketModelCard } from "../components/MarketModelCard"

export const ViewModels = ({ className }) => {
    return (
        <div className={className}>
            <MarketModelCard className={"my-2"}/>
            <MarketModelCard className={"my-2"}/>
            <MarketModelCard className={"my-2"}/>
        </div>
    )
}