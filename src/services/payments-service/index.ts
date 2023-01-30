import { notFoundError } from "@/errors";
import { Payments } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";

async function fetchPayments(ticketId: number) {
  const payments = await paymentRepository.getPayments(ticketId);

  if (!payments) throw notFoundError();

  return payments;
}

async function insertPayments(payments: Payments) {
  await paymentRepository.postPayments(payments);
}

const paymentsService = { insertPayments, fetchPayments };

export default paymentsService;
