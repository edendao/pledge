// POST /verify/:handle
// must include signature in json body

import { Request, Response } from "express"
import Twitter from "twitter"

import { Services } from "../types"

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
})

const getTweetsBy = async (username: string) =>
  await client.get("statuses/user_timeline", {
    screen_name: username,
    tweet_mode: "extended",
  })

// signature is their handle signed with their address
export const verify =
  ({ prisma }: Services) =>
  async (req: Request, res: Response) => {
    const { authorId, contributionId, signature } = req.body

    const { author, ...contribution } = await prisma.contribution.findFirst({
      where: { authorId, id: contributionId },
      include: { author: true },
    })

    if (Boolean(contribution.signature)) {
      res.status(200).json({ message: "Already verified!" })
      return
    }

    const tweets = (await getTweetsBy(author.twitter)) as any[]
    for (const { full_text: text } of tweets) {
      const index = text.indexOf("sig:")
      if (
        index !== -1 &&
        signature ===
          text
            .slice(index + 4)
            .split(" ")[0]
            .trim()
      ) {
        await prisma.contribution.update({
          where: { id: contributionId },
          data: { signature },
        })

        res.status(201).json({ message: "Verified!" })
        return
      }
    }

    res.status(404).json({ error: "No matching tweets found" })
  }
