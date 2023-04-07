import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "express";
import multer from "multer";
import morgan from "morgan";
import { app, httpServer, server } from "./server";
import { register } from "./rest";

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(cors());

// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes with files
app.post("/auth/register", upload.single("picture"), register);

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
