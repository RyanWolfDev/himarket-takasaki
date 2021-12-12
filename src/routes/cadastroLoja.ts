import { Controller } from "../controlers_handler";
import { Router } from "express";
import dayjs from "dayjs";

interface CadastroLojaDto {
  nome: string;
  dominio: string;
  servidor: string;
  plano: "gratis" | "premium";
  integracao: "minecraft" | "mta";
}

const novaLoja: Controller = (db) => {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("cadastroLoja", {
      lojaExist: false,
      planoFree: false,
    });
  });

  router.post("/", async (req, res) => {
    const cad = req.body as CadastroLojaDto;
    const now = dayjs();
    const expireDate = now.add(1, "year");

    if (!req.session.idDb) return res.redirect("/login");

    if (cad.plano === "gratis") {
      const lojaFinded = await db.lojas.count({
        where: {
          AND: {
            donoId: req.session.idDb,
            plano: "premium",
          },
        },
      });
      if (lojaFinded === 1) {
        res.render("cadastroLoja", {
          planoFree: true,
          lojaExist: false,
        });
        return;
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
