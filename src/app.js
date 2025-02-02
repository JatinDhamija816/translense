import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandling.js";
import businessRoute from "./routes/business.routes.js";
import ownerRoute from "./routes/owner.routes.js";

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/v1", businessRoute);
app.use("/api/v1", ownerRoute);

export default app;
