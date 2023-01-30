import { Payments } from "@/protocols";
import { checkIfTicketExist, fetchTickets } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const payments = req.body as Payments;
  let ticketId: number;

  if (req.method === "POST") {
    ticketId = payments.ticketId;
  } else if (req.method === "GET") {
    ticketId = Number(req.query.ticketId);
  }

  const ticketByInput = await checkIfTicketExist(ticketId);
  const ticketByUser = await fetchTickets(userId);

  if (ticketByInput.id !== ticketByUser.id) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  next();
}

export async function validTicketInput(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketId = Number(req.query.ticketId);

  if (isNaN(ticketId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  next();
}
