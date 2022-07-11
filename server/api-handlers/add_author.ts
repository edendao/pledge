// POST /users

import { RequestHandler } from "express"

import { AddAuthorRequest, AddAuthorResponse } from "../common/server-api"
import { Services } from "../types"

export const addAuthor =
  ({ prisma }: Services): RequestHandler<AddAuthorRequest, AddAuthorResponse> =>
  async (req, res) => {
    try {
      const { id, twitter } = req.body

      const author = await prisma.author.create({
        data: {
          id,
          twitter,
          country: req.get("x-vercel-ip-country-region") ?? "",
        },
      })

      return res.json(author)
    } catch (error) {
      return res.status(500).json({ error: error.message } as any)
    }
  }
