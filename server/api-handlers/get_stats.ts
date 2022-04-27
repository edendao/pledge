// GET /stats

import { GetStatsResponse } from "@common/server-api"
import { RequestHandler } from "express"

import { Services } from "../types"

export function getStats({ prisma }: Services): RequestHandler {
  return async (_req, res) => {
    const [authorsTotal, contributionsTotal] = await Promise.all([
      prisma.author.count(),
      prisma.contribution.count(),
    ])

    res.json({ authorsTotal, contributionsTotal } as GetStatsResponse)
  }
}
