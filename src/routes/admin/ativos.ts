import { Controller } from "../../controlers_handler";
import { Router } from "express";

const ativos: Controller = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("admin/template", { page: "ativos", data: { lojas: [] } });
  });

  return {
    url: "/admin/ativos",
    router,
  };
};

export default ativos;
