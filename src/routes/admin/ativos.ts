import { Controller } from "../../controlers_handler";
import { Router } from "express";

const ativos: Controller = (db) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const lojas = await db.lojas.findMany();
    res.render("admin/template", {
      page: "ativos",
      data: { lojas },
      title: "Ativos",
      session: req.session,
    });
  });

  return {
    url: "/admin/ativos",
    router,
  };
};

export default ativos;
