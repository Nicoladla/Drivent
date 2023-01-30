import { getPayments, postPayments } from "@/controllers";
import { authenticateToken, validateBody, validTicket, validTicketInput } from "@/middlewares";
import { paymentsSchema } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", validTicketInput, validTicket, getPayments)
  .post("/process", validateBody(paymentsSchema), validTicket, postPayments);

export { paymentsRouter };
