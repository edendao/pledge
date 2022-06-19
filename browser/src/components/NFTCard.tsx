import "./ContributionCard.css"

import { MintNFT } from "./MintNFT"

interface Props {
  className?: string
}

export function NFTCard({ className = "" }: Props) {
  return (
    <div className={`compactContributionCardContainer ${className}`}>
      <div className="w-full attribution">
        <MintNFT size={256} />
      </div>
    </div>
  )
}
