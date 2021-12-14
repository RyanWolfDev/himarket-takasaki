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
        mensagens: {
          some: {
            usuario: req.session.idDb,
          },
        },
      },
      include: {
        mensagens: {
          include: {
            usuarioModel: true,
          },
        },
      },
    });

    const fistMessageTickets = tickets.map((ticket) => ({
      ...ticket,
      status: StatusTicket[ticket.status].toString(),
      mensagem: ticket.mensagens[0],
    }));

    const respostasRaw = tickets.map((ticket) => {
      ticket.mensagens.splice(0, 1);
      return ticket.mensagens.map((msg) => ({
        ...msg,
        status: StatusTicket[ticket.status].toString(),
      }));
    });

    const respostas = respostasRaw.reduce((acc, curr) => [...acc, ...curr], []);

    res.render("template", {
      page: "ticket",
      data: { tickets: fistMessageTickets, respostas },
    });
  });

  return {
    url: "/ticket",
    router,
  };
};

export default ticket;
