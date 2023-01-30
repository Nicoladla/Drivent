import { prisma } from "@/config";
import { TicketStatus, TicketType } from "@prisma/client";

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

async function getTicketsById(ticketId: number) {
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

  return ticket;
}

async function getTicketTypeById(ticketTypeId: number) {
  const ticketTypeExist = await prisma.ticketType.findUnique({ where: { id: ticketTypeId } });
  return ticketTypeExist;
}

async function postTickets(ticketTypeId: number, enrollmentId: number, status: TicketStatus) {
  await prisma.ticket.create({ data: { ticketTypeId, enrollmentId, status } });
}

async function updateTickets(ticketId: number, status: TicketStatus) {
  await prisma.ticket.update({ where: { id: ticketId }, data: { status } });
}

const ticketRepository = {
  getAllTypesOfTickets,
  getTickets,
  getTicketTypeById,
  postTickets,
  getTicketsById,
  updateTickets,
};

export default ticketRepository;
