import { Controller } from "../controlers_handler";
import { Router } from "express";

const login: Controller = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("login");
  });

  return {
    router,
    url: "/login",
  };
};

export default login;
