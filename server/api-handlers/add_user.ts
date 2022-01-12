// POST /users

import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { Services } from "../types";
import { AddUserRequest, AddUserResponse } from "../common/server-api";

export function addUser({ prisma }: Services): RequestHandler {
  return async (req, res) => {
    const { walletId, name, twitterUsername } = req.body as AddUserRequest;

    // TODO: validate request, maybe use autogenerated zod

    try {
      const result = await prisma.user.create({
        data: {
          id: walletId,
          name,
          twitterUsername,
        },
      });

      res.json(result.id as AddUserResponse);
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientValidationError) {
        res.status(400).json({ error: "Received invalid data." });
        return;
      }
      res.status(400).json({ error: err.message });
    }
  };
}
