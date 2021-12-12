import { Controller } from "../controlers_handler";
import { Router } from "express";
import { CadastroDto } from "../models";
import bycript from "bcrypt";

const editarUser: Controller = (db) => {
  const router = Router();

  router.get("/", async (req, res) => {
    if (!req.session.idDb) return res.redirect("/login");

    const userData = await db.users.findFirst({
      where: {
        user_id: req.session.idDb,
      },
    });

    res.render("editarUser", {
      userExist: false,
      nome: userData?.user_name,
      email: userData?.user_email,
    });
  });

  router.post("/", async (req, res) => {
    if (!req.session.idDb) return res.redirect("/login");

    const { email, nome, senha } = req.body as CadastroDto;

    const conflicts = await db.users.count({
      where: {
        AND: {
          OR: {
            user_name: nome,
            user_email: email,
          },
          NOT: {
            user_id: req.session.idDb,
          },
        },
      },
    });

    if (conflicts > 0)
      return res.render("editarUser", {
        userExist: true,
        nome: "",
        email: "",
      });

    const genPass = async () => {
      const salt = await bycript.genSalt(10);
      return await bycript.hash(senha, salt);
    };

    const senhaFinalInput =
      senha === "nao-alterada" ? undefined : await genPass();

    await db.users.update({
      data: {
        user_email: email,
        user_name: nome,
        user_password: senhaFinalInput,
      },
      where: {
        user_id: req.session.idDb,
      },
    });

    res.redirect("/");
  });

  return {
    router,
    url: "/perfil",
  };
};

export default editarUser;
