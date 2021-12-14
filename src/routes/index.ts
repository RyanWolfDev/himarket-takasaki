import { Controller } from "../controlers_handler";
import { Router } from "express";
import { accessController } from "../middlewares";

const index: Controller = (db) => {
  const router = Router();

  router.get("/", accessController, async (req, res) => {
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
