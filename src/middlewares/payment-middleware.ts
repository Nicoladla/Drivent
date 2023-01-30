import { Payments } from "@/protocols";
import { checkIfTicketExist, fetchTickets } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const payments = req.body as Payments;

  const ticketByInput = await checkIfTicketExist(payments.ticketId);
  const ticketByUser = await fetchTickets(userId);

  if (ticketByInput !== ticketByUser) {
    res.status(httpStatus.UNAUTHORIZED);
  }

  next();
}
