import "./NFTCard.css"

import { MintNFT } from "./MintNFT"

interface Props {
  className?: string
}

export function NFTCard({ className = "" }: Props) {
  return (
    <div className={`compactContributionNFTCardContainer ${className}`}>
      <div className="w-full attribution">
        <MintNFT size={450} />
      </div>
    </div>
  )
}
