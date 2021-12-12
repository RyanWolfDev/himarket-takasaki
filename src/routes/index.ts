import { Controller } from "../controlers_handler";
import { Router } from "express";

const index: Controller = () => {
  const router = Router();

  return {
    router,
    url: "/",
  };
};

export default index;
