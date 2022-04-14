import React, { useEffect, useState } from "react"

import { ArweaveEssayTransaction, fetchLatestArweaveEssay } from "../api"

export interface ArweaveContextInfo {
  latestEssayInfo: ArweaveEssayTransaction | null
}

export const ArweaveContext = React.createContext<ArweaveContextInfo>({
  latestEssayInfo: null,
})

export function ArweaveProvider({ children }) {
  const [essayTransaction, setEssayTransaction] =
    useState<ArweaveEssayTransaction | null>(null)

  useEffect(() => {
    fetchLatestArweaveEssay().then(setEssayTransaction)
  }, [])

  const arweaveContext = { latestEssayInfo: essayTransaction }
  return (
    <ArweaveContext.Provider value={arweaveContext}>
      {children}
    </ArweaveContext.Provider>
  )
}
