import { MarketModelCard } from "../components/MarketModelCard"

export const ViewModels = ({ className, contract, address }) => {

    return (
        <div className={className}>
            <MarketModelCard className={"my-2"} contract={contract} address={address}/>
        </div>
    )
}