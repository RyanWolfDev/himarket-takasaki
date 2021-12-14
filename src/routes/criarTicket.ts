import { Controller } from "../controlers_handler";
import { Router } from "express";
import { TicketDto, AdmLevel } from "../models";
import { accessController } from "../middlewares";

const criarTicket: Controller = (db) => {
  const router = Router();

  router.get("/", accessController, (req, res) => {
    res.render("criarTicket", { fieldsEmpthy: false });
  });

  router.post("/", accessController, async (req, res) => {
    if (!req.session.idDb) return;
    const { assunto, mensagem } = req.body as TicketDto;
    if (!assunto || !mensagem)
      return res.render("criarTicket", { fieldsEmpthy: true });

    const ticket = await db.tickets.create({
      data: {},
    });

    await db.mensagens.create({
      data: {
        ticket: ticket.id,
        mensagem,
        assunto,
        usuario: req.session.idDb,
      },
    });

    if (req.session.admLevel === AdmLevel.admin) res.redirect("/admin/tickets");
    else res.redirect("/ticket");
  });

  return {
    router,
    url: "/criarticket",
  };
};

export default criarTicket;
