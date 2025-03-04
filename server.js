import express from "express";
import router from "./routes/index.routes.js";
import { PORT } from "./config/env.config.js"

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router)

app.set("trust proxy", true);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
