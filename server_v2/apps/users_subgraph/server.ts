import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { typeDefs } from "./typeDefs";
import http from "http";
import express from "express";
import { resolvers } from "./resolvers";

export const app = express();
export const httpServer = http.createServer(app);

export const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
