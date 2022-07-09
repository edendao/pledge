import { PrismaClient } from "@prisma/client"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import { addAuthor } from "./api-handlers/add_author"
import { addContribution } from "./api-handlers/add_contribution"
import { getAuthor } from "./api-handlers/get_author"
import { getAuthors } from "./api-handlers/get_authors"
import { getContribution } from "./api-handlers/get_contribution"
import { getContributions } from "./api-handlers/get_contributions"
import { getGreenlistStatus } from "./api-handlers/get_greenlist_status"
import { getStats } from "./api-handlers/get_stats"
import { verify } from "./api-handlers/twitter_verify"

dotenv.config()

const app = express()
app.use(express.json())

const pledgeCORS = cors({
  origin: process.env.ORIGIN || "http://localhost:3000",
})
const port = process.env.PORT || 3001

const prisma = new PrismaClient()
const services = { prisma }

app.options("/greenlist/:address", cors())
app.get("/greenlist/:address", cors(), getGreenlistStatus(services))

const authorsRouter = express.Router()
authorsRouter.options("/", pledgeCORS)
authorsRouter.post("/", pledgeCORS, addAuthor(services))
authorsRouter.get("/", pledgeCORS, getAuthors(services))
authorsRouter.options("/:id", pledgeCORS)
authorsRouter.get("/:id", pledgeCORS, getAuthor(services))
app.use("/authors", authorsRouter)

const contributionsRouter = express.Router()
contributionsRouter.options("/", pledgeCORS)
contributionsRouter.get("/", pledgeCORS, getContributions(services))
contributionsRouter.options("/:id", pledgeCORS)
contributionsRouter.get("/:id", pledgeCORS, getContribution(services))
contributionsRouter.post("/", pledgeCORS, addContribution(services))
app.use("/contributions", contributionsRouter)

const twitterRouter = express.Router()
twitterRouter.options("/verify", pledgeCORS)
twitterRouter.post("/verify", verify(services))
app.use("/twitter", twitterRouter)

app.options("/stats", pledgeCORS)
app.get("/stats", pledgeCORS, getStats(services))

app.listen(port, () => {
  console.log(`Express is listening at ${port}`)
})
