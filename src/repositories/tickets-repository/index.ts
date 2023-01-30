import { prisma } from "@/config";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

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

async function getTicketTypeById(ticketTypeId: number) {
  const ticketTypeExist = await prisma.ticketType.findUnique({ where: { id: ticketTypeId } });
  return ticketTypeExist;
}

async function postTickets(ticketTypeId: number, enrollmentId: number, status: TicketStatus) {
  await prisma.ticket.create({ data: { ticketTypeId, enrollmentId, status } });
}

const ticketRepository = {
  getAllTypesOfTickets,
  getTickets,
  getTicketTypeById,
  postTickets,
};

export default ticketRepository;
