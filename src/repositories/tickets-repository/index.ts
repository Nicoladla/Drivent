import { prisma } from "@/config";
import { Ticket, TicketType } from "@prisma/client";

async function getAllTypesOfTickets(): Promise<TicketType[]> {
  const listOfTicketTypes = await prisma.ticketType.findMany();
  return listOfTicketTypes;
}

async function getTickets(userId: number) {
  const ticketList = await prisma.ticket.findFirst({
    where: { Enrollment: { userId } },
    include: { TicketType: true },
  });

  return ticketList;
}

const ticketRepository = {
  getAllTypesOfTickets,
  getTickets,
};

export default ticketRepository;
