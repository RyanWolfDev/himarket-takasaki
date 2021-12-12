import { Controller } from "../controlers_handler";
import { Router } from "express";
import bcrypt from "bcrypt";
import { CadastroDto } from "../models";

const cadastro: Controller = (db) => {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("cadastro", { cadSucess: false, userExist: false });
  });

  router.post("/", async (req, res) => {
    const { nome, email, senha } = req.body as CadastroDto;
    const dbUser = await db.users.findFirst({
      where: { user_email: email },
    });

    if (dbUser) {
      return res.render("cadastro", { cadSucess: false, userExist: true });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);
    await db.users.create({
      data: {
        user_email: email,
        user_name: nome,
        user_password: hash,
      },
    });

    res.render("cadastro", { cadSucess: true, userExist: false });
  });

  return {
    url: "/cadastro",
    router,
  };
};

export default cadastro;
