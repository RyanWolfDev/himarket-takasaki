import { Controller } from "../../controlers_handler";
import { Router } from "express";

const index: Controller = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("admin/template", {
      page: "index",
      data: null,
      title: "Inicio",
    });
  });

  return {
    url: "/admin",
    router,
  };
};

export default index;
