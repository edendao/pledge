import React, { useCallback, useEffect, useState } from "react"
import { GetStatsResponse } from "src/types/common/server-api"

import { getStats } from "../api"

export interface StatsContextInfo {
  stats?: GetStatsResponse
  fetchStats(): Promise<void>
}

export const StatsContext = React.createContext<StatsContextInfo>({
  stats: undefined,
  fetchStats: () => Promise.resolve(),
})

export function StatsProvider({ children }) {
  const [stats, setStats] = useState<GetStatsResponse>()
  const fetchStats = useCallback(() => getStats().then(setStats), [setStats])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <StatsContext.Provider value={{ stats, fetchStats }}>
      {children}
    </StatsContext.Provider>
  )
}
