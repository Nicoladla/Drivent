import ticketRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import { TicketStatus } from "@prisma/client";

export async function fetchTypesOfTickets() {
  const listOfTicketTypes = ticketRepository.getAllTypesOfTickets();
  return listOfTicketTypes;
}

export async function fetchTickets(userId: number) {
  const ticketList = await ticketRepository.getTickets(userId);

  if (!ticketList) throw notFoundError();

  return ticketList;
}

export async function checkIfTicketTypeExists(ticketTypeId: number) {
  const ticketTypeExist = await ticketRepository.getTicketTypeById(ticketTypeId);

  if (!ticketTypeExist) throw { type: "bad_request" };
}

export async function insertTickets(ticketTypeId: number, enrollmentId: number, status: TicketStatus) {
  ticketRepository.postTickets(ticketTypeId, enrollmentId, status);
}
