import { Payments } from "@/protocols";
import joi from "joi";

export const paymentsSchema = joi.object<Payments>({
  ticketId: joi.number().min(1).required(),
  cardData: {
    issuer: joi.string().min(2).required(),
    number: joi.string().min(10).max(16).required(),
    name: joi.string().min(3).required(),
    expirationDate: joi.date().required(),
    cvv: joi.number().min(1).required(),
  },
});
