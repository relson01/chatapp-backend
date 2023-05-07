import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import router from "./routes.ts";
import cors from "cors";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLArgs } from "graphql";
import { GraphQLContext } from "./types";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
const prisma = new PrismaClient();
const bodyParser = require("body-parser");
const PORT = 4000;

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "*",
  credentials: true,
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: async (req, res): Promise<GraphQLContext> => {
    //TODO: return session using getSession({req})
    // const session = await getSession({req}); --error fetch is not defined

    return { prisma };
  },
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

async function startServer() {
  app.use(cors());

  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
}
startServer();

app.get("/ping", (req, res) => {
  res.send("png");
});
app.use("/", router);
app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:4000`));
