import ticketRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";

export async function fetchTypesOfTickets() {
  const listOfTicketTypes = ticketRepository.getAllTypesOfTickets();
  return listOfTicketTypes;
}

export async function fetchTickets(userId: number) {
  const ticketList = await ticketRepository.getTickets(userId);

  if (!ticketList) throw notFoundError();

  return ticketList;
}
