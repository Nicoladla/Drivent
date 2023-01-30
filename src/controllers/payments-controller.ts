import { AuthenticatedRequest } from "@/middlewares";
import { Payments } from "@/protocols";
import paymentsService from "@/services/payments-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: Request, res: Response) {
  res.status(httpStatus.OK).send();
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const payments = req.body as Payments;

  await paymentsService.insertPayments(payments);

  res.status(httpStatus.CREATED).send();
}
