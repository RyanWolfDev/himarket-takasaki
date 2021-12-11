import glob from "glob";
import { Express, Router } from "express";

export type ControllerReturn = {
  url: string;
  router: Router;
};
export type Controller = () => ControllerReturn;

function handlerController(app: Express) {
  glob(`${__dirname}/routes/**/*.{js,ts}`, {}, (err, files) => {
    if (err) throw err;

    files.forEach(async (file) => {
      const route = (await import(file)).default as Controller;
      const routeData = await route();
      console.log(`[ROUTE] ${routeData.url}`);
      app.use(routeData.url, routeData.router);
    });
  });
}

export default handlerController;
