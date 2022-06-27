import React, { useEffect, useState } from "react"
import { Contribution } from "src/types/common/server-api"

import { getContribution, getContributions } from "../api"

interface ContributionsContextInfo {
  contributions: Contribution[]
  setContributions: React.Dispatch<React.SetStateAction<Contribution[]>>
  getContributions: typeof getContributions
  getContribution: typeof getContribution
}

export const ContributionsContext =
  React.createContext<ContributionsContextInfo>({} as any)

export function ContributionsProvider({ children }) {
  const [contributions, setContributions] = useState<Contribution[]>([])

  useEffect(() => {
    getContributions({ offset: 0 }).then(setContributions)
  }, [])

  const contributionsContext = {
    contributions,
    setContributions,
    getContributions,
    getContribution,
  }

  return (
    <ContributionsContext.Provider value={contributionsContext}>
      {children}
    </ContributionsContext.Provider>
  )
}
