import glob from "glob";
import { Express, Router } from "express";
import { PrismaClient } from "@prisma/client";

export type ControllerReturn = {
  url: string;
  router: Router;
};
export type Controller = (db: PrismaClient) => ControllerReturn;

function handlerController(app: Express, db: PrismaClient) {
  glob(`${__dirname}/routes/**/*.{js,ts}`, {}, (err, files) => {
    if (err) throw err;

    files.forEach(async (file) => {
      const route = (await import(file)).default as Controller;
      const routeData = await route(db);
      console.log(`[ROUTE] ${routeData.url}`);
      app.use(routeData.url, routeData.router);
    });
  });
}

export default handlerController;
