import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import helmet, { crossOriginResourcePolicy } from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { register } from "./controllers/auth.ts";
import authRoutes from "./routes/auth.ts";
import userRoutes from "./routes/users.ts";
import postsRoutes from "./routes/posts.ts";
import { verifyToken } from "./middleware/auth.ts";
import { createPost } from "./controllers/posts.ts";

const filename = path.basename(__filename);
const dirname = path.dirname(filename);
dotenv.config();

const app = express();

app.use(json());

// This line of code is a security middleware that helps protect the application
// from common vulnerabilities such as cross-site scripting (XSS), content sniffing, clickjacking, etc.
app.use(helmet());

// This line of code sets a Cross-Origin Resource Policy (CORP) header to allow cross-origin requests.
// This middleware helps to prevent attackers
// from exploiting vulnerabilities in the application by sending malicious requests from other domains.
app.use(crossOriginResourcePolicy({ policy: "cross-origin" }));

// This line of code is a logging middleware that logs HTTP requests and responses
app.use(morgan("common"));

// This line of code sets up a middleware that parses JSON data in incoming requests and rejects any request that does not
// conform to the JSON syntax. It also limits the request body size to 30MB.
app.use(bodyParser.json({ limit: "30mb", strict: true }));

// This line of code sets up a middleware that parses URL-encoded data in incoming requests and makes it available in
// the req.body property of the request object.
// It also limits the request body size to 30MB and allows nested objects in the URL-encoded data.
app.use(urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/assets", express.static(path.join(dirname, "public/assets")));

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
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

const port = 3001 || 6001;
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server started: http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
