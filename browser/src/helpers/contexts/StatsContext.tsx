import React, { useEffect, useState } from "react"
import { GetStatsResponse } from "src/types/common/server-api"

import { getStats } from "../api"

export interface StatsContextInfo {
  stats?: GetStatsResponse
}

export const StatsContext = React.createContext<StatsContextInfo>({
  stats: undefined,
})

export function StatsProvider({ children }) {
  const [stats, setStats] = useState<GetStatsResponse | undefined>(undefined)
  useEffect(() => {
    getStats().then(setStats)
  }, [])

  return (
    <StatsContext.Provider value={{ stats }}>{children}</StatsContext.Provider>
  )
}
