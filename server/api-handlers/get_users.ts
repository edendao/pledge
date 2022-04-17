// GET /users

import { RequestHandler } from "express"

import { Author, SignatureLimit } from "../common/server-api"
import { Services } from "../types"

export function getUsers({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    try {
      const { offset } = req.query

      const authors = await prisma.user.findMany({
        orderBy: [{ createdAt: "asc" }],
        take: SignatureLimit,
        skip: parseInt(offset as string),
      })

      res.json(
        authors.map(author => ({ ...author, walletId: author.id } as Author)),
      )
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
