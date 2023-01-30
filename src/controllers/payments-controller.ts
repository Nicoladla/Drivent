import { AuthenticatedRequest } from "@/middlewares";
import { Payments } from "@/protocols";
import { updateTickets } from "@/services";
import paymentsService from "@/services/payments-service";
import { TicketStatus } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: Request, res: Response) {
  const ticketId = Number(req.query.ticketId);

  const payments = await paymentsService.fetchPayments(ticketId);

  res.status(httpStatus.OK).send(payments);
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const payments = req.body as Payments;
  const status: TicketStatus = "PAID";

  await paymentsService.insertPayments(payments);

  const paymentsResult = await paymentsService.fetchPayments(payments.ticketId);

  await updateTickets(paymentsResult.ticketId, status);

  res.status(httpStatus.CREATED).send(paymentsResult);
}
