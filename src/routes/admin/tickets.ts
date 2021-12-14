import { Controller } from "../../controlers_handler";
import { Router } from "express";
import { AdmLevel, StatusTicket, TicketDto } from "../../models";

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
      session: req.session,
    });
  });

  router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.redirect("/admin/tickets");
    const ticket = await db.tickets.findFirst({
      include: {
        mensagens: true,
      },
      where: {
        id,
      },
    });

    if (!ticket) return res.redirect("/admin/tickets");

    const data = {
      id,
      assunto: ticket.mensagens[0].assunto,
    };

    res.render("enviarResposta", { fieldsEmpthy: false, ticket: data });
  });

  router.post("/:id", async (req, res) => {
    if (!req.session.idDb) return;
    const id = Number(req.params.id);
    if (isNaN(id)) return res.redirect("/admin/tickets");

    const ticket = await db.tickets.findFirst({
      include: {
        mensagens: true,
      },
      where: {
        id,
      },
    });

    if (!ticket) return res.redirect("/admin/tickets");
    const { assunto, mensagem } = req.body as TicketDto;

    if (!assunto || !mensagem) {
      const data = {
        id,
        assunto: ticket.mensagens[0].assunto,
      };
      return res.render("enviarResposta", { fieldsEmpthy: true, ticket: data });
    }

    await db.mensagens.create({
      data: {
        assunto,
        mensagem,
        usuario: req.session.idDb,
        ticket: ticket.id,
      },
    });

    res.redirect("/admin/tickets");
  });

  router.get("/:id/fechar", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.redirect("/admin/tickets");

    await db.tickets.update({
      where: {
        id,
      },
      data: {
        status: StatusTicket.fechado,
      },
    });

    res.redirect("/admin/tickets");
  });

  return {
    url: "/admin/tickets",
    router,
  };
};

export default tickets;
