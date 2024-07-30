import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import routers from './routers'

const app: Express = express();
app.use(cors());
const port = 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "success",
  });
});

app.use(routers);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const statusMessage = err.message || "Error";

  res.status(statusCode).send({
    error: true,
    message: statusMessage,
    data: null,
  });
});

module.exports = app.listen(port, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${port}`);
});
