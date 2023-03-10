import ticketRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import { TicketStatus } from "@prisma/client";

export async function fetchTypesOfTickets() {
  const listOfTicketTypes = ticketRepository.getAllTypesOfTickets();
  return listOfTicketTypes;
}

export async function fetchTickets(userId: number) {
  const ticket = await ticketRepository.getTickets(userId);

  if (!ticket) throw notFoundError();

  return ticket;
}

export async function checkIfTicketExist(ticketId: number) {
  const ticket = await ticketRepository.getTicketsById(ticketId);

  if (!ticket) throw notFoundError();

  return ticket;
}

export async function checkIfTicketTypeExists(ticketTypeId: number) {
  const ticketTypeExist = await ticketRepository.getTicketTypeById(ticketTypeId);

  if (!ticketTypeExist) throw { type: "bad_request" };
}

export async function insertTickets(ticketTypeId: number, enrollmentId: number, status: TicketStatus) {
  ticketRepository.postTickets(ticketTypeId, enrollmentId, status);
}

export async function updateTickets(ticketId: number, status: TicketStatus) {
  await ticketRepository.updateTickets(ticketId, status);
}
