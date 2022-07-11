// GET /contributions

import { Prisma } from "@prisma/client"
import { Request, Response } from "express"

import { ContributionLimit } from "../common/server-api"
import { Services } from "../types"

// Optional fields in body: content
export const getContributions =
  ({ prisma }: Services) =>
  async (req: Request, res: Response) => {
    const { offset = "0" } = req.query

    const contributions = await prisma.contribution.findMany({
      where: {
        priority: { gte: 0 },
      },
      orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
      include: { author: true },
      skip: parseInt(offset as string),
      take: ContributionLimit,
    })

    res.status(200).json(contributions)
  }
