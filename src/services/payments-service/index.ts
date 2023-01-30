import { Payments } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";

async function insertPayments(payments: Payments) {
  await paymentRepository.postPayments(payments);
}

const paymentsService = { insertPayments };

export default paymentsService;
