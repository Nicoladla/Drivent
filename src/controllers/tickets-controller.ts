import { Request, Response } from "express";
import { fetchTickets, fetchTypesOfTickets } from "@/services";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";

export async function getAllTypesOfTickets(req: Request, res: Response) {
  const listOfTicketTypes = await fetchTypesOfTickets();

  res.status(httpStatus.OK).send(listOfTicketTypes);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  await enrollmentsService.checkIfEnrollmentExists(userId);
  console.log("possou 1");
  const ticket = await fetchTickets(userId);

  res.status(httpStatus.OK).send(ticket);
}

export async function postTickets(req: Request, res: Response) {
  res.status(httpStatus.CREATED).send();
}
