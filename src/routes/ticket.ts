import { Controller } from "../controlers_handler";
import { Router } from "express";
import { accessController } from "../middlewares";
import { StatusTicket } from "../models";

const ticket: Controller = (db) => {
  const router = Router();

  router.get("/", accessController, async (req, res) => {
    if (!req.session.idDb) return;

    const tickets = await db.tickets.findMany({
      where: {
        usuario: req.session.idDb,
      },
      include: {
        usuarioModel: true,
      },
    });

    const finalTickets = tickets.map((ticket) => ({
      ...ticket,
      status: StatusTicket[ticket.status].toString(),
    }));

    res.render("template", { page: "ticket", data: { tickets: finalTickets } });
  });

  return {
    url: "/ticket",
    router,
  };
};

export default ticket;
