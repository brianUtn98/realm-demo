import express from "express";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.on("error", (err) => {
  process.exit(1);
});
export default app;
