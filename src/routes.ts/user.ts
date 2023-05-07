import express from "express";
export const userRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";

// userRouter.post("/signup", async (req, res, next) => {
//   if (
//     !req.body.name ||
//     !req.body.username ||
//     !req.body.password ||
//     !req.body.emailId
//   ) {
//     res.status(400).send({ msg: "Data incomplete" });
//   }

//   try {
//     const user = await prisma.user.create({
//       data: {
//         id: uuidv4(),
//         name: req.body.name,
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.emailId,
//         emailVerified: false,
//         image: "",
//         expires: new Date(Date.now()),
//       },
//     });
//     res.status(201).json(user);
//     return;
//   } catch (err) {
//     res.status(500).json({ msg: "Error occured" });
//   }
// });

// userRouter.post("/login", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   console.log("username: " + username);
//   console.log("password: " + password);
//   console.log("body: " + JSON.stringify(req.body));
//   if (!username || !password) {
//     res.status(401).json({ msg: "Username or password cannot be empty" });
//     return;
//   }

//   const user = await prisma.user.findFirst({
//     where: {
//       username: username,
//       password: password,
//     },
//   });

//   if (user === null) {
//     res.status(401).json({ msg: "Failed to login" });
//     return;
//   }

//   res.status(201).json({ user });
// });
