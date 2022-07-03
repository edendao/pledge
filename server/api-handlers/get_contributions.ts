// GET /contributions

import { Prisma } from "@prisma/client"
import { RequestHandler } from "express"

import { ContributionLimit } from "../common/server-api"
import { Services } from "../types"

// Optional fields in body: content
export function getContributions({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
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
    } catch (error) {
      console.error(error)

      const message =
        error instanceof Prisma.PrismaClientValidationError
          ? `Received invalid data: ${error.message}`
          : error.message

      res.status(400).json({ error: message })
    }
  }
}
