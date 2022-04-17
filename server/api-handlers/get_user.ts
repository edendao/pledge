// GET /users/:id

import { Author } from "@common/server-api"
import { RequestHandler } from "express"

import { Services } from "../types"

export function getUser({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
      const author = await prisma.user.findFirst({
        where: { id: req.params.id },
      })

      res.json(
        author ? ({ ...author, walletId: author.id } as Author) : undefined,
      )
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
