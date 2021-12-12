import { Controller } from "../controlers_handler";
import { Router } from "express";

const index: Controller = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("template", { page: "index" });
  });

  return {
    router,
    url: "/",
  };
};

export default index;
