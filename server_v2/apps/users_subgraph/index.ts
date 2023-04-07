import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "express";
import "express-async-errors";
import morgan from "morgan";
import "../open-telemetry";
import { app, httpServer, server } from "./server";

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(cors());

const startApolloServer = async () => {
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  const port = 4004;
  await new Promise<void>((resolve, reject) => {
    httpServer.on("error", reject);
    httpServer.listen({ port }, resolve);
  });
  console.info(`🚀 Server ready at http://localhost:${port}/graphql`);
};

startApolloServer();
