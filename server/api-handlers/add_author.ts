// POST /users

import { Request, Response } from "express"

import { AddAuthorRequest, AddAuthorResponse } from "../common/server-api"
import { Services } from "../types"

export const addAuthor =
  ({ prisma }: Services) =>
  async (req: Request<AddAuthorRequest>, res: Response<AddAuthorResponse>) => {
    const { id, twitter } = req.body

    const author = await prisma.author.create({
      data: {
        id,
        twitter,
        country: req.get("x-vercel-ip-country-region") ?? "",
      },
    })

    res.json(author)
  }
