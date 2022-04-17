// GET /contribution/:id

import { Contribution } from "@common/server-api"
import { Prisma } from "@prisma/client"
import { RequestHandler } from "express"

import { Services } from "../types"

export function getContribution({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
      const { id } = req.params

      const contribution = await prisma.contribution.findFirst({
        where: { id: id ? parseInt(id as string) : 0 },
        include: { author: true },
      })

      res.json({
        ...contribution,
        author: { ...contribution.author, walletId: contribution.author.id },
      } as Contribution)
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
