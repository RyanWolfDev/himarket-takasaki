import { Controller } from "../controlers_handler";
import { Router } from "express";
import bcrypt from "bcrypt";

import { LoginDto } from "../models";

const login: Controller = (db) => {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", async (req, res) => {
    const { email, password } = req.body as LoginDto;

    const user = await db.users.findUnique({
      where: {
        user_email: email,
      },
    });

    if (user && (await bcrypt.compare(password, user.user_password))) {
      req.session.idDb = user.user_id;
      req.session.username = user.user_name;

      req.session.save();
      res.send("OK");
    } else {
      res.send("Login ou Senha incorretos");
    }
  });

  return {
    router,
    url: "/login",
  };
};

export default login;
