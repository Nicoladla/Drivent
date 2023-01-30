import { getAllTypesOfTickets, getTickets, postTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTypesOfTickets)
  .get("/", getTickets)
  .post("/", postTickets);

export { ticketsRouter };
