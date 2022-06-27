// POST /verify/:handle
// must include signature in json body

import { Author } from "@prisma/client"
import { RequestHandler } from "express"
import Twitter from "twitter"

import { VerifyTwitterRequest } from "../common/server-api"
import { Services } from "../types"

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
})

const getTweetsBy = (screen_name: string) =>
  client.get("statuses/user_timeline", { screen_name, tweet_mode: "extended" })

const extractSigFromText = (tweet: string) =>
  tweet
    .slice(tweet.indexOf("sig:") + 4)
    .split(" ")[0]
    .trim()

// signature is their handle signed with their address
export const verify =
  ({ prisma }: Services): RequestHandler<VerifyTwitterRequest> =>
  async (req, res) => {
    const { authorId, contributionId, signature } = req.body

    const { author, ...contribution } = await prisma.contribution.findFirst({
      where: { authorId, id: contributionId },
      include: { author: true },
    })

    if (contribution.signature) {
      return res.status(200).json({ message: "Already verified!" })
    }

    const signatures: string[] = (await getTweetsBy(author.twitter))
      .map(({ full_text: t }) => t)
      .filter((t: string) => t.includes("sig:"))
      .map(extractSigFromText)

    if (!signatures.includes(signature)) {
      return res.status(404).json({ error: "No matching tweets found" })
    }

    await prisma.contribution.update({
      where: { id: contributionId },
      data: { signature },
    })

    return res.status(201).json({ message: "Verified!" })
  }
