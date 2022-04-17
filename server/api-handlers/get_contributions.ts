// GET /contributions

import { Prisma } from "@prisma/client"
import { RequestHandler } from "express"

import { Contribution, ContributionLimit } from "../common/server-api"
import { Services } from "../types"

// Optional fields in body: content
export function getContributions({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
      const { offset, contributionId } = req.query
      const highlightedContributionId = contributionId
        ? parseInt(contributionId as string)
        : undefined

      const [highlightedContribution, storedContributions] = await Promise.all([
        contributionId &&
          prisma.contribution.findFirst({
            where: { id: highlightedContributionId },
            include: { author: true },
          }),
        prisma.contribution.findMany({
          where: {
            id: {
              not: highlightedContributionId,
            },
            rank: { gte: 0 },
          },
          orderBy: [{ rank: "desc" }, { createdAt: "asc" }],
          include: { author: true },
          skip: parseInt(offset as string),
          take: ContributionLimit,
        }),
      ])

      const contributions = highlightedContribution
        ? [highlightedContribution, ...storedContributions]
        : storedContributions

      res.status(200).json(
        contributions.map(contribution => ({
          ...contribution,
          author: {
            ...contribution.author,
            walletId: contribution.author.id,
          },
        })) as Contribution[],
      )
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
