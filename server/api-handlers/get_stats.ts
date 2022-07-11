// GET /stats

import { GetStatsResponse } from "@common/server-api"
import { Request, Response } from "express"

import { Services } from "../types"

export const getStats =
  ({ prisma }: Services) =>
  async (_: Request, res: Response<GetStatsResponse>) => {
    const [authorsTotal, contributionsTotal] = await Promise.all([
      prisma.author.count(),
      prisma.contribution.count(),
    ])

    res.json({ authorsTotal, contributionsTotal })
  }
