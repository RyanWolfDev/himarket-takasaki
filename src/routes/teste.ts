import { Router } from "express";
import { Controller } from "../controlers_handler";

const teste: Controller = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.send("<h1>grande dia</h1>");
  });

  return {
    router,
    url: "/teste",
  };
};

export default teste;
