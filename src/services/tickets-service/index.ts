import ticketRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";

export async function fetchTypesOfTickets() {
  const listOfTicketTypes = ticketRepository.getAllTypesOfTickets();
  return listOfTicketTypes;
}

export async function fetchTickets(userId: number) {
  const ticketList = await ticketRepository.getTickets(userId);
  console.log(ticketList);
  if (!ticketList) throw notFoundError();
  console.log("possou 2");

  return ticketList;
}
