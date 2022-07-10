// GET /contributions

import { Prisma } from "@prisma/client"
import { RequestHandler } from "express"

import { Services } from "../types"

export const getGreenlistStatus =
  ({ prisma }: Services): RequestHandler =>
  async (req, res) => {
    try {
      const contribution = await prisma.contribution.findFirst({
        where: { authorId: req.params.address },
        select: { authorId: true, signature: true },
      })

      res.status(200).json({ greenlisted: Boolean(contribution?.signature) })
    } catch (error) {
      console.error(error)

      const message =
        error instanceof Prisma.PrismaClientValidationError
          ? `Received invalid data: ${error.message}`
          : error.message

      res.status(400).json({ error: message })
    }
  }
