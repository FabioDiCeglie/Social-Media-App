import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginInlineTraceDisabled } from "@apollo/server/plugin/disabled";
import { buildSubgraphSchema } from "@apollo/subgraph";
import express, { Application } from "express";
import http from "http";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs.ts";

export const app: Application = express();
export const httpServer = http.createServer(app);

export const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
});
