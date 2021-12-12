import { Controller } from "../controlers_handler";
import { Router } from "express";

const index: Controller = (db) => {
  const router = Router();

  router.get("/", async (req, res) => {
    if (!req.session.idDb) return res.redirect("/login");

    const lojas = await db.lojas.findMany({
      where: {
        donoId: req.session.idDb,
      },
    });

    res.render("template", { page: "index", data: { lojas } });
  });

  return {
    router,
    url: "/",
  };
};

export default index;
