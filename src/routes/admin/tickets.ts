import { Controller } from "../../controlers_handler";
import { Router } from "express";
import { AdmLevel, StatusTicket } from "../../models";

const tickets: Controller = (db) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const tickets = await db.tickets.findMany({
      include: {
        usuarioModel: true,
      },
    });

    const finalTickets = tickets.map((ticket) => ({
      ...ticket,
      tipoCliente: AdmLevel[ticket.usuarioModel.permissions].toString(),
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
