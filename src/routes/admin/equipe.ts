import { Controller } from "../../controlers_handler";
import { Router } from "express";
import { AdmLevel } from "../../models";

const equipe: Controller = (db) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const admins = await db.users.findMany({
      where: {
        permissions: AdmLevel.admin,
      },
    });
    res.render("admin/template", {
      page: "equipe",
      data: { admins },
      title: "Equipe",
    });
  });

  return {
    url: "/admin/equipe",
    router,
  };
};

export default equipe;
