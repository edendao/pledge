// POST /contributions

import { Request, Response } from "express"

import {
  AddContributionRequest,
  AddContributionResponse,
} from "../common/server-api"
import { Services } from "../types"

export const addContribution =
  ({ prisma }: Services) =>
  async (
    req: Request<AddContributionRequest>,
    res: Response<AddContributionResponse>,
  ) => {
    const { authorId, response, sense, prompt } = req.body

    const lookup = { authorId, prompt, sense, response }
    const include = { author: true }

    res.json(
      (await prisma.contribution.findFirst({ where: lookup, include })) ??
        (await prisma.contribution.create({ data: lookup, include })),
    )
  }
