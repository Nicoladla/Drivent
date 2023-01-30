import { getPayments, postPayments } from "@/controllers";
import { authenticateToken, validateBody, validTicket } from "@/middlewares";
import { paymentsSchema } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", validTicket, getPayments)
  .post("/process", validateBody(paymentsSchema), validTicket, postPayments);

export { paymentsRouter };
