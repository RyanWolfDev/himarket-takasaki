import { Controller } from "../controlers_handler";
import { Router } from "express";

const logout: Controller = () => {
  const router = Router();

  router.post("/", (req, res) => {
    req.session.destroy(() => {
      res.send("OK");
    });
  });

  return {
    url: "/logout",
    router,
  };
};

export default logout;
