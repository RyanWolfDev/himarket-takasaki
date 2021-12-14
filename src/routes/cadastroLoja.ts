import { Controller } from "../controlers_handler";
import { Router } from "express";
import dayjs from "dayjs";
import { CadastroLojaDto } from "../models";
import { accessController } from "../middlewares";

const novaLoja: Controller = (db) => {
  const router = Router();

  router.get("/", accessController, (req, res) => {
    res.render("cadastroLoja", {
      lojaExist: false,
      planoFree: false,
    });
  });

  router.post("/", accessController, async (req, res) => {
    const cad = req.body as CadastroLojaDto;
    const now = dayjs();
    const expireDate = now.add(1, "year");

    if (!req.session.idDb) return;

    if (cad.plano === "gratis") {
      const lojasPremium = await db.lojas.count({
        where: {
          AND: {
            donoId: req.session.idDb,
            plano: "premium",
          },
        },
      });

      const totalLojas = await db.lojas.count({
        where: {
          donoId: req.session.idDb,
        },
      });

      if (lojasPremium === 0 && totalLojas > 0) {
        return res.render("cadastroLoja", {
          planoFree: true,
          lojaExist: false,
        });
      }
    }

    try {
      await db.lojas.create({
        data: {
          nomeLoja: cad.nome,
          dominio: cad.dominio,
          servidorPrincipal: cad.servidor,
          expirar: expireDate.unix(),
          integracao: cad.integracao,
          plano: cad.plano,
          donoId: req.session.idDb,
        },
      });

      return res.redirect("/");
    } catch {
      return res.render("cadastroLoja", {
        lojaExist: true,
        planoFree: false,
      });
    }
  });

  return {
    url: "/novaloja",
    router,
  };
};

export default novaLoja;
