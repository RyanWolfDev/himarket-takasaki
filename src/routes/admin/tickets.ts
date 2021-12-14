import { Controller } from "../../controlers_handler";
import { Router } from "express";
import { AdmLevel, StatusTicket } from "../../models";

const tickets: Controller = (db) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const tickets = await db.tickets.findMany({
      include: {
        mensagens: {
          include: {
            usuarioModel: true,
          },
        },
      },
    });

    console.log(tickets);

    const finalTickets = tickets.map((ticket) => ({
      ...ticket,
      mensagem: {
        ...ticket.mensagens[0],
        usuarioModel: {
          ...ticket.mensagens[0].usuarioModel,
          permissions:
            AdmLevel[ticket.mensagens[0].usuarioModel.permissions].toString(),
        },
      },
      status: StatusTicket[ticket.status].toString(),
    }));

    res.render("admin/template", {
      page: "ticket",
      title: "Tickets",
      data: { tickets: finalTickets },
    });
  });

  return {
    url: "/admin/tickets",
    router,
  };
};

export default tickets;
