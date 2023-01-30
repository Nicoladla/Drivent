import { Request, Response } from "express";
import { checkIfTicketTypeExists, fetchTickets, fetchTypesOfTickets, insertTickets } from "@/services";
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

  const ticket = await fetchTickets(userId);

  res.status(httpStatus.OK).send(ticket);
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = Number(req.body.ticketTypeId);
  const { userId } = req;
  const status = "RESERVED";

  try {
    await checkIfTicketTypeExists(ticketTypeId);

    const { id: enrollmentId } = await enrollmentsService.checkIfEnrollmentExists(userId);

    await insertTickets(ticketTypeId, enrollmentId, status);

    const ticketList = await fetchTickets(userId);

    res.status(httpStatus.CREATED).send(ticketList);
  } catch (error) {
    if (error.type === "bad_request") {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
