import express from "express";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import handleControler from "./controlers_handler";
import formData from "express-form-data";
import session from "express-session";
import { adminAcessController } from "./middlewares";

dotenv.config();

const app = express();
app.use(formData.parse());
app.use(express.urlencoded({ extended: true }));

if (process.env.SECRET_SESSION) {
  app.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: true,
      saveUninitialized: false,
    })
  );
}

app.use(adminAcessController);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "templates"));
app.use(express.static(path.join(__dirname, "..", "static")));

const db = new PrismaClient();

handleControler(app, db);

const port = process.env.SERVER_PORT || 2000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
