import express from "express";
import dotenv from "dotenv";
import path from "path";
import handleControler from "./controlers_handler";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
handleControler(app);

const port = process.env.SERVER_PORT || 2000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
