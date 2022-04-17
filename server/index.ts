import { PrismaClient } from "@prisma/client"
import { ArweaveClient } from "ar-wrapper"
import corsMiddleware from "cors"
import dotenv from "dotenv"
import express from "express"

import { addContribution } from "./api-handlers/add_contribution"
import { addUser } from "./api-handlers/add_user"
import { getContribution } from "./api-handlers/get_contribution"
import { getContributions } from "./api-handlers/get_contributions"
import { getStats } from "./api-handlers/get_stats"
import { getUser } from "./api-handlers/get_user"
import { getUsers } from "./api-handlers/get_users"
import { verify } from "./api-handlers/twitter_verify"

dotenv.config()

// import contributions from "./api/contributions";

const app = express()
app.use(express.json())

const cors = corsMiddleware({
  origin: process.env.ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
})
const port = process.env.PORT || 3001

const prisma = new PrismaClient()
const arweave = new ArweaveClient(
  process.env.ARWEAVE_ADDRESS,
  process.env.ARWEAVE_KEY,
)
const services = { prisma, arweave }

app.use(cors)

const usersRouter = express.Router()
usersRouter.options("/", cors)
usersRouter.post("/", cors, addUser(services))
usersRouter.get("/", cors, getUsers(services))
usersRouter.options("/:id", cors)
usersRouter.get("/:id", cors, getUser(services))
app.use("/users", usersRouter)

const contributionsRouter = express.Router()
contributionsRouter.options("/", cors)
contributionsRouter.get("/", cors, getContributions(services))
contributionsRouter.options("/:id", cors)
contributionsRouter.get("/:id", cors, getContribution(services))
contributionsRouter.post("/", cors, addContribution(services))
app.use("/contributions", contributionsRouter)

const twitterRouter = express.Router()
twitterRouter.options("/verify", cors)
twitterRouter.post("/verify", verify(services))
app.use("/twitter", twitterRouter)

app.options("/stats", cors)
app.get("/stats", cors, getStats(services))

app.listen(port, () => {
  console.log(`Express is listening at ${port}`)
})
