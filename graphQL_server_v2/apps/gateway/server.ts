import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import express, { Application } from "express";
import http from "http";

export const app: Application = express();
export const httpServer = http.createServer(app);

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "users", url: "http://localhost:4004/graphql" },
      { name: "posts", url: "http://localhost:4010/graphql" },
    ],
  }),
});

export const server = new ApolloServer({
  gateway,
});
