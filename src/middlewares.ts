import { Request, Response, NextFunction } from "express";
import { AdmLevel } from "./models";

export function adminAcessController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.url.startsWith("/admin")) {
    if (req.session?.admLevel === AdmLevel.admin) {
      return next();
    } else {
      res.redirect("/");
    }
  } else {
    return next();
  }
}

export function accessController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.idDb) return res.redirect("/login");
  return next();
}
