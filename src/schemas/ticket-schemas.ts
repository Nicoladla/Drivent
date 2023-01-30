import joi from "joi";

export const ticketSchema = joi.object({
  ticketTypeId: joi.number().min(1).required(),
});
