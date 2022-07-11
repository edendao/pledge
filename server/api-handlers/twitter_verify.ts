// POST /verify/:handle
// must include signature in json body

import { Request, Response } from "express"
import { TwitterApi } from "twitter-api-v2"

import { Services } from "../types"

const client = new TwitterApi(process.env.BEARER_TOKEN)

// signature is their handle signed with their address
export const verify =
  ({ prisma }: Services) =>
  async (req: Request, res: Response) => {
    const { authorId, contributionId, signature } = req.body

    console.time("prisma.findFirst")
    const { author, ...contribution } = await prisma.contribution.findFirst({
      where: { authorId, id: contributionId },
      include: { author: true },
    })
    console.timeEnd("prisma.findFirst")

    if (Boolean(contribution.signature)) {
      res.status(200).json({ message: "Already verified!" })
      return
    }

    console.time("twitter")
    const twitterUser = await client.readOnly.v2.userByUsername(author.twitter)
    const { tweets } = await client.readOnly.v2.userTimeline(
      twitterUser.data.id,
    )
    console.timeEnd("twitter")

    for (const { text } of tweets) {
      const index = text.indexOf("sig:")
      if (
        index !== -1 &&
        signature ===
          text
            .slice(index + 4)
            .split(" ")[0]
            .trim()
      ) {
        console.time("prisma.update")
        await prisma.contribution.update({
          where: { id: contributionId },
          data: { signature },
        })
        console.timeEnd("prisma.update")

        res.status(201).json({ message: "Verified!" })
        return
      }
    }

    res.status(404).json({ error: "No matching tweets found" })
  }
