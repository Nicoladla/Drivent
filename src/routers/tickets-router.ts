import { getAllTypesOfTickets, getTickets, postTickets } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/ticket-schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTypesOfTickets)
  .get("/", getTickets)
  .post("/", validateBody(ticketSchema), postTickets);

export { ticketsRouter };
